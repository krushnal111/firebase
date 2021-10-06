import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyChY5i6rDpMcvCxmhLt85epIGwOJZ-zf44",
    authDomain: "fir-tutorial-158fe.firebaseapp.com",
    projectId: "fir-tutorial-158fe",
    storageBucket: "fir-tutorial-158fe.appspot.com",
    messagingSenderId: "472359447434",
    appId: "1:472359447434:web:11f3118207a33b1a31f673"
  };
const app=initializeApp(firebaseConfig)
  const db=getFirestore(app)
  export default db