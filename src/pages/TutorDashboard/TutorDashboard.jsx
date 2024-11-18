import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const TutorDashboard = () => {
  const { user } = useAuth();
  const [pricePerHour, setPricePerHour] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [contractedClasses, setContractedClasses] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    day: "",
    time: "",
  });

  // Cargar datos iniciales del tutor
  useEffect(() => {
    if (!user) return;

    const fetchTutorData = async () => {
      try {
        const tutorDocRef = doc(db, "tutors", user.uid);
        const tutorDoc = await getDoc(tutorDocRef);

        if (tutorDoc.exists()) {
          setPricePerHour(tutorDoc.data().pricePerHour || "");

          // Escuchar cambios en horarios
          const schedulesRef = collection(db, "tutors", user.uid, "schedules");
          onSnapshot(schedulesRef, (snapshot) => {
            const fetchedSchedules = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            // Filtrar clases contratadas
            const contracted = fetchedSchedules.filter(
              (schedule) => schedule.student
            );

            setSchedules(fetchedSchedules);
            setContractedClasses(contracted); // Clases contratadas
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos del tutor:", error);
      }
    };

    fetchTutorData();
  }, [user]);

  // Guardar precio por hora
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

  // Añadir horario
  const handleAddSchedule = async () => {
    if (!newSchedule.day || !newSchedule.time) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const scheduleRef = collection(db, "tutors", user.uid, "schedules");
      await addDoc(scheduleRef, { ...newSchedule, student: null, status: "available" });
      setNewSchedule({ day: "", time: "" });
    } catch (error) {
      console.error("Error al agregar horario:", error);
    }
  };

  // Eliminar horario
  const handleDeleteSchedule = async (id) => {
    try {
      const scheduleRef = doc(db, "tutors", user.uid, "schedules", id);
      await deleteDoc(scheduleRef);
    } catch (error) {
      console.error("Error al eliminar horario:", error);
    }
  };

  // Finalizar clase
  const handleFinishClass = async (id) => {
    try {
      const scheduleRef = doc(db, "tutors", user.uid, "schedules", id);
      await updateDoc(scheduleRef, { status: "completed" });
      alert("Clase finalizada exitosamente.");
    } catch (error) {
      console.error("Error al finalizar la clase:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "20px auto",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>Panel del Tutor</h1>

      {/* Configurar Precio */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Precio por Hora</h2>
        <input
          type="number"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          placeholder="Ingresa tu precio por hora"
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSavePrice}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Guardar Precio
        </button>
      </div>

      {/* Clases Contratadas */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Clases Contratadas</h2>
        {contractedClasses.length > 0 ? (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {contractedClasses.map((schedule) => (
              <li
                key={schedule.id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {schedule.day} - {schedule.time} -{" "}
                <span>
                  Contratado por {schedule.student.name} (
                  {schedule.student.email})
                </span>
                {schedule.status === "pending" && (
                  <button
                    onClick={() => handleFinishClass(schedule.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Finalizar Clase
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay clases contratadas.</p>
        )}
      </div>

      {/* Gestionar Horarios */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Horarios Disponibles</h2>
        <div>
          <select
            value={newSchedule.day}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, day: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Selecciona un día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, time: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleAddSchedule}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Agregar Horario
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {schedules.map((schedule) => (
            <li
              key={schedule.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {schedule.day} - {schedule.time} -{" "}
              {schedule.student ? (
                <span style={{ color: "red" }}>
                  Contratado por {schedule.student.name} (
                  {schedule.student.email})
                </span>
              ) : (
                <span style={{ color: "green" }}>Disponible</span>
              )}
              {!schedule.student && (
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TutorDashboard;
