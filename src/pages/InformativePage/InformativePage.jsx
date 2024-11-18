import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import tutorIcon from "../../assets/tutor-icon.png";
import onlineIcon from "../../assets/online-icon.png";
import qualityIcon from "../../assets/quality-icon.png";
import mathIcon from "../../assets/math-icon.png";
import physicsIcon from "../../assets/physics-icon.png";
import chemistryIcon from "../../assets/chemistry-icon.png";
import "./InformativePage.css";

const InformativePage = () => {
  const navigate = useNavigate(); // Instanciar el hook de navegación

  const handleNavigateToServices = () => {
    navigate("/services"); // Redirigir a la página de servicios
  };

  return (
    <div className="informative-page">
      {/* Encabezado */}
      <div className="hero">
        <h1>Aprende con los mejores tutores</h1>
        <p>Encuentra el tutor perfecto para tus necesidades académicas</p>
        <button className="btn-primary" onClick={handleNavigateToServices}>
          Buscar Tutores
        </button>
      </div>

      {/* Sección de por qué elegirnos */}
      <section className="why-choose-us">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features">
          <div className="feature-card">
            <img src={tutorIcon} alt="Tutores Calificados" />
            <h3>Tutores Calificados</h3>
            <p>
              Todos nuestros tutores son verificados y tienen experiencia
              comprobada.
            </p>
          </div>
          <div className="feature-card">
            <img src={onlineIcon} alt="Clases Online y Presenciales" />
            <h3>Clases Online y Presenciales</h3>
            <p>
              Flexibilidad para elegir el formato que mejor se adapte a ti.
            </p>
          </div>
          <div className="feature-card">
            <img src={qualityIcon} alt="Calidad Garantizada" />
            <h3>Calidad Garantizada</h3>
            <p>
              Sistema de valoraciones y reseñas para asegurar la mejor
              experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de materias populares */}
      <section className="popular-subjects">
        <h2>Materias Populares</h2>
        <div className="subjects">
          <div className="subject-card">
            <img src={mathIcon} alt="Matemáticas" />
            <h3>Matemáticas</h3>
          </div>
          <div className="subject-card">
            <img src={physicsIcon} alt="Física" />
            <h3>Física</h3>
          </div>
          <div className="subject-card">
            <img src={chemistryIcon} alt="Química" />
            <h3>Química</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformativePage;
