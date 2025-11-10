// app/creator-studio/editor/_lib/firestore.ts
"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";

/* =========================
   Types (mirror data model)
   ========================= */

export type VideoDoc = {
  title: string;
  sourceUrl: string;          // original in Storage/R2
  proxyUrl?: string;          // optional 540p proxy for smooth preview
  durationMs: number;
  fps: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  ownerId?: string;           // recommended for security rules
};

export type ThumbnailDoc = {
  url: string;
  prompt?: string;
  selected: boolean;
  createdAt: Timestamp;
};

export type CaptionsDoc = {
  url: string;
  format: "vtt" | "srt";
  language: string;           // e.g. "EN"
  selected: boolean;
  createdAt: Timestamp;
};

export type TimelineClip = {
  id: string;
  sourceUrl: string;          // use proxy if toggle is on
  startMs: number;            // position on timeline
  endMs: number;              // position on timeline
  inMs: number;               // trim in-point within source
  outMs: number;              // trim out-point within source
  volume: number;             // 0..1
  speed: number;              // 0.5 | 1 | 2
  fades?: { inMs?: number; outMs?: number };
  overlayText?: { type: "title" | "lowerThird"; text: string };
};

export type Marker = { id: string; atMs: number; label?: string; color?: string };

export type EditDoc = {
  videoId: string;
  timeline: {
    tracks: Array<Array<TimelineClip>>; // [ [clip, clip], [clip] ] etc.
    markers: Array<Marker>;
  };
  useProxy: boolean;
  lastSavedAt: Timestamp;
};

/* =========================
   Collection references
   ========================= */

const videosCol = collection(db, "videos");
const editsCol  = collection(db, "edits");

/* =========================
   Videos
   ========================= */

/** List uploads for current user (expects ownerId on video docs). */
export async function listUserVideos(
  user: User,
  max = 100
): Promise<Array<{ id: string; data: VideoDoc }>> {
  const qy = query(
    videosCol,
    where("ownerId", "==", user.uid),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, data: d.data() as VideoDoc }));
}

/** Fetch a single video. */
export async function getVideo(videoId: string): Promise<VideoDoc | null> {
  const d = await getDoc(doc(videosCol, videoId));
  return d.exists() ? (d.data() as VideoDoc) : null;
}

/** Selected thumbnail for status chip (or null). */
export async function getSelectedThumbnail(videoId: string): Promise<ThumbnailDoc | null> {
  const thumbs = collection(db, `videos/${videoId}/thumbnails`);
  const qy = query(thumbs, where("selected", "==", true), limit(1));
  const snap = await getDocs(qy);
  const first = snap.docs[0];
  return first ? (first.data() as ThumbnailDoc) : null;
}

/** Selected captions for status chip (or null). */
export async function getSelectedCaptions(videoId: string): Promise<CaptionsDoc | null> {
  const caps = collection(db, `videos/${videoId}/captions`);
  const qy = query(caps, where("selected", "==", true), limit(1));
  const snap = await getDocs(qy);
  const first = snap.docs[0];
  return first ? (first.data() as CaptionsDoc) : null;
}

/* =========================
   Edits (create if missing)
   ========================= */

/**
 * Returns edits/{videoId}. If missing, creates a default doc with a single
 * full-length clip from the video (prefers proxy when requested & available).
 */
export async function getOrCreateEdit(
  videoId: string,
  opts?: { preferProxy?: boolean }
): Promise<{ id: string; data: EditDoc }> {
  const editRef = doc(editsCol, videoId); // editId === videoId
  const existing = await getDoc(editRef);

  if (existing.exists()) {
    return { id: existing.id, data: existing.data() as EditDoc };
  }

  const v = await getVideo(videoId);
  if (!v) throw new Error("Video not found; cannot initialize edit");

  const chosenSource = opts?.preferProxy && v.proxyUrl ? v.proxyUrl : v.sourceUrl;

  const defaultClip: TimelineClip = {
    id: crypto.randomUUID(),
    sourceUrl: chosenSource,
    startMs: 0,
    endMs: v.durationMs ?? 0,
    inMs: 0,
    outMs: v.durationMs ?? 0,
    volume: 1,
    speed: 1,
  };

  const newEdit: EditDoc = {
    videoId,
    timeline: {
      tracks: [[defaultClip]],
      markers: [],
    },
    useProxy: Boolean(opts?.preferProxy && v.proxyUrl),
    // Cast is fine for client usage; Firestore will store a server timestamp.
    lastSavedAt: serverTimestamp() as unknown as Timestamp,
  };

  await setDoc(editRef, newEdit);
  const fresh = await getDoc(editRef);
  return { id: fresh.id, data: fresh.data() as EditDoc };
}

/** Subscribe to live updates for edits/{editId}. Returns an unsubscribe fn. */
export function watchEdit(editId: string, cb: (edit: EditDoc | null) => void) {
  const ref = doc(editsCol, editId);
  return onSnapshot(ref, (snap) => {
    cb(snap.exists() ? (snap.data() as EditDoc) : null);
  });
}

/** Save partial changes (used by autosave/manual save). */
export async function saveEdit(editId: string, partial: Partial<EditDoc>) {
  const ref = doc(editsCol, editId);
  await updateDoc(ref, {
    ...partial,
    lastSavedAt: serverTimestamp(),
  });
}
