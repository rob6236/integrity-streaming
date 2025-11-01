"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AICaptionGenerator from "./_components/AICaptionGenerator";
import CaptionEditor, { CaptionItem } from "./_components/CaptionEditor";
import LanguageSelector from "./_components/LanguageSelector";
import SyncTimeline from "./_components/SyncTimeline";
import UploadSubtitleFile from "./_components/UploadSubtitleFile";

/** Brand colors */
const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

export default function CaptionsPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // In a later phase, pull this from shared EditorContext (current working video).
  const [videoSrc, setVideoSrc] = useState<string>("/sample-video.mp4"); // placeholder
  const [language, setLanguage] = useState<string>("en");
  const [captions, setCaptions] = useState<CaptionItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keep captions sorted by start time
  const sortedCaptions = useMemo(
    () => [...captions].sort((a, b) => a.start - b.start),
    [captions]
  );

  // Helpers exposed to children
  const jumpTo = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(time, v.duration || Infinity));
    v.play().catch(() => {}); // ignore autoplay blocking
  };

  const setSelectedStartFromVideo = () => {
    const v = videoRef.current;
    if (!v || !selectedId) return;
    setCaptions((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, start: v.currentTime } : c))
    );
  };

  const setSelectedEndFromVideo = () => {
    const v = videoRef.current;
    if (!v || !selectedId) return;
    setCaptions((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, end: v.currentTime } : c))
    );
  };

  // Simple gold outline card
  const card = "rounded-2xl p-4 border";
  const goldOutline = { borderColor: gold };

  return (
    <main
      className="min-h-screen w-full"
      style={{ background: burgundy, color: white }}
    >
      <h1 className="sr-only">Integrity Streaming — Captions</h1>

      {/* Header */}
      <header
        className="w-full border-b px-5 py-4 flex items-center justify-between"
        style={{ borderColor: gold }}
      >
        <div className="text-lg font-semibold">
          Creator Studio / <span style={{ color: gold }}>Captions</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />
          <UploadSubtitleFile onLoaded={setCaptions} />
          <AICaptionGenerator onDraft={(draft) => setCaptions(draft)} />
        </div>
      </header>

      {/* Grid */}
      <div className="grid gap-5 p-5"
           style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Left: Video + Timeline */}
        <section className={`${card}`} style={goldOutline}>
          <div className="rounded-xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              className="w-full h-[420px] object-contain bg-black"
            />
          </div>

          <div className="mt-4">
            <SyncTimeline
              videoRef={videoRef}
              onSetStart={setSelectedStartFromVideo}
              onSetEnd={setSelectedEndFromVideo}
              hasSelection={!!selectedId}
            />
          </div>
        </section>

        {/* Right: Caption Editor */}
        <section className={`${card} max-h-[78vh] overflow-auto`} style={goldOutline}>
          <CaptionEditor
            captions={sortedCaptions}
            onChange={setCaptions}
            onJump={jumpTo}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </section>
      </div>
    </main>
  );
}
