import "firebase/auth";
import "firebase/firestore";
import { apps, app, initializeApp, auth, firestore } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCvK1MpOaUM4SaY6k8FnmHB0KqsE08up1M",
  authDomain: "moveit-d6327.firebaseapp.com",
  projectId: "moveit-d6327",
  storageBucket: "moveit-d6327.appspot.com",
  messagingSenderId: "615558272336",
  appId: "1:615558272336:web:47c4dc671e3c9b391c0855",
};

let firebaseApp;

if (apps.length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = app();
}

export const db = firebaseApp.firestore();
export const {
  FieldValue: { serverTimestamp },
} = firestore;

export { auth };
