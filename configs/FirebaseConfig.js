// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYKpmJZMfRPAGjfIkqVGZp4-UsQaB6gq8",
  authDomain: "bus-direct.firebaseapp.com",
  projectId: "bus-direct",
  storageBucket: "bus-direct.appspot.com",
  messagingSenderId: "580646908905",
  appId: "1:580646908905:web:5a9ff8a7b8221c108f5178",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
