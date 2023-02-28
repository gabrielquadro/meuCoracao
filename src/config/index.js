import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCm4mo-vmkQXNtgl0Mh7vQ56OGZBgsfEUE",
  authDomain: "meucoracao-9703a.firebaseapp.com",
  projectId: "meucoracao-9703a",
  storageBucket: "meucoracao-9703a.appspot.com",
  messagingSenderId: "1062596210475",
  appId: "1:1062596210475:web:195c03451596e2b7311f6e",
  measurementId: "G-4WXTFR24GT",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = app.firestore();

export { db, auth, app, firebase };
