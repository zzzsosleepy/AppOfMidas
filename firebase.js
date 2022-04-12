// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEc2UN_S2TUkODf3lgBUAy1GAkIOKlXRk",
    authDomain: "appofmidas.firebaseapp.com",
    projectId: "appofmidas",
    storageBucket: "appofmidas.appspot.com",
    messagingSenderId: "485477349930",
    appId: "1:485477349930:web:63b2086e77090a32f5a153"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);