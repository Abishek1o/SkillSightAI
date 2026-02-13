import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6-XomAOSQZzrcfMMBrc1afs3qkbfwRvA",
    authDomain: "skillsight-ai-73a75.firebaseapp.com",
    projectId: "skillsight-ai-73a75",
    storageBucket: "skillsight-ai-73a75.appspot.com",
    messagingSenderId: "851985361071",
    appId: "1:851985361071:web:4c24e61f2ecf92d4020c5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
