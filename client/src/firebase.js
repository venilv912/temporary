// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-e4c7a.firebaseapp.com",
  projectId: "realestate-e4c7a",
  storageBucket: "realestate-e4c7a.firebasestorage.app",
  messagingSenderId: "640229210805",
  appId: "1:640229210805:web:ba14480a326506455e5cfc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);