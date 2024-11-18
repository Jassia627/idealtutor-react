 
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
        <p>Conectamos estudiantes con los mejores tutores.</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/about">Nosotros</a></li>
            <li><a href="/services">Servicios</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: idealtutor@gmail.co,</p>
          <p>Tel: 3207182841</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Plataforma de Tutorías</p>
      </div>
    </footer>
  );
};

export default Footer;
    