// import { useEffect, useRef, useState } from "react";

// const BACKEND_URL = "http://localhost:8000";

// export default function StreamPanel({ onAnnotatedFrame }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);

//   useEffect(() => {
//     if (!streaming) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const interval = setInterval(async () => {
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const blob = await new Promise((res) =>
//         canvas.toBlob(res, "image/jpeg", 0.85)
//       );

//       const formData = new FormData();
//       formData.append("file", blob, "frame.jpg");

//       const res = await fetch(`${BACKEND_URL}/infer_frame`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (!data.frame) return;

//       const img = new Image();
//       img.src = `data:image/jpeg;base64,${data.frame}`;

//       img.onload = () => {
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       };

//       onAnnotatedFrame(img.src, data.max_conf);
//     }, 200); // ~5 FPS

//     return () => clearInterval(interval);
//   }, [streaming]);

//   async function start() {
//     const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = mediaStream;
//     setStreaming(true);
//   }

//   function stop() {
//     videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//     setStreaming(false);
//   }

//   return (
//     <div className="stream-wrapper">
//       <div className="stream-panel">
//         <video ref={videoRef} autoPlay playsInline hidden />
//         <canvas ref={canvasRef} width={640} height={480} />
//       </div>

//       <div className="control-panel">
//         <h3>Live Inference</h3>
//         <p>Only detections ≥ 95% confidence are saved.</p>

//         {!streaming ? (
//           <button onClick={start}>Start Streaming</button>
//         ) : (
//           <button onClick={stop}>Stop Streaming</button>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";

const BACKEND_URL = "http://localhost:8000";

export default function StreamPanel({ onAnnotatedFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!streaming) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const interval = setInterval(async () => {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.85)
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
    }, 200);

    return () => clearInterval(interval);
  }, [streaming]);

  async function start() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
