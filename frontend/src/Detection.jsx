import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import StreamPanel from "../src/components/StreamPanel"
import WebcamPanel from "../src/components/WebcamPanel"
const Detection = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  function onNewFrame(frame, confidence) {
    if (confidence < STREAM_CONFIG.CONF_THRESHOLD) return;

    setGallery((prev) => {
      if (prev.length >= STREAM_CONFIG.MAX_GALLERY_FRAMES) return prev;
      return [frame, ...prev];
    });
  }
  return (
    <div style={page}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={bgVideo}
      >
        <source src="/final_video (1).mp4" type="video/mp4" />
      </video>

   <Header className={title} />
    
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

      {/* Back Button */}
      <button style={backBtn} onClick={() => navigate("/")}>
        ← Back
      </button>
    </div>
  );
};

export default Detection;

/* =======================
   INLINE STYLES
   ======================= */

const page = {
  position: "relative",
  minHeight: "100vh",
  overflow: "hidden",
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#fff",
};

const bgVideo = {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -2,
  filter: "brightness(0.45)",
};

/* Title */
const title = {
  position: "absolute",
  top: "22px",
  width: "100%",
  textAlign: "center",
  fontSize: "28px",
  fontWeight: "600",
  letterSpacing: "0.5px",
};

/* Glass Main Container */
const glassContainer = {
  position: "absolute",
  top: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "92%",
  height: "72%",
  display: "flex",
  gap: "18px",
  padding: "18px",
  borderRadius: "22px",
  background: "rgba(255, 235, 200, 0.18)",
  border: "2px solid rgba(255, 235, 200, 0.55)",
  backdropFilter: "blur(12px)",
};

/* Left Panel */
const leftPanel = {
  flex: 3,
  borderRadius: "18px",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: "500",
};

/* Camera text */
const cameraText = {
  opacity: 0.85,
};

/* Right Panel */
const rightPanel = {
  flex: 1,
  borderRadius: "18px",
  background: "rgba(0,0,0,0.35)",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

/* Right panel title */
const rightTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "8px",
};

/* Right panel text */
const rightText = {
  fontSize: "14px",
  opacity: 0.9,
};

/* Start Button */
const startBtn = {
  marginTop: "auto",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  background: "#fff",
  color: "#000",
};

/* Footer */
const footer = {
  position: "absolute",
  bottom: "18px",
  width: "100%",
  textAlign: "center",
  fontSize: "13px",
  opacity: 0.85,
  lineHeight: "1.4",
};

/* Back Button */
const backBtn = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.6)",
  background: "rgba(0,0,0,0.4)",
  color: "#fff",
  cursor: "pointer",
};
