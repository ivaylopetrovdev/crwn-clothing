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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey);
//
//     const batch = firestore.batch();
//
//     objectsToAdd.forEach((obj) => {
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj);
//     });
//
//     return await batch.commit();
// }

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        })
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
