// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXcDU45tLPOrSubulkpQeLS62OO1Nt8AI",
    authDomain: "marketplace-c75c0.firebaseapp.com",
    projectId: "marketplace-c75c0",
    storageBucket: "marketplace-c75c0.appspot.com",
    messagingSenderId: "473560176461",
    appId: "1:473560176461:web:2c3ac2b771eb71832f4904",
    measurementId: "G-HE9ZWK8FTZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);