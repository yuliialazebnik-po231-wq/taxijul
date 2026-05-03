import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRBgzULksRgyjuwCBZ4ZhSsG5PXny5LfY",
  authDomain: "taxijul-fce5d.firebaseapp.com",
  projectId: "taxijul-fce5d",
  storageBucket: "taxijul-fce5d.firebasestorage.app",
  messagingSenderId: "762594992787",
  appId: "1:762594992787:web:6379cc6ab2b689d584e366"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);