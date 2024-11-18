// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mingle-aa38e.firebaseapp.com",
  projectId: "mingle-aa38e",
  storageBucket: "mingle-aa38e.appspot.com",
  messagingSenderId: "645410495036",
  appId: "1:645410495036:web:fbc14a94e2bc453652c139"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);