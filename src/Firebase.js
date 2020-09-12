import * as firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ7UVz0lX9OKnKGmNmX01HHOPfC0EJn-k",
    authDomain: "booklist-11.firebaseapp.com",
    databaseURL: "https://booklist-11.firebaseio.com",
    projectId: "booklist-11",
    storageBucket: "booklist-11.appspot.com",
    messagingSenderId: "419785655892",
    appId: "1:419785655892:web:facc5b63782bd70ded0fc1",
    measurementId: "G-02QCCDTFHK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

export { db };