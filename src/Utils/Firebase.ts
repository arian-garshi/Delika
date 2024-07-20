import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    getRedirectResult,
    onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgM7oowVFrK1RuCOjUkPwt-wXtjq9Aztg",
    authDomain: "delika-bc9be.firebaseapp.com",
    projectId: "delika-bc9be",
    storageBucket: "delika-bc9be.appspot.com",
    messagingSenderId: "922740478818",
    appId: "1:922740478818:web:51e5e3dfd5e63de573123b",
    measurementId: "G-2TQT6JSH7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const googleAutoProvider = new GoogleAuthProvider();
export const auth = getAuth();

googleAutoProvider.setCustomParameters({
    prompt: 'select_account'
});

auth.languageCode = 'no';

window.onload = () => {
    getRedirectResult(auth)
        .then((result) => {
            if (result) {
                const user = result.user;
                console.log('User: ', user);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error('Error getting redirect result: ', errorCode, errorMessage, email, credential);
        });
};


export const signInWithGoogle = (): Promise<{ user: any }> => {
    return signInWithPopup(auth, googleAutoProvider)
        .then((result) => {
            const user = result.user;
            return { user: user };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return Error(`${errorCode} - ${errorMessage}`);
        }) as Promise<{ user: any }>;
}

export const signInWithEmailAndPassword = (email: string, password: string): Promise<{ user: any }> => {
    return firebaseSignInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { user: user };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return Error(`${errorCode} - ${errorMessage}`);
        }) as Promise<{ user: any }>;
}

interface FirebaseError {
    code: string;
    message: string;
}

export const createUserWithEmailAndPassword = async (email: string, password: string): Promise<{ user: any }> => {
    try {
        const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
        console.log('User created: ', userCredential);
        return userCredential;
    } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        throw new Error(`${errorCode} - ${errorMessage}`);
    }
};

// Function to get user data from Firestore whenever status of the user changes
export const onAuthStateChange = (callback: (user: any) => void) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}


// Function to sign out user
export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out: ', error);
    }
};