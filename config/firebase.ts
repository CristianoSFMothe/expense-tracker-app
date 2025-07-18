import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByZ1Vx8pd8LXnz1B0_X_k58WTuGnVFR-Y",
  authDomain: "expense-tracker-dcf03.firebaseapp.com",
  projectId: "expense-tracker-dcf03",
  storageBucket: "expense-tracker-dcf03.firebasestorage.app",
  messagingSenderId: "365912425062",
  appId: "1:365912425062:web:d6b94035e8b18a0085a3a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// DB
export const firestore = getFirestore(app);
