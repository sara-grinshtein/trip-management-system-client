import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="main-title">
        בית ספר בנות משה יוצאות לטיול!
      </h1>

      <button
        className="button"
        onClick={() => navigate("/login")}
      >
        התחברות
      </button>

      <button
        className="button"
        onClick={() => navigate("/register")}
      >
        הרשמה
      </button>
    </div>
  );
}