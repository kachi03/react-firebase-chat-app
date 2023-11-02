// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBx9K64772omA1127i01rp_o5Aey4_eTvw",
  authDomain: "mainchat-6648d.firebaseapp.com",
  projectId: "mainchat-6648d",
  storageBucket: "mainchat-6648d.appspot.com",
  messagingSenderId: "958777892753",
  appId: "1:958777892753:web:4e26d2c46ba428aff6c430",
  measurementId: "G-SH7B93MVLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();