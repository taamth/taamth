// connect and setup firebase 

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//set up again 
const firebaseConfig = {
  apiKey: "AIzaSyBGjdEMmbyHXhRNOncPcEtxU-eG16Mg1h0",
  authDomain: "react-firebase-t3h.firebaseapp.com",
  projectId: "react-firebase-t3h",
  storageBucket: "react-firebase-t3h.appspot.com",
  messagingSenderId: "732101481592",
  appId: "1:732101481592:web:2f4983b286a740d121c98d",
  measurementId: "G-70XRLK41RR"
};

// back alt + <-

// Initialize Firebase


firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider ();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider ();

// Get a reference to the database service
 //const database = new firebase.getDatabase(firebase.initializeApp(firebaseConfig));
export { auth, googleAuth, facebookAuthProvider}

export default firebase;


/*
firebase login
firebase init
firebase deploy
 */

