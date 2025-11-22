// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBpOzDUHEr8qWm_R_fqMWcnYTZ0uJtrDpk",
  authDomain: "fir-auth-native-d3587.firebaseapp.com",
  projectId: "fir-auth-native-d3587",
  storageBucket: "fir-auth-native-d3587.firebasestorage.app",
  messagingSenderId: "586655638870",
  appId: "1:586655638870:web:6389a04183252eb539e2f7",
  measurementId: "G-HQF0NV154H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
