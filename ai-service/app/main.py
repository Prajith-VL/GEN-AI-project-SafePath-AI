from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load a model from env or common local paths.
MODEL_PATH = os.getenv("MODEL_PATH")
MODEL_CANDIDATES = [
    MODEL_PATH,
    "app/best.pt",
    "app/best.tflite",
    "best.pt",
    "best.tflite",
    "yolov8n.pt",
]

model = None
for candidate in MODEL_CANDIDATES:
    if candidate and os.path.exists(candidate):
        model = YOLO(candidate)
        break

if model is None:
    raise FileNotFoundError(
        "No YOLO model file found. Set MODEL_PATH or place a model in ai-service."
    )

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference
    results = model(img)
    
    detections = []
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            conf = float(box.conf[0])
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            
            # Accept all detections from custom models
            detections.append({
                "label": label,
                "confidence": conf,
                "bbox": [x1, y1, x2 - x1, y2 - y1] # x, y, w, h
            })

    return detections
