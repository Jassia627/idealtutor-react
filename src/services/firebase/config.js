import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAh3MssqO2lrm7CmL36D0Bq_IKp6NG_wxA",
    authDomain: "inventario-29.firebaseapp.com",
    projectId: "inventario-29",
    storageBucket: "inventario-29.firebasestorage.app",
    messagingSenderId: "937340990491",
    appId: "1:937340990491:web:f5c583e995e5c9284134be",
    measurementId: "G-B27JJXMMRH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
