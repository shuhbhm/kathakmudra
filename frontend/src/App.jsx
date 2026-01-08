import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StreamPanel from "./components/StreamPanel";
import AlbumStrip from "./components/AlbumStrip";
import ImageModal from "./components/ImageModal";

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  function onNewFrame(frame, confidence) {
    if (confidence < 0.95) return;

    setGallery((prev) => {
      if (prev.length >= 15) return prev;
      return [frame, ...prev];
    });
  }

  return (
    <div className="app">
      <Header />

      <div className="content">
        <div className="stream-wrapper">
          <StreamPanel onAnnotatedFrame={onNewFrame} />
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
