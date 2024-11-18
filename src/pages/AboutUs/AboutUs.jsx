import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
        <p>
          En <span>IdealTutor</span>, creemos en el poder de la educación. Nuestro objetivo es conectar estudiantes
          con tutores altamente calificados, ofreciendo una experiencia de aprendizaje única y personalizada.
        </p>
      </div>
      <div className="about-mission">
        <div className="mission-card">
          <h2>Misión</h2>
          <p>
            Proporcionar una plataforma confiable y fácil de usar para ayudar a los estudiantes a alcanzar su máximo
            potencial académico con la guía de tutores expertos.
          </p>
        </div>
        <div className="mission-card">
          <h2>Visión</h2>
          <p>
            Convertirnos en la plataforma líder de tutorías personalizadas en línea y presenciales, reconocida por su
            calidad y resultados excepcionales.
          </p>
        </div>
      </div>
      <div className="social-links">
        <h2>Conéctate con Nosotros</h2>
        <div className="social-buttons">
          <a href="https://www.facebook.com/profile.php?id=61568427737129&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
            Facebook
          </a>
          <a href="https://x.com/idealtutor_3?t=TezARsATFLXSX71oOL71Eg&s=09" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
            Twitter
          </a>
          <a href="https://www.instagram.com/idealtutor29/?hl=es" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@ideal_tutor?_t=8rSEfw2mXns&_r=1" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
