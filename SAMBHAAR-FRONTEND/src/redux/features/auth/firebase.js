import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDHaGZfk1DQ6VeYAz6d3Ssdd8rm7R-IXI",
    authDomain: "sambhaar.firebaseapp.com",
    projectId: "sambhaar",
    storageBucket: "sambhaar.firebasestorage.app",
    messagingSenderId: "910352612419",
    appId: "1:910352612419:web:cb5f358c32038d115e28f6",
    measurementId: "G-F0QJ5MDD05"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
