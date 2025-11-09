// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// --- Initialize ---
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// --- Helper: Upload Public File with Cache ---
export async function uploadPublishedWithCache(file: File, userId?: string): Promise<string> {
  try {
    const safeUserId = userId || "public";
    const path = `uploads/published/${safeUserId}/${Date.now()}-${file.name}`;
    const fileRef = ref(storage, path);

    // Upload file and set caching headers
    const uploadTask = uploadBytesResumable(fileRef, file, {
      contentType: file.type,
      customMetadata: {
        cacheControl: "public,max-age=31536000", // cache for 1 year
      },
    });

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        reject,
        () => resolve()
      );
    });

    // Return public URL
    return await getDownloadURL(uploadTask.snapshot.ref);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export default app;
