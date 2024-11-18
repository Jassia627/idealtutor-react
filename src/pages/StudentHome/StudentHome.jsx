import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const StudentHome = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutors"));
        const tutorsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTutors(tutorsList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener tutores:", error);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Cargando tutores...</p>;

  return (
    <div>
      <h1>Panel del Estudiante</h1>
      <h2>Buscar Tutores</h2>
      {tutors.length > 0 ? (
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor.id}>
              <h3>{tutor.name}</h3>
              <p>Materia: {tutor.subject}</p>
              <p>Precio por hora: ${tutor.price}</p>
              <p>Años de experiencia: {tutor.experience} años</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron tutores. Por favor, vuelve a intentarlo más tarde.</p>
      )}
    </div>
  );
};

export default StudentHome;
