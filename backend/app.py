from fastapi import FastAPI, UploadFile, File
from typing import List
import cv2
import numpy as np
import base64
import torch
from ultralytics import YOLO
import logging
import time

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logger = logging.getLogger("MudraAI")

app = FastAPI(title="MudraAI YOLOv11 Backend")

MODEL_PATH = "best.pt"
device = "cuda" if torch.cuda.is_available() else "cpu"

logger.info("🚀 Starting MudraAI Backend...")
logger.info(f"📦 Loading YOLO model from: {MODEL_PATH}")
logger.info(f"🧠 Using device: {device}")

model = YOLO(MODEL_PATH).to(device)

logger.info("✅ Model loaded successfully")


@app.get("/")
async def health_check():
    logger.info("🩺 Health check ping received")
    return {"status": "healthy", "message": "MudraAI Backend is running"}


@app.post("/infer_frame")
async def infer_frame(file: UploadFile = File(...)):
    data = await file.read()
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)

    results = model.predict(img, conf=0.5, device=device, verbose=False)
    annotated = results[0].plot()

    success, buffer = cv2.imencode(".jpg", annotated)
    if not success:
        return {"frame": None}

    img_b64 = base64.b64encode(buffer).decode("utf-8")
    return {"frame": img_b64}

if __name__ == "__main__":
    import uvicorn
    logger.info("🌐 Starting Uvicorn server on 0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
