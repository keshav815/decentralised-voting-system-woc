import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDypyLiZCmrq3FGc5RF8nJM9_Ys0CfrnHU",
    authDomain: "fir-voting-252ad.firebaseapp.com",
    projectId: "fir-voting-252ad",
    storageBucket: "fir-voting-252ad.appspot.com",
    messagingSenderId: "316881149011",
    appId: "1:316881149011:web:cf6ada84fcb72a94d3faa6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();