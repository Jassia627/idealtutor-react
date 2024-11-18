import React from "react";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {user?.email || "Estudiante"}!</h1>
      <p>Esta es tu área de gestión como estudiante.</p>
      <p>Puedes buscar tutores, gestionar tus reservas y más.</p>
    </div>
  );
};

export default StudentDashboard;
