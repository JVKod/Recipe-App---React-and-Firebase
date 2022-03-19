//!IMPORTANT!
//install firebase using: npm install firebase


// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
<<<<<<< HEAD
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
=======
>>>>>>> 3320db8017e085c590b63fe2a380cd77b1524f0b
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiIest_CBY-A0_C3SoRTDvmNi1N0sPi1g",
  authDomain: "recipe-app-d6971.firebaseapp.com",
  projectId: "recipe-app-d6971",
  storageBucket: "recipe-app-d6971.appspot.com",
  messagingSenderId: "777780395778",
  appId: "1:777780395778:web:de0a56b25d520640768c1b",
  measurementId: "G-ZBK2HPZ5R6"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

<<<<<<< HEAD
export { auth, db };
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
=======
export { auth, db };
>>>>>>> 3320db8017e085c590b63fe2a380cd77b1524f0b
