// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEc2Sqb73wqwWMwS0IXTjnwphnoPx4x94",
  authDomain: "ecommerce-app-3f3de.firebaseapp.com",
  projectId: "ecommerce-app-3f3de",
  storageBucket: "ecommerce-app-3f3de.appspot.com",
  messagingSenderId: "767047133030",
  appId: "1:767047133030:web:bde55588f199ec6cafcaa7",
  measurementId: "G-2CZXG2PT7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth}