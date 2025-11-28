// lib/mediaLibrary.ts

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "video" | "audio";
  createdAt: number;
};

const STORAGE_KEY = "integrity_media_library_v1";

export function loadMediaLibrary(): MediaItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as MediaItem[];
  } catch (err) {
    console.error("Failed to load media library", err);
    return [];
  }
}

export function saveMediaLibrary(items: MediaItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save media library", err);
  }
}

export function addMediaItem(item: MediaItem) {
  const existing = loadMediaLibrary();
  const updated = [...existing, item];
  saveMediaLibrary(updated);
}
