import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Registrar Usuario
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Iniciar Sesión
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Cerrar Sesión
export const logoutUser = () => signOut(auth);

// Recuperar Contraseña
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
