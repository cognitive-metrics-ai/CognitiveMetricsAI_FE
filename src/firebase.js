// Firebase configuration and authentication providers
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNMNHKWXKx6z-AHCzIh_PhsoobVpv4SCg",
  authDomain: "cognitivemetricsai-902a5.firebaseapp.com",
  projectId: "cognitivemetricsai-902a5",
  storageBucket: "cognitivemetricsai-902a5.firebasestorage.app",
  messagingSenderId: "899344043772",
  appId: "1:899344043772:web:d268201b2b98cc00325179",
  measurementId: "G-QFKKS1YVSZ"
};

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, db };