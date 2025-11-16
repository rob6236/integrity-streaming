"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type CaptionSegment = {
  id: string;
  start: number; // seconds
  end: number;   // seconds
  text: string;
};

export type VideoItem = {
  id: string;
  title: string;
  url: string;
};

// 🔧 TEMP: placeholder video list until wired to Firestore
const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: "sample-1",
    title: "Sample Video (wire this to uploads later)",
    url: "/sample-video.mp4", // change to a real URL once you have it
  },
];

type CaptionsContextValue = {
  videos: VideoItem[];
  selectedVideoId: string | null;
  selectedVideo: VideoItem | null;
  language: string;
  captions: CaptionSegment[];
  currentTime: number;
  selectedCaptionId: string | null;
  isSaving: boolean;

  setVideo: (videoId: string) => void;
  setLanguage: (lang: string) => void;
  setCaptions: (segments: CaptionSegment[]) => void;
  updateCaption: (id: string, patch: Partial<CaptionSegment>) => void;
  addCaptionAfter: (afterId?: string) => void;
  deleteCaption: (id: string) => void;
  setCurrentTime: (time: number) => void;
  selectCaption: (id: string | null) => void;
  nudgeCaption: (id: string, deltaSeconds: number) => void;
  saveCaptions: () => Promise<void>;
};

const CaptionsContext = createContext<CaptionsContextValue | null>(null);

export function CaptionsProvider({ children }: { children: React.ReactNode }) {
  const [videos] = useState<VideoItem[]>(SAMPLE_VIDEOS);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    SAMPLE_VIDEOS[0]?.id ?? null
  );
  const [language, setLanguage] = useState<string>("en");
  const [captions, setCaptionsState] = useState<CaptionSegment[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedCaptionId, setSelectedCaptionId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  const selectedVideo = useMemo(
    () => videos.find((v) => v.id === selectedVideoId) ?? null,
    [videos, selectedVideoId]
  );

  const setVideo = useCallback((id: string) => {
    setSelectedVideoId(id);
    setCurrentTime(0);
    setCaptionsState([]);
    setSelectedCaptionId(null);
  }, []);

  const setCaptions = useCallback((segments: CaptionSegment[]) => {
    // sort by start time to keep timeline sane
    const sorted = [...segments].sort((a, b) => a.start - b.start);
    setCaptionsState(sorted);
  }, []);

  const updateCaption = useCallback(
    (id: string, patch: Partial<CaptionSegment>) => {
      setCaptionsState((prev) =>
        prev
          .map((c) => (c.id === id ? { ...c, ...patch } : c))
          .sort((a, b) => a.start - b.start)
      );
    },
    []
  );

  const addCaptionAfter = useCallback(
    (afterId?: string) => {
      let start = 0;
      let end = 2;

      if (afterId) {
        const idx = captions.findIndex((c) => c.id === afterId);
        if (idx >= 0) {
          start = captions[idx].end;
          end = start + 2;
        }
      } else if (captions.length > 0) {
        const last = captions[captions.length - 1];
        start = last.end;
        end = start + 2;
      }

      const id = `cap-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      const newSegment: CaptionSegment = {
        id,
        start,
        end,
        text: "New caption",
      };

      setCaptionsState((prev) =>
        [...prev, newSegment].sort((a, b) => a.start - b.start)
      );
      setSelectedCaptionId(id);
    },
    [captions]
  );

  const deleteCaption = useCallback((id: string) => {
    setCaptionsState((prev) => prev.filter((c) => c.id !== id));
    setSelectedCaptionId((prev) => (prev === id ? null : prev));
  }, []);

  const nudgeCaption = useCallback((id: string, deltaSeconds: number) => {
    setCaptionsState((prev) =>
      prev
        .map((c) =>
          c.id === id
            ? {
                ...c,
                start: Math.max(0, c.start + deltaSeconds),
                end: Math.max(c.start + deltaSeconds + 0.1, c.end + deltaSeconds),
              }
            : c
        )
        .sort((a, b) => a.start - b.start)
    );
  }, []);

  const saveCaptions = useCallback(async () => {
    if (!selectedVideo) return;
    setIsSaving(true);
    try {
      // 🔐 TODO: wire to Firestore / Storage
      // For now just log to console so you can see it's wired:
      console.log("Saving captions for video:", {
        videoId: selectedVideo.id,
        language,
        captions,
      });

      // simulate short delay
      await new Promise((res) => setTimeout(res, 600));
      alert("Captions saved locally (wire to Firebase next).");
    } catch (err) {
      console.error(err);
      alert("Failed to save captions. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  }, [captions, language, selectedVideo]);

  const value: CaptionsContextValue = {
    videos,
    selectedVideoId,
    selectedVideo,
    language,
    captions,
    currentTime,
    selectedCaptionId,
    isSaving,

    setVideo,
    setLanguage,
    setCaptions,
    updateCaption,
    addCaptionAfter,
    deleteCaption,
    setCurrentTime,
    selectCaption: setSelectedCaptionId,
    nudgeCaption,
    saveCaptions,
  };

  return (
    <CaptionsContext.Provider value={value}>
      {children}
    </CaptionsContext.Provider>
  );
}

export function useCaptions() {
  const ctx = useContext(CaptionsContext);
  if (!ctx) {
    throw new Error("useCaptions must be used inside <CaptionsProvider>");
  }
  return ctx;
}

/** --- Time helpers for displaying/editing HH:MM:SS.mmm --- */

export function formatTime(t: number): string {
  const totalMs = Math.round(t * 1000);
  const ms = totalMs % 1000;
  const totalSec = (totalMs - ms) / 1000;
  const s = totalSec % 60;
  const totalMin = (totalSec - s) / 60;
  const m = totalMin % 60;
  const h = (totalMin - m) / 60;

  const pad = (n: number, len: number) => n.toString().padStart(len, "0");
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}`;
}

export function parseTime(str: string): number {
  // expecting HH:MM:SS.mmm
  const match = str.trim().match(/^(\d+):(\d+):(\d+)(?:\.(\d{1,3}))?$/);
  if (!match) return 0;
  const [, hh, mm, ss, ms] = match;
  const h = Number(hh) || 0;
  const m = Number(mm) || 0;
  const s = Number(ss) || 0;
  const milli = Number(ms || "0");
  return h * 3600 + m * 60 + s + milli / 1000;
}

/** --- Very simple .srt / .vtt parsing helpers for UploadSubtitleFile --- */

export function parseSrtOrVtt(text: string): CaptionSegment[] {
  // extremely lightweight parser, good enough for MVP
  const blocks = text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const segments: CaptionSegment[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length < 2) continue;

    // line 1 can be index or time range
    let timeLineIndex = 0;
    if (/^\d+$/.test(lines[0].trim())) {
      timeLineIndex = 1;
    }

    const timeLine = lines[timeLineIndex];
    const textLines = lines.slice(timeLineIndex + 1);
    const timeMatch =
      timeLine &&
      timeLine.match(
        /(\d+:\d+:\d+[,\.]\d{1,3})\s*-->\s*(\d+:\d+:\d+[,\.]\d{1,3})/
      );
    if (!timeMatch) continue;

    const [, rawStart, rawEnd] = timeMatch;
    const start = parseTimeString(rawStart);
    const end = parseTimeString(rawEnd);

    segments.push({
      id: `cap-${segments.length}-${Date.now()}`,
      start,
      end,
      text: textLines.join(" "),
    });
  }

  return segments;
}

function parseTimeString(raw: string): number {
  const clean = raw.replace(",", ".").trim();
  const parts = clean.split(":");
  if (parts.length !== 3) return 0;
  const [hh, mm, rest] = parts;
  const [ss, ms = "0"] = rest.split(".");
  const h = Number(hh) || 0;
  const m = Number(mm) || 0;
  const s = Number(ss) || 0;
  const milli = Number(ms) || 0;
  return h * 3600 + m * 60 + s + milli / 1000;
}
