// app/creator-studio/editor/_hooks/useTimelineStore.ts
"use client";

import { create } from "zustand";

export type Lane = "V1" | "V2" | "O1" | "A1";

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  kind: "video" | "image" | "other";
  from?: "device" | "uploads";
  duration?: number; // seconds for videos
};

export type Clip = {
  id: string;            // media id
  name: string;          // media name
  url?: string;          // media url
  kind?: "video" | "image" | "other";
  in: number;            // seconds
  out: number;           // seconds
  lane: Lane;
};

type Selected = { lane: Lane; index: number } | null;

type Store = {
  // viewer
  previewUrl?: string;
  setPreviewUrl: (u?: string) => void;

  // media pool
  mediaPool: MediaItem[];
  addMedia: (m: MediaItem) => void;
  setMediaPool: (m: MediaItem[]) => void;
  removeMedia: (id: string) => void;

  // timeline
  timeline: Clip[];
  addToTimelineById: (id: string, lane: Lane) => void;
  removeFromTimeline: (lane: Lane, index: number) => void;
  updateClip: (lane: Lane, index: number, patch: Partial<Clip>) => void;

  selected: Selected;
  setSelected: (s: Selected) => void;

  zoom: number; // 1..5
  setZoom: (z: number) => void;
};

export const useTimelineStore = create<Store>((set, get) => ({
  previewUrl: undefined,
  setPreviewUrl: (u) => set({ previewUrl: u }),

  mediaPool: [],
  addMedia: (m) => set((s) => ({ mediaPool: [m, ...s.mediaPool] })),
  setMediaPool: (m) => set({ mediaPool: m }),
  removeMedia: (id) =>
    set((s) => ({ mediaPool: s.mediaPool.filter((x) => x.id !== id) })),

  timeline: [],

  addToTimelineById: (id, lane) => {
    const { mediaPool, timeline } = get();
    const media = mediaPool.find((m) => m.id === id);
    if (!media) return;

    // default duration: full video duration if known; 10s for images; otherwise 30s
    const defaultOut =
      media.kind === "image"
        ? 10
        : (typeof media.duration === "number" && media.duration > 0
            ? media.duration
            : 30);

    const clip: Clip = {
      id: media.id,
      name: media.name,
      url: media.url,
      kind: media.kind,
      in: 0,
      out: defaultOut,
      lane,
    };

    const nextTimeline = [...timeline, clip];

    // compute index in lane for selection
    const laneClips = nextTimeline.filter((c) => c.lane === lane);
    const newIndexInLane = laneClips.length - 1;

    set({
      timeline: nextTimeline,
      previewUrl: media.url,
      selected: { lane, index: newIndexInLane },
    });
  },

  removeFromTimeline: (lane, index) =>
    set((s) => {
      let i = -1;
      const next = s.timeline.filter((c) => {
        if (c.lane !== lane) return true;
        i += 1;
        return i !== index;
      });
      return { timeline: next, selected: null };
    }),

  updateClip: (lane, index, patch) =>
    set((s) => {
      let i = -1;
      const next = s.timeline.map((c) => {
        if (c.lane !== lane) return c;
        i += 1;
        if (i !== index) return c;
        const merged = { ...c, ...patch };
        if (merged.in < 0) merged.in = 0;
        if (merged.out <= merged.in) merged.out = merged.in + 0.1;
        return merged;
      });
      return { timeline: next };
    }),

  selected: null,
  setSelected: (s) => set({ selected: s }),

  zoom: 3,
  setZoom: (z) => set({ zoom: Math.min(5, Math.max(1, z)) }),
}));
