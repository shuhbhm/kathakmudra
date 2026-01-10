# server.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64
from ultralytics import YOLO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("phase1.pt")
model.to("cuda:0")


@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/infer_frame")
async def infer_frame(file: UploadFile = File(...)):
    image_bytes = await file.read()

    np_img = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    results = model(frame, conf=0.5, verbose=False)
    annotated = results[0].plot()

    _, buffer = cv2.imencode(".jpg", annotated)
    encoded = base64.b64encode(buffer).decode("utf-8")

    return {
        "frame": encoded,
        "max_conf": float(results[0].boxes.conf.max()) if results[0].boxes else 0.0
    }
