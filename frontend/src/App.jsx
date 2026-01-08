import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebcamPanel from "./components/WebcamPanel";
import InfoPanel from "./components/InfoPanel";
import AlbumStrip from "./components/AlbumStrip";
import ImageModal from "./components/ImageModal";
import { inferBatch } from "./api";

export default function App() {
  const [stream, setStream] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleBurstCapture(frames) {
    try {
      setLoading(true);
      const result = await inferBatch(frames);
      const images = result.frames.map(
        (b64) => `data:image/jpeg;base64,${b64}`
      );
      setGallery(images);
    } catch {
      alert("Inference failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />

      <div className="content">
        <div className="top-panels">
          <WebcamPanel stream={stream} />
          <InfoPanel
            stream={stream}
            setStream={setStream}
            onBurstCapture={handleBurstCapture}
            loading={loading}
          />
        </div>

        {gallery.length > 0 && (
          <AlbumStrip images={gallery} onSelect={setSelectedImage} />
        )}
      </div>

      <Footer />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
