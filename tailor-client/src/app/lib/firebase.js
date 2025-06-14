import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0Vx_RF7oPYSau4O0DmVY8EIFXP7tOoCQ",
  authDomain: "tailor-8ddaf.firebaseapp.com",
  projectId: "tailor-8ddaf",
  storageBucket: "tailor-8ddaf.firebasestorage.app",
  appId: "1:849761558789:web:14d96110309dd90417d76c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();