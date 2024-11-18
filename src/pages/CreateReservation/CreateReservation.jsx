import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./CreateReservation.css";

const CreateReservation = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      const tutorCollection = collection(db, "usuarios");
      const tutorSnapshot = await getDocs(tutorCollection);
      const tutorList = tutorSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((tutor) => tutor.isTutor);
      setTutors(tutorList);
    };

    fetchTutors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTutor || !date || !time) {
      setMessage("Por favor completa todos los campos.");
      return;
    }

    try {
      const reservation = {
        tutorId: selectedTutor,
        date,
        time,
        userId: "user-id-placeholder", // Aquí debes usar el ID del usuario autenticado
        status: "pendiente",
      };

      await addDoc(collection(db, "reservas"), reservation);
      setMessage("Reserva creada con éxito.");
    } catch (err) {
      console.error(err);
      setMessage("Error al crear la reserva.");
    }
  };

  return (
    <div className="create-reservation-container">
      <h1>Crear una Reserva</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tutor">Selecciona un Tutor:</label>
          <select
            id="tutor"
            value={selectedTutor}
            onChange={(e) => setSelectedTutor(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name || tutor.email}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Hora:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="btn-primary">
          Crear Reserva
        </button>
      </form>
    </div>
  );
};

export default CreateReservation;
