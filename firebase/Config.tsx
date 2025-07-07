
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDZ7_pdPyDTLx8arkxyoJ8PtLW6pl2Hipc",
    authDomain: "app-proyecto-27d00.firebaseapp.com",
    projectId: "app-proyecto-27d00",
    storageBucket: "app-proyecto-27d00.firebasestorage.app",
    messagingSenderId: "616749071610",
    appId: "1:616749071610:web:ce3a24909c3e1c81761d43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
