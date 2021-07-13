import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyDdDmO8ltBcj7J5H3StV8jediuN8NiRx2A",
    authDomain: "microcall-ad320.firebaseapp.com",
    projectId: "microcall-ad320",
    storageBucket: "microcall-ad320.appspot.com",
    messagingSenderId: "127672073949",
    appId: "1:127672073949:web:91aa5884534017f47b2534"
  }).auth();