import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB4L1nqEQ_5pLM7feXu8zJYqJX5w13aOU",
  authDomain: "dampal-476c0.firebaseapp.com",
  projectId: "dampal-476c0",
  storageBucket: "dampal-476c0.firebasestorage.app",
  messagingSenderId: "901349722522",
  appId: "1:901349722522:web:28eeecf8a191e562819223",
  measurementId: "G-03F5FPJWGT",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
