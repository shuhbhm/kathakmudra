import bg from "./Assets/dashboard-bg.png";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerGlass}>
        <h1 style={titleStyle}>Mudracore AI</h1>
        {/* <p style={subtitleStyle}>Kathak Mudra Intelligence Platform</p> */}
      </div>

      {/* Bottom Buttons */}
        <div style={buttonContainer}>
        <button style={btnStyle} onClick={() => navigate("/different-kathak-gharanas")}>
          Different Kathak Gharanas
        </button>

        <button style={btnStyle} onClick={() => navigate("/different-hasta-mudras")}>
          Different Hasta Mudras
        </button>

        <button style={btnStyle} onClick={() => navigate("/real-time-mudra-detection")}>
          Real-Time Mudra Detection
        </button>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
};

/* Header Glass Card */
const headerGlass = {
  position: "absolute",
  top: "50px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "1px 60px",
  borderRadius: "20px",
  background: "rgba(30, 10, 10, 0.55)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  textAlign: "center",
};

/* Gradient Title */
const titleStyle = {
  fontSize: "3.8rem",
  fontWeight: "900",
  letterSpacing: "2px",
  background: "linear-gradient(90deg, #facc15, #f97316)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 10px 40px rgba(250, 204, 21, 0.35)",
};

/* Subtitle */
const subtitleStyle = {
  marginTop: "10px",
  fontSize: "1.15rem",
  color: "rgba(255, 245, 220, 0.9)",
  letterSpacing: "1px",
};

/* Button Container */
const buttonContainer = {
  position: "absolute",
  bottom: "50px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "28px",
  padding: "0 20px",
};

/* Buttons */
const btnStyle = {
  padding: "16px 34px",
  fontSize: "16px",
  fontWeight: "700",
  letterSpacing: "0.6px",
  borderRadius: "14px",
  border: "1px solid rgba(250, 204, 21, 0.5)",
  cursor: "pointer",
  color: "#fff7ed",
  background:
    "linear-gradient(135deg, rgba(250,204,21,0.35), rgba(249,115,22,0.35))",
  backdropFilter: "blur(8px)",
  boxShadow:
    "0 12px 30px rgba(0,0,0,0.45), inset 0 0 18px rgba(250,204,21,0.35)",
  transition: "all 0.35s ease",
};

export default Dashboard;
