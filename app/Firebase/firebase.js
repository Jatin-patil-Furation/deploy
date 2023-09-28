import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD6WX70-qABwLjkBTmKB368AmkjtTzkvzQ",
  authDomain: "teenp-authen.firebaseapp.com",
  projectId: "teenp-authen",
  storageBucket: "teenp-authen.appspot.com",
  messagingSenderId: "411489643045",
  appId: "1:411489643045:web:21cd404ac8dbced12a6dcc",
  measurementId: "G-TLXJVSSMBW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth()






