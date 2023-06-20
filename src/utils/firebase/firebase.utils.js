import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbYMpUMBCqqq2KvyCldQZePvl4R8h1ELo",
    authDomain: "hva-shop.firebaseapp.com",
    projectId: "hva-shop",
    storageBucket: "hva-shop.appspot.com",
    messagingSenderId: "505023869401",
    appId: "1:505023869401:web:bef874384d96d40de2a9c8"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                            displayName,
                            email,
                            createdAt
                        });
        }
        catch(error) {
                    console.log('error creating user', error.message);
                }
    }
    return userDocRef;


    // If user data already exists, return userDocRef
    // If user data doesn't exist, create a new one
}
