import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvAexSmkL0wy8v_r2CCwJgmMoJJVAXWg0",
    authDomain: "clone-2601d.firebaseapp.com",
    projectId: "clone-2601d",
    storageBucket: "clone-2601d.appspot.com",
    messagingSenderId: "437493375185",
    appId: "1:437493375185:web:8989d5e9b657712fdc25f0",
    measurementId: "G-TSX8QJ9TBG"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


export { db, auth, provider };