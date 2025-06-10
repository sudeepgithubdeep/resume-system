// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXkd3HN8IO0K8XQi6bHV7ZCiDCnRyYmRw",
  authDomain: "autoresume-sender.firebaseapp.com",
  projectId: "autoresume-sender",
  storageBucket: "autoresume-sender.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl",
  measurementId: "G-MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
