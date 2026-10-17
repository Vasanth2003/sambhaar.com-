
// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';

// Your Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyBCjoLk5kNtJyN81tCSdp6E_d23kCrQYUk",
    authDomain: "sambhaar-24105.firebaseapp.com",
    projectId: "sambhaar-24105",
    storageBucket: "sambhaar-24105.firebasestorage.app",
    messagingSenderId: "845543414177",
    appId: "1:845543414177:web:9a62b9b976097be03793e0",
    measurementId: "G-409RD42MH0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

