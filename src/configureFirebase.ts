// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration.  
//
// Usually, you need to fastidiously guard API keys (for example, by 
// setting the keys as environment variables); 
// however, API keys for Firebase services are ok to include in code or checked-in config files.
const firebaseConfig = {
    apiKey: "AIzaSyAbSudpy9cHXeN5Um_LAW-DxUaZKFOXTk8",
    authDomain: "learning-auth-01.firebaseapp.com",
    projectId: "learning-auth-01",
    storageBucket: "learning-auth-01.appspot.com",
    messagingSenderId: "51627953059",
    appId: "1:51627953059:web:12dd76478e9e8c2dfbe816"
  };

// Initialize Firebase as a whole
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//Other auth providers include github, twitter, apple.
//These must be enabled in your firebase console.
export const googleAuthProvider = new GoogleAuthProvider();
