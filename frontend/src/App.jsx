import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DriveView from './components/DriveView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

function blobFromCanvas(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.82);
  });
}

const App = () => {
  const [currentTab, setCurrentTab] = useState('drive');
  const [isActive] = useState(true);
  const [sourceMode, setSourceMode] = useState('live');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [demoVideoName, setDemoVideoName] = useState('');
  const [detections, setDetections] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [frameSize, setFrameSize] = useState({ width: 1, height: 1 });
  const [apiError, setApiError] = useState('');
  const videoRef = useRef(null);
  const inFlightRef = useRef(false);
  const notificationTimeoutsRef = useRef([]);
  const spokenAlertsRef = useRef(new Set());

  useEffect(() => {
    return () => {
      notificationTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      if (demoVideoUrl) {
        URL.revokeObjectURL(demoVideoUrl);
      }
    };
  }, [demoVideoUrl]);

  useEffect(() => {
    let intervalId;

    const captureFrame = async () => {
      const video = videoRef.current;
      if (!video || inFlightRef.current || video.readyState < 2 || video.videoWidth === 0) {
        return;
      }

      inFlightRef.current = true;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob = await blobFromCanvas(canvas);
        if (!blob) {
          return;
        }

        const formData = new FormData();
        formData.append('image', blob, 'frame.jpg');

        const res = await fetch(`${API_BASE_URL}/detect`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || 'Detection request failed');
        }

        setApiError('');
        setDetections(Array.isArray(data?.detections) ? data.detections : []);
        setHazards(Array.isArray(data?.hazards) ? data.hazards : []);
        setFrameSize(data?.frame || { width: video.videoWidth, height: video.videoHeight });

        if (Array.isArray(data?.notifications) && data.notifications.length > 0) {
          setNotifications((current) => {
            const merged = [...data.notifications, ...current]
              .filter((alert, index, list) => list.findIndex((item) => item.id === alert.id) === index)
              .slice(0, 5);
            return merged;
          });

          data.notifications.forEach((alert) => {
            const timeout = window.setTimeout(() => {
              setNotifications((current) => current.filter((item) => item.id !== alert.id));
            }, 4200);
            notificationTimeoutsRef.current.push(timeout);

            if (
              typeof window !== 'undefined'
              && 'speechSynthesis' in window
              && alert.severity !== 'INFO'
              && !spokenAlertsRef.current.has(alert.id)
            ) {
              const utterance = new SpeechSynthesisUtterance(alert.speech || alert.message);
              utterance.rate = 1;
              utterance.pitch = 0.9;
              utterance.volume = 1;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utterance);
              spokenAlertsRef.current.add(alert.id);
            }
          });
        }
      } catch (error) {
        console.error('API Error:', error);
        setApiError(error.message);
      } finally {
        inFlightRef.current = false;
      }
    };

    if (isActive && currentTab === 'drive') {
      intervalId = window.setInterval(captureFrame, 650);
    } else {
      setDetections([]);
      setHazards([]);
      setNotifications([]);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [currentTab, isActive]);

  const handleDemoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (demoVideoUrl) {
      URL.revokeObjectURL(demoVideoUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setDemoVideoUrl(objectUrl);
    setDemoVideoName(file.name);
    setSourceMode('demo');
    setDetections([]);
    setHazards([]);
    setNotifications([]);
    setApiError('');
  };

  const clearDemoVideo = () => {
    if (demoVideoUrl) {
      URL.revokeObjectURL(demoVideoUrl);
    }

    setDemoVideoUrl('');
    setDemoVideoName('');
    setSourceMode('live');
    setDetections([]);
    setHazards([]);
    setNotifications([]);
    setApiError('');
  };

  const highestSeverity = hazards[0]?.severity || 'INFO';

  return (
    <div className="h-screen w-full bg-[#05080f] flex flex-col font-sans overflow-hidden text-white selection:bg-cyan-500/30">
      <div className="flex h-full w-full">
        <Sidebar currentTab={currentTab} setTab={setCurrentTab} />

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Topbar
            sourceMode={sourceMode}
            highestSeverity={highestSeverity}
            notification={notifications[0]}
          />

          <div className="flex-1 overflow-hidden relative">
            {currentTab === 'drive' && (
              <DriveView
                apiError={apiError}
                demoVideoName={demoVideoName}
                demoVideoUrl={demoVideoUrl}
                detections={detections}
                frameSize={frameSize}
                hazards={hazards}
                isActive={isActive}
                notifications={notifications}
                onClearDemo={clearDemoVideo}
                onDemoUpload={handleDemoUpload}
                setSourceMode={setSourceMode}
                sourceMode={sourceMode}
                videoRef={videoRef}
              />
            )}
            {currentTab === 'analytics' && <AnalyticsView />}
            {currentTab === 'settings' && <SettingsView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
