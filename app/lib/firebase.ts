// app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP3UUhArTXN-vZhNxWYnNPtAJGyXNy0YI",
  authDomain: "integrity-streaming-4c27a.firebaseapp.com",
  projectId: "integrity-streaming-4c27a",
  storageBucket: "integrity-streaming-4c27a.firebasestorage.app",
  messagingSenderId: "58399697022",
  appId: "1:58399697022:web:6e21b545f1a69aeb73502f",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
