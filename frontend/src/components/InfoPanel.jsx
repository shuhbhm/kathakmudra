export default function InfoPanel({ stream, setStream, onBurstCapture, loading }) {
  async function startCamera() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(mediaStream);
  }

  function stopCamera() {
    stream.getTracks().forEach((t) => t.stop());
    setStream(null);
  }

  async function captureBurst() {
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const frames = [];

    for (let i = 0; i < 10; i++) {
      const bitmap = await imageCapture.grabFrame();
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext("2d").drawImage(bitmap, 0, 0);

      const blob = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.9)
      );

      frames.push(blob);
      await new Promise((r) => setTimeout(r, 120));
    }

    onBurstCapture(frames);
  }

  return (
    <div className="info-panel">
      <h2>Kathak Mudra Detection</h2>
      <p>
        This system performs real-time mudra recognition using a custom YOLO
        model. Start the camera and capture a burst to analyze gestures.
      </p>

      <div className="button-row">
        {!stream ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}

        <button disabled={!stream || loading} onClick={captureBurst}>
          {loading ? "Processing…" : "Capture Burst"}
        </button>
      </div>
    </div>
  );
}
