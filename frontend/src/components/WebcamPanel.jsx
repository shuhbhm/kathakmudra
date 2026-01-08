import { useEffect, useRef } from "react";

export default function WebcamPanel({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`webcam-panel ${!stream ? "inactive" : ""}`}>
      <video ref={videoRef} autoPlay playsInline />
      {!stream && <div className="webcam-overlay">Camera Off</div>}
    </div>
  );
}
