import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVUSNtpSngnha3uTioBEKrRblnAmJKclo",
  authDomain: "shop-7ed7a.firebaseapp.com",
  projectId: "shop-7ed7a",
  storageBucket: "shop-7ed7a.appspot.com",
  messagingSenderId: "765634822081",
  appId: "1:765634822081:web:26c1ee2a2d9620ae28f940"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig