import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBP4rmg3O7aPXluoeqYA_MV9LSW2UmFsFo",
    authDomain: "crwn-db-f2b.firebaseapp.com",
    projectId: "crwn-db-f2b",
    storageBucket: "crwn-db-f2b.appspot.com",
    messagingSenderId: "801897588261",
    appId: "1:801897588261:web:301ab8b57ea31a447b81cc",
    measurementId: "G-CEW080R21W"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
