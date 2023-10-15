import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCACirvYukPsIl2tUiQdPEo27AiML75PGA",
  authDomain: "acl-data.firebaseapp.com",
  projectId: "acl-data",
  storageBucket: "acl-data.appspot.com",
  messagingSenderId: "960619185312",
  appId: "1:960619185312:web:163391668736900f84b5c5",
  measurementId: "G-CXTRRY5FSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);