
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ7_pdPyDTLx8arkxyoJ8PtLW6pl2Hipc",
  authDomain: "app-proyecto-27d00.firebaseapp.com",
  databaseURL: "https://app-proyecto-27d00-default-rtdb.firebaseio.com",
  projectId: "app-proyecto-27d00",
  storageBucket: "app-proyecto-27d00.firebasestorage.app",
  messagingSenderId: "616749071610",
  appId: "1:616749071610:web:ce3a24909c3e1c81761d43"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);


export const auth = getAuth();
