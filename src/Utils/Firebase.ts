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
import { getFirestore, doc, setDoc, /*getDoc*/ } from "firebase/firestore"; // Import Firestore functions

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

// Initialize Firebase services
export const googleAutoProvider = new GoogleAuthProvider();
export const auth = getAuth();

googleAutoProvider.setCustomParameters({
    prompt: 'select_account'
});

auth.languageCode = 'no';

// Initialize Firestore
const db = getFirestore(app);

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
        const userCredential: { user: any } = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
        const userData = userCredential.user;
        return { user: userData };
    } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        throw new Error(`${errorCode} - ${errorMessage}`);
    }
};



// Function to add user data to Firestore
export const addUserToFirestore = async (userId: string, data: any) => {
    try {
        await setDoc(doc(db, 'users', userId), data);
    } catch (error) {
        console.error('Error adding user to Firestore: ', error);
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

export const registerUser = async (email: string, password: any, name: any, lastname: any) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            email: user.email,
            name: name,
            lastname: lastname,
            firebaseId: user.uid,
        });

        console.log("User registered successfully:", user.uid);
        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
/*
const fetchUser = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        console.error("User not found");
        return null;
    }
}*/