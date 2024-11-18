import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const AssignedClasses = () => {
  const { currentUser } = useAuth(); // Asegúrate de tener un contexto de autenticación
  const [classes, setClasses] = useState([]); // Inicialización correcta
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedClasses = async () => {
      try {
        // Consulta a Firestore para obtener las clases asignadas al tutor actual
        const classesQuery = query(
          collection(db, "reservations"),
          where("tutorId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(classesQuery);
        const classList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las clases asignadas:", error);
        setLoading(false);
      }
    };

    fetchAssignedClasses();
  }, [currentUser]);

  if (loading) return <p>Cargando clases asignadas...</p>;

  return (
    <div>
      <h2>Clases Asignadas</h2>
      {classes.length === 0 ? (
        <p>No tienes clases asignadas.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <p><strong>Estudiante:</strong> {classItem.studentName}</p>
              <p><strong>Fecha:</strong> {classItem.date}</p>
              <p><strong>Hora:</strong> {classItem.time}</p>
              <p><strong>Duración:</strong> {classItem.duration} horas</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedClasses;
