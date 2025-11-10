// /lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

/* -------------------- Firebase init -------------------- */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/* -------------------- Helpers -------------------- */

/** Small filename sanitizer for safer storage paths */
function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

/** SHA-256 of a File (used as a cache key) */
async function sha256OfFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Uploads to Storage under a deterministic path and returns a **public URL**.
 * If the same file (by SHA-256) was uploaded before by this user, we reuse it (cache hit).
 * Path: published/{uid}/{hash}_{filename}
 * Sets long-lived Cache-Control for CDN/browser caching.
 */
export async function uploadPublishedWithCache(
  file: File,
  uid: string
): Promise<string> {
  if (!uid) throw new Error("Missing uid");

  const hash = await sha256OfFile(file);
  const key = `published/${uid}/${hash}_${safeName(file.name || "file.bin")}`;
  const objRef = storageRef(storage, key);

  // Try cache hit
  try {
    await getMetadata(objRef); // exists
    return await getDownloadURL(objRef);
  } catch (e: any) {
    // storage/object-not-found -> proceed to upload
    if (e?.code && e.code !== "storage/object-not-found") throw e;
  }

  // Upload (cache miss)
  const task = uploadBytesResumable(objRef, file, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "public, max-age=31536000, immutable",
  });

  await new Promise<UploadTaskSnapshot>((resolve, reject) => {
    task.on(
      "state_changed",
      () => {},
      (err) => reject(err),
      () => resolve(task.snapshot)
    );
  });

  return await getDownloadURL(objRef);
}

export default app;
