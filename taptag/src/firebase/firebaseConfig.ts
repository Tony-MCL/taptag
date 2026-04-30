import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpBwojBoDBeDfa0qJSEVsQKr03DO5O1vw",
  authDomain: "taptag-b47e9.firebaseapp.com",
  projectId: "taptag-b47e9",
  storageBucket: "taptag-b47e9.firebasestorage.app",
  messagingSenderId: "1059346462158",
  appId: "1:1059346462158:web:d5295cac43371b3472679f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);