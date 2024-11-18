import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const StudentDashboard = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutors"));
        const tutorsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTutors(tutorsList);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener tutores:", err);
        setError("No se pudieron cargar los tutores. Verifica tu conexión.");
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Cargando tutores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Panel del Estudiante</h1>
      <h2>Buscar Tutores</h2>
      {tutors.length === 0 ? (
        <p>No se encontraron tutores. Por favor, vuelve a intentarlo más tarde.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tutors.map((tutor) => (
            <div key={tutor.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px", width: "200px" }}>
              <h3>{tutor.name}</h3>
              <p>Materia: {tutor.subject}</p>
              <p>Calificación: {tutor.rating || "N/A"}</p>
              <button>Reservar Clase</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
