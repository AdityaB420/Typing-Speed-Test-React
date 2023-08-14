import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA7QRfv6OR88JUPZCuAz2KBA3wPmlQ1aU4",
  authDomain: "typing-test-project-cc313.firebaseapp.com",
  projectId: "typing-test-project-cc313",
  storageBucket: "typing-test-project-cc313.appspot.com",
  messagingSenderId: "148249720132",
  appId: "1:148249720132:web:a37bf94ca4bcbbe3dd5311",
  measurementId: "G-LTYHGDS2TR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebaseApp.firestore();


export {auth,db};