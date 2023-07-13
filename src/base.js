// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjZnlPzg82ekviWctsJ09qpRVEM-1Vs3A",
  authDomain: "final-project-77d4b.firebaseapp.com",
  projectId: "final-project-77d4b",
  storageBucket: "final-project-77d4b.appspot.com",
  messagingSenderId: "955540120541",
  appId: "1:955540120541:web:daf7e2ad819b4128f34c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;