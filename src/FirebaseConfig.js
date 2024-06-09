// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4qYOLtRtCSjP8Sm24XFd5DmhdGRHf5l4",
  authDomain: "utakmerchant.firebaseapp.com",
  databaseURL: "https://utakmerchant-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "utakmerchant",
  storageBucket: "utakmerchant.appspot.com",
  messagingSenderId: "1076706332815",
  appId: "1:1076706332815:web:6a4d5ffc6fb47b2370a0fa",
  measurementId: "G-2TPD0WBG1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;