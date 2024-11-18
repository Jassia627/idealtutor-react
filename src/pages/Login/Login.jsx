import React, { useState } from "react";
import { loginUser } from "../../services/firebase/auth";
import { db } from "../../services/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Iniciar sesión
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      // Obtener el rol del usuario desde la base de datos
      const userDoc = await getDoc(doc(db, "roles", user.uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;

        // Redirigir según el rol
        if (role === "tutor") {
          window.location.href = "/tutor-dashboard";
        } else if (role === "student") {
          window.location.href = "/ ";
        } else {
          setError("Rol no reconocido. Contacta al administrador.");
        }
      } else {
        setError("El usuario no tiene un rol asignado.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
