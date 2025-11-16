"use client";

import React, { useRef } from "react";
import {
  CaptionsProvider,
  useCaptions,
  type CaptionSegment as CapSeg,
} from "./_components/utils";
import LanguageSelector from "./_components/LanguageSelector";
import UploadSubtitleFile from "./_components/UploadSubtitleFile";
import AICaptionGenerator from "./_components/AICaptionGenerator";
import CaptionEditor from "./_components/CaptionEditor";
import SyncTimeline from "./_components/SyncTimeline";

function CaptionPageInner() {
  const {
    videos,
    selectedVideoId,
    setVideo,
    selectedVideo,
    captions,
    currentTime,
    setCurrentTime,
    saveCaptions,
    isSaving,
  } = useCaptions();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeCaption =
    captions.find(
      (c) => currentTime >= c.start && currentTime <= c.end
    ) ?? null;

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleScrubToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-[#7B0F24] text-yellow-200 flex flex-col items-center pb-10">
      <div className="w-[95%] max-w-6xl mt-10 border-4 border-[#FFD700] rounded-3xl px-10 py-8 bg-[#7B0F24] shadow-xl">
        {/* Centered title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FFD700] mb-3 text-center">
          Captions
        </h1>

        {/* Dashboard / Content Library centered */}
        <div className="flex gap-4 text-sm text-yellow-300 mb-6 justify-center text-center w-full">
          <span className="cursor-pointer underline-offset-4 hover:underline">
            Dashboard
          </span>
          <span className="cursor-pointer underline-offset-4 hover:underline">
            Content Library
          </span>
        </div>

        {/* row: video + language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2 items-center">
            {/* Choose a video label centered */}
            <span className="text-sm font-semibold text-yellow-300 text-center block w-full">
              Choose a video
            </span>

            {/* Gold pill wrapper */}
            <div className="rounded-full border border-[#FFD700] bg-[#7B0F24] px-2 py-1 w-full">
              <select
                value={selectedVideoId ?? ""}
                onChange={(e) => setVideo(e.target.value)}
                className="w-full bg-transparent border-none outline-none appearance-none text-center"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                {videos.map((v) => (
                  <option
                    key={v.id}
                    value={v.id}
                    style={{
                      color: "#FFFFFF",
                      backgroundColor: "#7B0F24",
                    }}
                  >
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Later this list... centered */}
            <span className="text-[11px] text-yellow-200 text-center block w-full">
              (Later this list will come directly from your Upload / Content
              Library.)
            </span>
          </div>

          <div className="flex justify-center md:justify-end">
            <LanguageSelector />
          </div>
        </div>

        {/* row: upload / AI / sync tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Upload card */}
          <div className="rounded-2xl border border-[#FFD700] bg-[#7B0F24] p-3">
            <div className="flex flex-col gap-2 items-center">
              {/* Upload .srt/.vtt label centered */}
              <span className="text-sm font-semibold text-yellow-300 text-center block w-full">
                Upload .srt / .vtt
              </span>
              <UploadSubtitleFile />
            </div>
          </div>

          {/* AI Caption Generator card */}
          <div className="rounded-2xl border border-[#FFD700] bg-[#7B0F24] p-3">
            <div className="flex flex-col gap-2 items-center">
              {/* AI Caption Generator label centered */}
              <span className="text-sm font-semibold text-yellow-300 text-center block w-full">
                AI Caption Generator
              </span>
              <AICaptionGenerator />
              {/* Stub text centered */}
              <span className="text-[11px] text-yellow-200 text-center block w-full">
                (Stubbed: uses demo captions now. We&apos;ll wire real AI next.)
              </span>
            </div>
          </div>

          {/* Sync tools card */}
          <div className="rounded-2xl border border-[#FFD700] bg-[#7B0F24] p-3">
            <div className="flex flex-col gap-2 items-center">
              {/* Sync tools heading centered */}
              <span className="text-sm font-semibold text-yellow-300 text-center block w-full">
                Sync tools
              </span>
              {/* Helper sentence centered */}
              <span className="text-[11px] text-yellow-200 text-center block w-full">
                Use the timeline below to sync captions with the audio. Select a
                block and nudge left/right or drag the playhead.
              </span>
            </div>
          </div>
        </div>

        {/* main work area: video + editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-3">
            <div className="relative rounded-2xl border-2 border-[#FFD700] overflow-hidden bg-black aspect-video">
              {selectedVideo?.url ? (
                <video
                  ref={videoRef}
                  src={selectedVideo.url}
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-yellow-100">
                  No video selected.
                </div>
              )}

              {activeCaption && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90%] px-4 py-2 rounded-xl bg-[rgba(0,0,0,0.65)] border border-[#FFD700] text-center text-sm text-yellow-50 shadow-lg">
                  {activeCaption.text}
                </div>
              )}
            </div>
            <div className="text-xs text-yellow-200">
              Current time: {currentTime.toFixed(2)}s
            </div>
          </div>

          <div className="rounded-2xl border border-[#FFD700] bg-[#7B0F24] p-3 h-[320px] lg:h-[360px]">
            <CaptionEditor />
          </div>
        </div>

        <div className="rounded-2xl border border-[#FFD700] bg-[#7B0F24] p-3 h-[150px] mb-6">
          <SyncTimeline />
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={saveCaptions}
            disabled={isSaving}
            className="px-4 py-2 rounded-full bg-[#FFD700] text-[#7B0F24] font-bold text-sm hover:brightness-110 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save captions"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!captions.length) {
                alert("No captions to download.");
                return;
              }
              const blob = new Blob(
                [
                  captionsToSimpleText(
                    captions,
                    "Integrity Streaming captions export"
                  ),
                ],
                { type: "text/plain;charset=utf-8" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "captions.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-full bg-[#7B0F24] border border-[#FFD700] text-[#FFD700] font-bold text-sm hover:bg-[#4f0613]"
          >
            Quick export (demo)
          </button>
        </div>
      </div>
    </div>
  );
}

// simple text export; we can make real .vtt/.srt later
function captionsToSimpleText(caps: CapSeg[], title: string): string {
  const lines: string[] = [title, ""];
  caps.forEach((c, i) => {
    lines.push(
      `${i + 1}. [${c.start.toFixed(2)} → ${c.end.toFixed(2)}] ${c.text}`
    );
  });
  return lines.join("\n");
}

export default function CaptionsPage() {
  return (
    <CaptionsProvider>
      <CaptionPageInner />
    </CaptionsProvider>
  );
}
