import React from "react";
import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";

const Dashboard = () => {
  const { role } = useAuth();

  if (!role) return <p>Cargando...</p>;

  return (
    <div>
      {role === "student" && <StudentDashboard />}
      {role === "tutor" && <TutorDashboard />}
    </div>
  );
};

export default Dashboard;
