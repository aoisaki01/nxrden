import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC9cPoa_Ukv4bOD5e6LnKW92hWY9MvoRdg",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "nordenstore.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "nordenstore",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "nordenstore.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "370568951260",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:370568951260:web:a5a01bc66a14270e1d4b19",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://nordenstore-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
