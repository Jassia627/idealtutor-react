import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase/config"; // Ruta correcta al archivo de configuración de Firebase

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando...</p>; // Mostrar un mensaje mientras se carga la autenticación

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
