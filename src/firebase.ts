import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAHLtpI6lq4xWsMSwPsvyadqgkNMFmsKIs",
  authDomain: "recipe-binder-132b8.firebaseapp.com",
  projectId: "recipe-binder-132b8",
  storageBucket: "recipe-binder-132b8.appspot.com",
  messagingSenderId: "1010967933825",
  appId: "1:1010967933825:web:20c238a01f6701dabaae80"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
