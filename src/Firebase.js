// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc, limit, query, where } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSwOiBz3Su_tLaCgbbAjbUbsnxbXx1biQ",
  authDomain: "app-nuvem.firebaseapp.com",
  projectId: "app-nuvem",
  storageBucket: "app-nuvem.appspot.com",
  messagingSenderId: "60181340369",
  appId: "1:60181340369:web:bffd818fae7ff2a243e5f0",
  measurementId: "G-DVSVEX21YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(app);


export { 
  auth, 
  provider, 
  storage, 
  db, 
  limit, 
  query, 
  doc,
  signInWithPopup, 
  deleteObject, 
  deleteDoc,
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  storageRef, 
  uploadBytes, 
  getDownloadURL, 
  uploadBytesResumable, 
  where
};