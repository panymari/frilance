import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6-e3WVkxac11G7NMGzU_jqdFvC8AkKYI",
  authDomain: "frilance.firebaseapp.com",
  projectId: "frilance",
  storageBucket: "frilance.appspot.com",
  messagingSenderId: "228611155660",
  appId: "1:228611155660:web:922d15db6898362fc04469",
  measurementId: "G-YSLEFHKE25"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);