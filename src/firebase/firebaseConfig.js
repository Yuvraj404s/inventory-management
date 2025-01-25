// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDyWHPQwJuiY1VfkcqMdPAoPbuTbtRKlc4",
    authDomain: "inventory-c4b0e.firebaseapp.com",
    projectId: "inventory-c4b0e",
    storageBucket: "inventory-c4b0e.firebasestorage.app",
    messagingSenderId: "668756418709",
    appId: "1:668756418709:web:ace577b3e1104a6ea2fb9c",
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
