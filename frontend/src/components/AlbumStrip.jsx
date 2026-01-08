export default function AlbumStrip({ images, onSelect }) {
  return (
    <div className="album-strip">
      {images.map((img, idx) => (
        <img key={idx} src={img} onClick={() => onSelect(img)} />
      ))}
    </div>
  );
}
