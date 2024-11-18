import React, { useState } from "react";
import { auth, db } from "../../services/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    username: "",
    subject: "",
    price: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, role, username, subject, price, description } =
      formData;

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar rol en Firestore
      await setDoc(doc(db, "roles", user.uid), {
        uid: user.uid,
        role,
      });

      // Guardar datos adicionales si el rol es tutor
      if (role === "tutor") {
        await setDoc(doc(db, "tutors", user.uid), {
          uid: user.uid,
          email: user.email,
          username,
          subject,
          price: parseFloat(price),
          description: description || "No hay descripción disponible",
          schedule: [], // Horarios disponibles vacíos por defecto
          assignedClasses: [], // Clases asignadas vacías por defecto
        });
      }

      alert("Registro exitoso. Por favor, inicia sesión.");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Error al registrar usuario: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Rol:
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="student">Estudiante</option>
            <option value="tutor">Tutor</option>
          </select>
        </label>
        <br />
        {formData.role === "tutor" && (
          <>
            <label>
              Nombre de Usuario:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Materia:
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Precio por Hora:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Breve Reseña (opcional):
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <br />
          </>
        )}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
