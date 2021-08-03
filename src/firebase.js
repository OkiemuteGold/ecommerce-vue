// < !--The core Firebase JS SDK is always required and must be listed first-- >

// import firebase from 'firebase/app';
import firebase from 'firebase';
// import "firebase/auth";
// import "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyClHZeL9aR_SX0auv9nXB3S8z5hXk-ztMI",
    authDomain: "vue-store-560fc.firebaseapp.com",
    projectId: "vue-store-560fc",
    storageBucket: "vue-store-560fc.appspot.com",
    messagingSenderId: "1026668032357",
    appId: "1:1026668032357:web:dd20bcb182182e245bb18c",
    measurementId: "G-QHNXFGWF3Y"
};

// Initialize Firebase
export const fbase = firebase.initializeApp(firebaseConfig);
// firebase.analytics();