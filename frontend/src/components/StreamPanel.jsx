import { useEffect, useRef, useState } from "react";

import { STREAM_CONFIG } from "../config";



const BACKEND_URL = "http://localhost:8000";

export default function StreamPanel({ onAnnotatedFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
  if (!streaming) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const intervalMs = 1000 / STREAM_CONFIG.TARGET_FPS;

  const interval = setInterval(async () => {
    // Resize once per frame (controlled)
    canvas.width = STREAM_CONFIG.FRAME_WIDTH;
    canvas.height = STREAM_CONFIG.FRAME_HEIGHT;

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      STREAM_CONFIG.FRAME_WIDTH,
      STREAM_CONFIG.FRAME_HEIGHT
    );

    const blob = await new Promise((res) =>
      canvas.toBlob(
        res,
        "image/jpeg",
        STREAM_CONFIG.JPEG_QUALITY
      )
    );

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");


    const res = await fetch(`${BACKEND_URL}/infer_frame`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.frame) return;

    const img = new Image();
    img.src = `data:image/jpeg;base64,${data.frame}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    onAnnotatedFrame(img.src, data.max_conf);
  }, intervalMs);

  return () => clearInterval(interval);
  }, [streaming]);

  async function start() {
  // STEP 1: Check available media devices
  const devices = await navigator.mediaDevices.enumerateDevices();
  const hasVideoInput = devices.some(
    (device) => device.kind === "videoinput"
  );

  // STEP 2: If no webcam found → notify and exit
  if (!hasVideoInput) {
    alert("No webcam detected");
    return;
  }

  // STEP 3: Start camera normally
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = mediaStream;
  setStreaming(true);
  }

  function stop() {
    videoRef.current.srcObject?.getTracks().forEach((t) => t.stop());
    setStreaming(false);
  }

  return (
    <div className="stream-wrapper">
      <div className="stream-panel">
        <video ref={videoRef} autoPlay playsInline hidden />
        <canvas ref={canvasRef} width={640} height={480} />

        {/* CAMERA OFF OVERLAY */}
        {!streaming && (
          <div className="camera-off-overlay">
            Camera Off
          </div>
        )}
      </div>

      <div className="control-panel">
        <h3>Live Inference</h3>
        <p>Only ≥95% confidence detections are saved.</p>

        {!streaming ? (
          <button onClick={start}>Start Streaming</button>
        ) : (
          <button onClick={stop}>Stop Streaming</button>
        )}
      </div>
    </div>
  );
}
