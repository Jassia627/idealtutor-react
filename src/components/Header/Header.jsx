import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import logo from "../../assets/logo.png"; // Asegúrate de que el logo esté en esta ruta

const Header = () => {
  const { user, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Has cerrado sesión exitosamente.");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="IdealTutor Logo" className="logo" />
        </Link>
        <span className="brand-name"></span>
      </div>
      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/services">Tutores</Link>
        <Link to="/about">Nosotros</Link>
        {user ? (
          <>
            {role === "tutor" ? (
              <Link to="/tutor-dashboard" className="profile-btn">
                Mi Perfil
              </Link>
            ) : (
              <Link to="/student-dashboard" className="profile-btn">
                Mi Perfil
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-primary">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="register-btn">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
