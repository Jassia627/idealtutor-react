import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const TutorDashboard = () => {
  const { user } = useAuth();
  const [pricePerHour, setPricePerHour] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    day: "",
    time: "",
  });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTutorData = async () => {
      try {
        const tutorDocRef = doc(db, "tutors", user.uid);
        const tutorDoc = await getDoc(tutorDocRef);

        if (tutorDoc.exists()) {
          const tutorData = tutorDoc.data();
          setPricePerHour(tutorData.pricePerHour || "");
          setSchedules(tutorData.schedule || []);
          setClasses(
            tutorData.schedule.filter((schedule) => schedule.student) || []
          );
        }
      } catch (error) {
        console.error("Error al cargar los datos del tutor:", error);
      }
    };

    fetchTutorData();
  }, [user]);

  const handleSavePrice = async () => {
    if (!pricePerHour) {
      alert("Por favor ingresa un precio válido.");
      return;
    }

    try {
      const tutorDocRef = doc(db, "tutors", user.uid);
      await updateDoc(tutorDocRef, { pricePerHour });
      alert("Precio actualizado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el precio:", error);
    }
  };

  const handleAddSchedule = async () => {
    if (!newSchedule.day || !newSchedule.time) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const tutorDocRef = doc(db, "tutors", user.uid);
      const tutorDoc = await getDoc(tutorDocRef);

      if (tutorDoc.exists()) {
        const currentSchedules = tutorDoc.data().schedule || [];
        const updatedSchedules = [
          ...currentSchedules,
          {
            day: newSchedule.day,
            time: newSchedule.time,
            student: null,
          },
        ];

        await updateDoc(tutorDocRef, { schedule: updatedSchedules });
        alert("Horario agregado correctamente.");
        setSchedules(updatedSchedules);
        setNewSchedule({ day: "", time: "" });
      }
    } catch (error) {
      console.error("Error al agregar el horario:", error);
    }
  };

  const handleDeleteSchedule = async (time) => {
    try {
      const tutorDocRef = doc(db, "tutors", user.uid);
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.time !== time
      );

      await updateDoc(tutorDocRef, { schedule: updatedSchedules });
      setSchedules(updatedSchedules);
      alert("Horario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar horario:", error);
    }
  };

  const handleEndClass = async (time) => {
    try {
      const tutorDocRef = doc(db, "tutors", user.uid);
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.time === time) {
          return { ...schedule, student: null };
        }
        return schedule;
      });

      await updateDoc(tutorDocRef, { schedule: updatedSchedules });
      setSchedules(updatedSchedules);
      alert("Clase finalizada.");
    } catch (error) {
      console.error("Error al finalizar la clase:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "20px auto" }}>
      <h1>Panel del Tutor</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Precio por Hora</h2>
        <input
          type="number"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          placeholder="Ingresa tu precio por hora"
        />
        <button onClick={handleSavePrice}>Guardar Precio</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Horarios Disponibles</h2>
        <select
          value={newSchedule.day}
          onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
        >
          <option value="">Selecciona un día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
        </select>
        <input
          type="time"
          value={newSchedule.time}
          onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
        />
        <button onClick={handleAddSchedule}>Agregar Horario</button>
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.time}>
              {schedule.day} - {schedule.time}{" "}
              {schedule.student ? (
                <span>Reservado por {schedule.student.name}</span>
              ) : (
                <button onClick={() => handleDeleteSchedule(schedule.time)}>
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Clases Contratadas</h2>
        {classes.length > 0 ? (
          <ul>
            {classes.map((cls) => (
              <li key={cls.time}>
                {cls.day} - {cls.time} (Estudiante: {cls.student.name})
                <button onClick={() => handleEndClass(cls.time)}>
                  Finalizar Clase
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay clases contratadas.</p>
        )}
      </div>
    </div>
  );
};

export default TutorDashboard;
