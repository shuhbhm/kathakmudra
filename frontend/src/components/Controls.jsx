export default function Controls({ stream, onBurstCapture, loading }) {
  async function captureBurst() {
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    const frames = [];

    for (let i = 0; i < 10; i++) {
      const bitmap = await imageCapture.grabFrame();
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);
      const blob = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.9)
      );
      frames.push(blob);
      await new Promise((r) => setTimeout(r, 120));
    }

    onBurstCapture(frames);
  }

  return (
    <div className="controls">
      <button disabled={!stream || loading} onClick={captureBurst}>
        {loading ? "Processing..." : "Capture Burst"}
      </button>
    </div>
  );
}
