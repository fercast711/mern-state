// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-711.firebaseapp.com",
  projectId: "mern-state-711",
  storageBucket: "mern-state-711.appspot.com",
  messagingSenderId: "349469470544",
  appId: "1:349469470544:web:aee7122db0b565be99c655"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);