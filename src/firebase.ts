import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCNlxIA_PqDG0NKi1intHh5mkEe_ec8Yjw",
    authDomain: "desiresalesportal-60b40.firebaseapp.com",
    databaseURL: "https://desiresalesportal-60b40.firebaseio.com",
    projectId: "desiresalesportal-60b40",
    storageBucket: "",
    messagingSenderId: "918801702238",
    appId: "1:918801702238:web:80371a61b5d76905c083cf"
};

let firebaseapp = firebase.initializeApp(firebaseConfig)


export default firebaseapp