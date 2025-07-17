import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRhFfV_qWkj5_BkQq5z_dx2zotM8XhMK0",
  authDomain: "react-pv.firebaseapp.com",
  projectId: "react-pv",
  storageBucket: "react-pv.firebasestorage.app",
  messagingSenderId: "341720186722",
  appId: "1:341720186722:web:30f5e9b54ee36def2ef63b",
  measurementId: "G-9MER3JTTZE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 