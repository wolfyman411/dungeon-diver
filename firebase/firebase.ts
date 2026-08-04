// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "dungeon-diver-33653.firebaseapp.com",
  projectId: "dungeon-diver-33653",
  storageBucket: "dungeon-diver-33653.firebasestorage.app",
  messagingSenderId: "983862574868",
  appId: "1:983862574868:web:3e4240ed85076b7e43cc01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)