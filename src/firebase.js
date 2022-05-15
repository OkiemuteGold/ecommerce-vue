// < !--The core Firebase JS SDK is always required and must be listed first-- >

// import firebase from 'firebase/app';
import firebase from 'firebase';
require("firebase/firestore");
// import "firebase/auth";
// import "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import config from "../config.txt";

var firebaseConfig = {
    apiKey: config[0].key,
    authDomain: config[0].authDomain,
    projectId: config[0].projectId,
    storageBucket: config[0].storageBucket,
    messagingSenderId: config[0].messagingSenderId,
    appId: config[0].appId,
    measurementId: config[0].measurementId
};

// Initialize Firebase
const fbase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fbase, db };

// firebase.analytics();