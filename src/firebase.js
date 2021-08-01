// < !--The core Firebase JS SDK is always required and must be listed first-- >
// <script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"></script>

// <!--TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js"></script>

import firebase from 'firebase';

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
firebase.initializeApp(firebaseConfig);
firebase.analytics();