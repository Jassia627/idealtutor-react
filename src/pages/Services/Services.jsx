import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase/config";
import "./Services.css";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutors"));
        const tutorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTutors(tutorList);
        setFilteredTutors(tutorList);
      } catch (error) {
        console.error("Error al obtener tutores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleFilterChange = (subject) => {
    setSubjectFilter(subject);
    if (subject === "") {
      setFilteredTutors(tutors);
    } else {
      setFilteredTutors(
        tutors.filter(
          (tutor) =>
            tutor.subject &&
            tutor.subject.toLowerCase() === subject.toLowerCase()
        )
      );
    }
  };

  const handleViewProfile = (id) => {
    navigate(`/tutors/${id}`);
  };

  const handleContract = (id) => {
    alert(`Has contratado al tutor con ID: ${id}`);
  };

  if (loading) {
    return <div className="services-loading">Cargando tutores...</div>;
  }

  return (
    <div className="services-container">
      <header className="services-header">
        <h1>Encuentra el Tutor Perfecto</h1>
        <p>
          Explora nuestra red de tutores expertos y encuentra el apoyo académico
          que necesitas.
        </p>
      </header>
      <div className="services-filters">
        <input
          type="text"
          placeholder="Buscar por materia, tutor o tema..."
          value={subjectFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="services-search-bar"
        />
        <div className="services-subject-buttons">
          {["Todos", "Matemáticas", "Física", "Química", "Programación", "Idiomas"].map(
            (subject, index) => (
              <button
                key={index}
                onClick={() =>
                  handleFilterChange(subject === "Todos" ? "" : subject.toLowerCase())
                }
                className={`filter-btn ${
                  subjectFilter === subject.toLowerCase() ? "active" : ""
                }`}
              >
                {subject}
              </button>
            )
          )}
        </div>
      </div>
      <div className="services-tutors">
        {filteredTutors.map((tutor) => (
          <div key={tutor.id} className="tutor-card">
            <h3 className="tutor-name">{tutor.username}</h3>
            <p className="tutor-subject">
              Materia: {tutor.subject || "No especificado"}
            </p>
            <p className="tutor-price">
              Precio por hora: ${tutor.price || "No especificado"}
            </p>
            <p className="tutor-description">
              {tutor.description || "Sin descripción disponible."}
            </p>
            <div className="tutor-card-actions">
              <button
                className="btn-primary"
                onClick={() => handleViewProfile(tutor.id)}
              >
                Ver Perfil
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleContract(tutor.id)}
              >
                Contratar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
