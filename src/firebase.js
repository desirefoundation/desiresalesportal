import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDs1P-39sb-u1IrUkIcX1roqSJIK99Cxlk",
    authDomain: "desiresalesportal-9397a.firebaseapp.com",
    databaseURL: "https://desiresalesportal-9397a.firebaseio.com",
    projectId: "desiresalesportal-9397a",
    storageBucket: "",
    messagingSenderId: "713354689146",
    appId: "1:713354689146:web:b76ca164010d5526"
};

let firebaseapp = firebase.initializeApp(firebaseConfig)


export default firebaseapp