import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Tutors.css";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const q = query(collection(db, "usuarios"), where("isTutor", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedTutors = [];
        querySnapshot.forEach((doc) => {
          fetchedTutors.push({ id: doc.id, ...doc.data() });
        });
        setTutors(fetchedTutors);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Cargando tutores...</p>;

  return (
    <div className="tutors-container">
      <h1>Lista de Tutores</h1>
      {tutors.length === 0 ? (
        <p>No hay tutores disponibles.</p>
      ) : (
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor.id}>
              <p>Correo: {tutor.email}</p>
              <p>Nombre: {tutor.name || "Sin nombre"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tutors;
