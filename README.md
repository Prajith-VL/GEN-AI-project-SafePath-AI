# RoadGuard AI

RoadGuard AI is a multi-service road-safety monitoring project with a React dashboard, an Express backend, and a FastAPI-based computer vision service powered by YOLO.

## Project structure

```text
roadguard-ai/
|-- frontend/    # React + Vite dashboard
|-- backend/     # Express API gateway
`-- ai-service/  # FastAPI detection service
```

## Architecture overview

- `frontend` captures frames from the browser camera and sends them to the backend.
- `backend` accepts uploaded image frames and forwards them to the AI service.
- `ai-service` runs YOLO inference and returns detected objects with labels, confidence, and bounding boxes.

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Lucide React
- Backend: Node.js, Express, Multer, Axios
- AI service: FastAPI, Ultralytics YOLO, OpenCV, NumPy

## Prerequisites

- Node.js 18+
- Python 3.11+
- `pip`

## Setup

### 1. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

### 3. AI service

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Environment variables

### Frontend

- `VITE_API_BASE_URL`: Base URL for the backend API. Default: `http://localhost:3001`

### Backend

- `PORT`: Backend port. Default: `3001`
- `AI_SERVICE_URL`: Base URL for the AI service. Default: `http://localhost:8000`

### AI service

- `MODEL_PATH`: Optional path to the YOLO model file. If omitted, the service tries common local model paths.

## API

### `POST /detect`

Accepts a multipart form upload with an `image` field and returns an array of detections:

```json
[
  {
    "label": "pothole",
    "confidence": 0.91,
    "bbox": [120.5, 85.2, 64.0, 40.3]
  }
]
```

## Notes before pushing to GitHub

- Do not commit `node_modules`, Python virtual environments, or generated caches.
- Large model files such as `yolov8n.pt` and `best.tflite` can be committed only if you intentionally want them versioned; otherwise consider Git LFS or external storage.
- This repo currently contains both install artifacts and source code. The `.gitignore` added here keeps future commits clean.

## Suggested first commit contents

- Source code in `frontend`, `backend`, and `ai-service/app`
- Dependency manifests: `package.json`, `package-lock.json`, and `requirements.txt`
- Repo docs and config: `README.md`, `.gitignore`, `.gitattributes`, and `.env.example` files
