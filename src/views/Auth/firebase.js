// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4r9BHO3XLcODuWd6QQljf5hMKw4rieOI",
  authDomain: "cognitivemetricsai.firebaseapp.com",
  projectId: "cognitivemetricsai",
  storageBucket: "cognitivemetricsai.firebasestorage.app",
  messagingSenderId: "156454114293",
  appId: "1:156454114293:web:46645d13463985b50906bc",
  measurementId: "G-L664CLM2T8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({ prompt: 'select_account' });
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db };
