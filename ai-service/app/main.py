from fastapi import FastAPI, UploadFile, File, HTTPException
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

def _has_tflite_runtime():
    try:
        import tflite_runtime.interpreter  # noqa: F401
        return True
    except ImportError:
        pass

    try:
        import tensorflow  # noqa: F401
        return True
    except ImportError:
        return False


def _can_use_model(candidate):
    if not candidate or not os.path.exists(candidate):
        return False
    if candidate.endswith(".tflite") and not _has_tflite_runtime():
        print(
            f"Skipping {candidate}: TensorFlow/TFLite runtime is not installed. "
            "Using a .pt model instead."
        )
        return False
    return True


# Prefer PyTorch models unless a compatible TFLite runtime is available.
MODEL_PATH = os.getenv("MODEL_PATH")
MODEL_CANDIDATES = [
    MODEL_PATH,
    "app/best.pt",
    "best.pt",
    "yolov8n.pt",
    "app/best.tflite",
    "best.tflite",
]

model = None
selected_model_path = None
for candidate in MODEL_CANDIDATES:
    if _can_use_model(candidate):
        model = YOLO(candidate)
        selected_model_path = candidate
        print(f"Loaded YOLO model: {candidate}")
        break

if model is None:
    raise FileNotFoundError(
        "No usable YOLO model file found. Install TensorFlow/TFLite for .tflite models "
        "or place a .pt model in ai-service."
    )

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image upload")

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

    return {
        "detections": detections,
        "frame": {
            "width": int(img.shape[1]),
            "height": int(img.shape[0]),
        },
        "model": selected_model_path,
    }
