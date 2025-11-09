// lib/mediaQueue.ts
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, serverTimestamp, Timestamp, DocumentData } from "firebase/firestore";

export type TempMediaDoc = {
  uid: string;
  storagePath: string;
  kind: "image" | "video";
  shortOrVideo?: "short" | "video";
  durationSec?: number | null;
  createdAt: any;
  expiresAt: Timestamp;
  status: "pending" | "used" | "expired";
};

export async function saveTempMediaDoc(id: string, data: Omit<TempMediaDoc, "createdAt">) {
  await setDoc(doc(db, "tempMedia", id), {
    ...data,
    createdAt: serverTimestamp(),
  } as DocumentData);
}

export async function markTempMediaUsed(id: string) {
  await updateDoc(doc(db, "tempMedia", id), {
    status: "used",
    usedAt: serverTimestamp(),
  });
}
