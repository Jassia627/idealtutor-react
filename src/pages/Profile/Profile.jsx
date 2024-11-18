import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto", textAlign: "center", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h1>Perfil</h1>
      <p>Nombre del Tutor:</p>
      <h2>{user?.displayName || "Usuario"}</h2>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Abrir Dashboard
      </button>
    </div>
  );
};

export default Profile;
