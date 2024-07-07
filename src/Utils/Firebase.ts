// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdWvfCOEOnvkhlwnXChMVi6vrrlHH-atw",
    authDomain: "alkymisten-e5d66.firebaseapp.com",
    projectId: "alkymisten-e5d66",
    storageBucket: "alkymisten-e5d66.appspot.com",
    messagingSenderId: "591397651261",
    appId: "1:591397651261:web:355954a05214565af07b54",
    measurementId: "G-FKBSJXJP5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

authProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, authProvider);
export const signInWithEmailAndPassword = (email: string, password: string) => firebaseSignInWithEmailAndPassword(auth, email, password);
export const createUserWithEmailAndPassword = (email: string, password: string) => firebaseCreateUserWithEmailAndPassword(auth, email, password);

// Function to add user data to Firestore
export const addUserToFirestore = async (userId: string, data: any) => {
    try {
        await setDoc(doc(db, 'users', userId), data);
    } catch (error) {
        console.error('Error adding user to Firestore: ', error);
    }
};
