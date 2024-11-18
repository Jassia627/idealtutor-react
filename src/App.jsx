import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import InformativePage from "./pages/InformativePage/InformativePage";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Services from "./pages/Services/Services";
import TutorProfile from "./pages/TutorProfile/TutorProfile";
import AboutPage from "./pages/AboutUs/AboutUs";

// Componente de Rutas Protegidas
const ProtectedRoute = ({ role, allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <Router>
      <Header />
      <main style={{ padding: "80px 20px", minHeight: "calc(100vh - 120px)" }}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<InformativePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tutors/:tutorId" element={<TutorProfile />} />
          <Route path="/about" element={<AboutPage />} /> 
          

          {/* Rutas Protegidas */}
          <Route
            path="/tutor-dashboard"
            element={
              <ProtectedRoute role={role} allowedRoles={["tutor"]}>
                <TutorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute role={role} allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
