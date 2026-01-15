import { useNavigate } from "react-router-dom";
import gharanaImg from "./Assets/gharanas.png"; // change filename if needed

const Gharana = () => {
  const navigate = useNavigate();

  return (
    <div style={page(gharanaImg)}>
      <button style={backBtn} onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default Gharana;

/* ========== STYLES ========== */

const page = (img) => ({
  minHeight: "100vh",
  width: "100%",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
});

const backBtn = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "10px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.6)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
};
