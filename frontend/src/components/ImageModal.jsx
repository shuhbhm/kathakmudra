import { useEffect } from "react";

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="image-modal" onClick={onClose}>
      <img src={image} alt="Annotated full view" />
    </div>
  );
}
