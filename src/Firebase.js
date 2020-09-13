import firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_85gpvls9jv6bNaZiw2DalADh-agJZvI",
    authDomain: "booklist-111.firebaseapp.com",
    databaseURL: "https://booklist-111.firebaseio.com",
    projectId: "booklist-111",
    storageBucket: "booklist-111.appspot.com",
    messagingSenderId: "794105790950",
    appId: "1:794105790950:web:1932cb8b11ccdeed68d627",
    measurementId: "G-6KL48C8L1Y"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export { db , auth };