import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/config";
import { useAuth } from "../../context/AuthContext";
import "./TutorProfile.css";

const TutorProfile = () => {
  const { tutorId } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const docRef = doc(db, "tutors", tutorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTutor(docSnap.data());
        } else {
          console.error("No se encontró el tutor.");
        }
      } catch (error) {
        console.error("Error al cargar el perfil del tutor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  const handleScheduleClick = async (time) => {
    if (!user) {
      alert("Por favor, inicia sesión para contratar.");
      return;
    }

    try {
      const updatedSchedules = tutor.schedule.map((schedule) => {
        if (schedule.time === time && !schedule.student) {
          return {
            ...schedule,
            student: {
              name: user.displayName || "Estudiante Anónimo",
              email: user.email,
              uid: user.uid,
            },
          };
        }
        return schedule;
      });

      const docRef = doc(db, "tutors", tutorId);
      await updateDoc(docRef, { schedule: updatedSchedules });
      setTutor({ ...tutor, schedule: updatedSchedules });
      alert("Clase contratada exitosamente.");
    } catch (error) {
      console.error("Error al contratar horario:", error);
    }
  };

  const handleMarkAsCompleted = async (time) => {
    try {
      const updatedSchedules = tutor.schedule.map((schedule) => {
        if (schedule.time === time && schedule.student) {
          return {
            ...schedule,
            completed: true,
          };
        }
        return schedule;
      });

      const docRef = doc(db, "tutors", tutorId);
      await updateDoc(docRef, { schedule: updatedSchedules });
      setTutor({ ...tutor, schedule: updatedSchedules });
      alert("Clase marcada como completada.");
    } catch (error) {
      console.error("Error al marcar la clase como completada:", error);
    }
  };

  if (loading) {
    return <div className="tutor-profile-loading">Cargando...</div>;
  }

  if (!tutor) {
    return <div className="tutor-profile-error">Tutor no encontrado</div>;
  }

  return (
    <div className="tutor-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/150" // Cambia a la foto del tutor
            alt={`Foto de ${tutor.username}`}
          />
        </div>
        <h1 className="profile-name">{tutor.username}</h1>
        <p className="profile-slogan">"Educando para el futuro"</p>
      </div>
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {tutor.email}
        </p>
        <p>
          <strong>Materia:</strong> {tutor.subject || "No especificado"}
        </p>
        <p>
          <strong>Precio por hora:</strong> ${tutor.price}
        </p>
        <p className="profile-description">
          {tutor.description || "Sin descripción disponible."}
        </p>
      </div>

      <div className="profile-schedule">
        <h2>Horarios Disponibles</h2>
        {tutor.schedule && tutor.schedule.length > 0 ? (
          <ul className="schedule-list">
            {tutor.schedule.map((schedule, index) => (
              <li key={index} className="schedule-item">
                {schedule.time}{" "}
                {schedule.student ? (
                  <>
                    <span className="schedule-reserved">
                      Reservado por {schedule.student.name}
                    </span>
                    {schedule.completed ? (
                      <span className="schedule-completed"> (Completada)</span>
                    ) : (
                      <button
                        className="schedule-button-complete"
                        onClick={() => handleMarkAsCompleted(schedule.time)}
                      >
                        Marcar como completada
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="schedule-button"
                    onClick={() => handleScheduleClick(schedule.time)}
                  >
                    Contratar
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay horarios disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
