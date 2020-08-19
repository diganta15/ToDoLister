import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD8Yrr7eGkPH73E4KocJOqcCNX88hwJl8w",
    authDomain: "todolister-wec.firebaseapp.com",
    databaseURL: "https://todolister-wec.firebaseio.com",
    projectId: "todolister-wec",
    storageBucket: "todolister-wec.appspot.com",
    messagingSenderId: "967493782003",
    appId: "1:967493782003:web:b857860cb671f5fc486a86",
    measurementId: "G-XQZZGSG3DY"

});

export  { firebaseConfig as firebase};