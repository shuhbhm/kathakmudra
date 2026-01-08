export default function ImageModal({ image, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <img src={image} />
    </div>
  );
}
