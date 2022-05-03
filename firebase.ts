// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD7Ef0OEFDpZrjSHU3mxGJ9HAAhKmKp3E",
  authDomain: "netflix-clone-45957.firebaseapp.com",
  projectId: "netflix-clone-45957",
  storageBucket: "netflix-clone-45957.appspot.com",
  messagingSenderId: "796541216485",
  appId: "1:796541216485:web:60b3b811cd1b8c5c93960c",
  measurementId: "G-036R73E1Z6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export {auth,db}