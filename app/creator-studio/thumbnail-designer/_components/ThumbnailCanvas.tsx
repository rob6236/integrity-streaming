// app/creator-studio/thumbnail-designer/_components/ThumbnailCanvas.tsx
"use client";

import React, { useState } from "react";
import type { ThumbnailVariant } from "../page";

type ThumbnailCanvasProps = {
  selectedThumbnail: ThumbnailVariant | null;
};

type AspectMode = "video" | "short";

export default function ThumbnailCanvas({
  selectedThumbnail,
}: ThumbnailCanvasProps) {
  const [aspectMode, setAspectMode] = useState<AspectMode>("video");
  const isShort = aspectMode === "short";

  return (
    <section>
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <h2 className="text-lg md:text-xl font-semibold text-[#FFD700]">
          Live Thumbnail Viewer
        </h2>

        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="text-white/70 mr-1">Aspect:</span>
          <button
            type="button"
            onClick={() => setAspectMode("video")}
            className={`px-3 py-1 rounded-full border text-[11px] font-semibold ${
              aspectMode === "video"
                ? "border-[#FFD700] bg-[#FFD700]/15 text-[#FFD700]"
                : "border-white/40 text-white/80 hover:border-[#FFD700]/60 hover:text-[#FFD700]"
            }`}
          >
            Video · 16:9
          </button>
          <button
            type="button"
            onClick={() => setAspectMode("short")}
            className={`px-3 py-1 rounded-full border text-[11px] font-semibold ${
              aspectMode === "short"
                ? "border-[#FFD700] bg-[#FFD700]/15 text-[#FFD700]"
                : "border-white/40 text-white/80 hover:border-[#FFD700]/60 hover:text-[#FFD700]"
            }`}
          >
            Short · 9:16
          </button>
        </div>
      </div>

      <p className="text-xs text-white/70 mb-2">
        This viewer updates automatically as you generate and choose thumbnails
        in the grid below. Use the buttons on the right to switch between
        regular video (16:9) and Shorts (9:16) layouts.
      </p>

      {/* Outer viewer box */}
      <div
        className="border border-[#FFD700] rounded-2xl bg-black/70 flex items-center justify-center"
        style={{ padding: "16px", minHeight: "260px" }}
      >
        {/* Inner frame that changes shape with aspect */}
        <div
          className="relative bg-black flex items-center justify-center border border-[#FFD700]/80 rounded-xl overflow-hidden"
          style={
            isShort
              ? { width: "220px", height: "360px" } // tall & narrow for Shorts
              : { width: "480px", height: "270px" } // standard 16:9
          }
        >
          {selectedThumbnail ? (
            <>
              <img
                src={selectedThumbnail.imageUrl}
                alt="Selected thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1">
                <p className="text-[10px] text-[#FFD700] font-semibold truncate">
                  {selectedThumbnail.source === "prompt"
                    ? "From Prompt"
                    : "From Video"}
                  {" · "}
                  {selectedThumbnail.kind === "video"
                    ? "Video 16:9"
                    : "Short 9:16"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-xs text-white/70 px-3 text-center">
              No thumbnail selected yet. Use the AI boxes in the grid below to
              create and choose a thumbnail. It will appear here in the viewer.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
