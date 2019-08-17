import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCae6ACNKA5GY7OWa5WS7G3_qUFsKlopFQ",
    authDomain: "desiresalesportal.firebaseapp.com",
    databaseURL: "https://desiresalesportal.firebaseio.com",
    projectId: "desiresalesportal",
    storageBucket: "",
    messagingSenderId: "428365341883",
    appId: "1:428365341883:web:6b807be59aa63424"
};

let firebaseapp = firebase.initializeApp(firebaseConfig)


export default firebaseapp