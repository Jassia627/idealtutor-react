import React, { useState } from "react";
import { db } from "../../services/firebase/config";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const CompleteProfile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    price: "",
    experience: "",
    schedule: [],
  });
  const [newSchedule, setNewSchedule] = useState({ date: "", time: "" });

  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.time) {
      setProfileData({
        ...profileData,
        schedule: [...profileData.schedule, newSchedule],
      });
      setNewSchedule({ date: "", time: "" });
    }
  };

  const handleSubmit = async () => {
    try {
      const tutorDoc = doc(db, "tutors", currentUser.uid);
      await updateDoc(tutorDoc, {
        price: profileData.price,
        experience: profileData.experience,
        schedule: profileData.schedule,
      });
      alert("Perfil completado con éxito.");
    } catch (error) {
      console.error("Error al completar el perfil:", error);
    }
  };

  return (
    <div>
      <h1>Completa tu Perfil</h1>
      <div>
        <label>
          Precio por hora:
          <input
            type="number"
            value={profileData.price}
            onChange={(e) => setProfileData({ ...profileData, price: e.target.value })}
          />
        </label>
        <br />
        <label>
          Años de experiencia:
          <input
            type="number"
            value={profileData.experience}
            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
          />
        </label>
        <br />
        <label>
          Añadir horario:
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
          />
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
          />
          <button onClick={handleAddSchedule}>Añadir</button>
        </label>
        <ul>
          {profileData.schedule.map((s, index) => (
            <li key={index}>
              {s.date} - {s.time}
            </li>
          ))}
        </ul>
        <br />
        <button onClick={handleSubmit}>Guardar Perfil</button>
      </div>
    </div>
  );
};

export default CompleteProfile;
