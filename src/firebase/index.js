
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPXScYVbSQVtfqQL_PXK6r-Ylt9ojq1kU",
  authDomain: "vue-note-app-3b9f9.firebaseapp.com",
  projectId: "vue-note-app-3b9f9",
  storageBucket: "vue-note-app-3b9f9.appspot.com",
  messagingSenderId: "954763617480",
  appId: "1:954763617480:web:50367463c74354525b31fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
  db
}