// lib/firebase.ts
// Client-side Firebase SDK for Integrity Streaming (web only)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Make sure we only initialize once (Next.js / hot reload safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Upload a file to Firebase Storage in a "published" path and return
 * a public download URL. This is a client-safe replacement for the
 * old uploadPublishedWithCache helper.
 */
export async function uploadPublishedWithCache(
  file: File,
  userId: string
): Promise<string> {
  // make filename safe-ish
  const safeName = file.name.replace(/\s+/g, "-");
  const path = `published/${userId}/${Date.now()}-${safeName}`;

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export default app;
