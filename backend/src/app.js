import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
app.use(cors());

const upload = multer({ limits: { fileSize: 8 * 1024 * 1024 } });
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const ALERT_COOLDOWNS_MS = {
  CRITICAL: 3500,
  WARNING: 5000,
  INFO: 8000,
};

const alertMemory = new Map();

const LABEL_ALIASES = new Map([
  ['person', 'person'],
  ['pedestrian', 'pedestrian'],
  ['car', 'car'],
  ['motorbike', 'motorcycle'],
  ['motorcycle', 'motorcycle'],
  ['bus', 'bus'],
  ['truck', 'truck'],
  ['pothole', 'pothole'],
  ['cow', 'cow'],
  ['dog', 'dog'],
  ['traffic light', 'traffic signal'],
  ['traffic signal', 'traffic signal'],
  ['road barricade', 'road barricade'],
  ['barricade', 'road barricade'],
  ['speed breaker', 'speed breaker'],
  ['speed bump', 'speed breaker'],
]);

const PRIORITY_LABELS = new Set(LABEL_ALIASES.values());
const CRITICAL_LABELS = new Set(['person', 'pedestrian', 'cow', 'dog', 'pothole', 'road barricade']);

function normalizeLabel(label) {
  return LABEL_ALIASES.get(String(label || '').trim().toLowerCase()) || null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeDetectionId(det, index) {
  return `${det.label}-${Math.round(det.bbox[0])}-${Math.round(det.bbox[1])}-${index}`;
}

function normalizeDetections(rawDetections, frame) {
  return rawDetections
    .map((det, index) => {
      const label = normalizeLabel(det.label);
      if (!label || !Array.isArray(det.bbox) || det.bbox.length < 4) {
        return null;
      }

      const [x, y, width, height] = det.bbox.map((value) => Number(value) || 0);
      return {
        id: makeDetectionId({ label, bbox: [x, y] }, index),
        label,
        rawLabel: det.label,
        confidence: Number(det.confidence) || 0,
        bbox: [x, y, width, height],
        frame,
      };
    })
    .filter(Boolean)
    .filter((det) => PRIORITY_LABELS.has(det.label));
}

function getDetectionMetrics(det, frame) {
  const frameWidth = frame?.width || 1;
  const frameHeight = frame?.height || 1;
  const [x, y, width, height] = det.bbox;
  const areaRatio = clamp((width * height) / (frameWidth * frameHeight), 0, 1);
  const centerX = clamp((x + width / 2) / frameWidth, 0, 1);
  const centerY = clamp((y + height / 2) / frameHeight, 0, 1);
  return { areaRatio, centerX, centerY };
}

function severityRank(severity) {
  return { INFO: 1, WARNING: 2, CRITICAL: 3 }[severity] || 0;
}

function buildDirectHazards(detections, frame) {
  const grouped = new Map();

  for (const det of detections) {
    const metrics = getDetectionMetrics(det, frame);
    const existing = grouped.get(det.label) || {
      id: `hazard-${det.label.replace(/\s+/g, '-')}`,
      kind: det.label,
      title: det.label.toUpperCase(),
      message: `${det.label} detected on the road.`,
      severity: CRITICAL_LABELS.has(det.label) ? 'WARNING' : 'INFO',
      count: 0,
      labels: [det.label],
    };

    existing.count += 1;

    if (det.label === 'traffic signal') {
      existing.title = 'TRAFFIC SIGNAL';
      existing.message = 'Traffic signal visible ahead.';
      existing.severity = 'INFO';
    } else if (det.label === 'speed breaker') {
      existing.title = 'SPEED BREAKER';
      existing.message = 'Speed breaker detected ahead.';
      existing.severity = 'WARNING';
    } else if (det.label === 'road barricade') {
      existing.title = 'ROAD BARRICADE';
      existing.message = 'Road barricade detected in the driving path.';
      existing.severity = metrics.areaRatio > 0.05 ? 'CRITICAL' : 'WARNING';
    } else if (det.label === 'pothole') {
      existing.title = 'POTHOLE';
      existing.message = 'Pothole detected ahead.';
      existing.severity = metrics.areaRatio > 0.03 ? 'CRITICAL' : 'WARNING';
    } else if (det.label === 'cow' || det.label === 'dog') {
      existing.title = det.label === 'cow' ? 'ANIMAL ON ROAD' : 'DOG ON ROAD';
      existing.message = `${det.label} detected near the driving lane.`;
      existing.severity = metrics.centerY > 0.55 ? 'CRITICAL' : 'WARNING';
    } else if (det.label === 'person' || det.label === 'pedestrian') {
      existing.title = 'PEDESTRIAN DETECTED';
      existing.message = 'Pedestrian detected near the road.';
      existing.severity = metrics.centerY > 0.5 ? 'CRITICAL' : 'WARNING';
    } else {
      existing.title = `${det.label.toUpperCase()} DETECTED`;
      existing.message = `${det.label} detected ahead.`;
      existing.severity = metrics.areaRatio > 0.08 ? 'WARNING' : 'INFO';
    }

    grouped.set(det.label, existing);
  }

  return [...grouped.values()].sort((a, b) => severityRank(b.severity) - severityRank(a.severity));
}

function buildEventAlerts(detections, frame) {
  const events = [];
  const seen = new Set();

  for (const det of detections) {
    const metrics = getDetectionMetrics(det, frame);

    if ((det.label === 'person' || det.label === 'pedestrian') && metrics.centerX > 0.25 && metrics.centerX < 0.75) {
      seen.add('pedestrian-crossing');
      events.push({
        id: 'event-pedestrian-crossing',
        kind: 'pedestrian crossing',
        title: 'PEDESTRIAN CROSSING',
        message: 'Pedestrian is crossing near the center lane.',
        severity: metrics.centerY > 0.55 ? 'CRITICAL' : 'WARNING',
        labels: [det.label],
      });
    }

    if ((det.label === 'cow' || det.label === 'dog') && metrics.centerX > 0.2 && metrics.centerX < 0.8) {
      seen.add('animal-crossing');
      events.push({
        id: 'event-animal-crossing',
        kind: 'animal crossing',
        title: 'ANIMAL CROSSING',
        message: `${det.label} moving near the driving lane.`,
        severity: metrics.centerY > 0.45 ? 'CRITICAL' : 'WARNING',
        labels: [det.label],
      });
    }

    if (det.label === 'pothole') {
      seen.add('pothole-ahead');
      events.push({
        id: 'event-pothole-ahead',
        kind: 'pothole ahead',
        title: 'POTHOLE AHEAD',
        message: 'Road surface hazard detected ahead.',
        severity: metrics.centerY > 0.55 || metrics.areaRatio > 0.03 ? 'CRITICAL' : 'WARNING',
        labels: [det.label],
      });
    }

    if (
      ['person', 'pedestrian', 'car', 'motorcycle', 'bus', 'truck', 'cow', 'dog', 'road barricade'].includes(det.label)
      && (metrics.areaRatio > 0.09 || metrics.centerY > 0.7)
    ) {
      seen.add('obstacle-too-close');
      events.push({
        id: 'event-obstacle-too-close',
        kind: 'obstacle too close',
        title: 'OBSTACLE TOO CLOSE',
        message: `${det.label} is too close to the vehicle path.`,
        severity: 'CRITICAL',
        labels: [det.label],
      });
    }
  }

  return events.filter((event, index, list) => list.findIndex((item) => item.id === event.id) === index);
}

function shouldEmitNotification(alert) {
  const now = Date.now();
  const lastSent = alertMemory.get(alert.id) || 0;
  const cooldown = ALERT_COOLDOWNS_MS[alert.severity] || 5000;

  if (now - lastSent < cooldown) {
    return false;
  }

  alertMemory.set(alert.id, now);
  return true;
}

function buildResponsePayload(aiData) {
  const frame = aiData?.frame || { width: 1, height: 1 };
  const detections = normalizeDetections(aiData?.detections || [], frame);
  const directHazards = buildDirectHazards(detections, frame);
  const eventHazards = buildEventAlerts(detections, frame);
  const hazards = [...eventHazards, ...directHazards]
    .sort((a, b) => severityRank(b.severity) - severityRank(a.severity))
    .slice(0, 8);

  const notifications = hazards
    .filter((alert) => shouldEmitNotification(alert))
    .map((alert) => ({
      ...alert,
      speech: `${alert.title.replaceAll('_', ' ')}. ${alert.message}`,
      emittedAt: Date.now(),
    }));

  return {
    detections,
    frame,
    hazards,
    notifications,
    summary: {
      counts: detections.reduce((acc, det) => {
        acc[det.label] = (acc[det.label] || 0) + 1;
        return acc;
      }, {}),
      highestSeverity: hazards[0]?.severity || 'INFO',
      totalDetections: detections.length,
    },
  };
}

app.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'frame.jpg',
      contentType: req.file.mimetype,
    });

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/detect`, formData, {
      headers: formData.getHeaders(),
      timeout: 12000,
    });

    res.json(buildResponsePayload(aiResponse.data));
  } catch (error) {
    console.error('AI Service Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
