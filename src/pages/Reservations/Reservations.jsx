 
import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Reservations.css";

const Reservations = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const q = query(
          collection(db, "reservas"),
          where("usuarioId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedReservas = [];
        querySnapshot.forEach((doc) => {
          fetchedReservas.push({ id: doc.id, ...doc.data() });
        });
        setReservas(fetchedReservas);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div className="reservations-container">
      <h1>Mis Reservas</h1>
      {reservas.length === 0 ? (
        <p>No tienes reservas actualmente.</p>
      ) : (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <p>Fecha: {reserva.fecha}</p>
              <p>Hora: {reserva.hora}</p>
              <p>Tutor: {reserva.tutor}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reservations;
