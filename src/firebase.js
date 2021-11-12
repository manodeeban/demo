// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkzJSAhZHRTjA5_LqMJkF_jLBCviwD40k",
  authDomain: "groupchat-2a505.firebaseapp.com",
  projectId: "groupchat-2a505",
  storageBucket: "groupchat-2a505.appspot.com",
  messagingSenderId: "220915634369",
  appId: "1:220915634369:web:1073f2bd784dd065920440",
  measurementId: "G-9J9SQ8SMZT"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;