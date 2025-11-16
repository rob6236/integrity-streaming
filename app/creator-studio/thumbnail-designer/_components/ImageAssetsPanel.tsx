"use client";

import React from "react";
import type { ThumbnailVariant } from "../page";

type ImageAssetsPanelProps = {
  thumbnails: ThumbnailVariant[];
  selectedThumbnailId: string | null;
  onSelect: (id: string) => void;
  onDiscard: (id: string) => void;
};

export default function ImageAssetsPanel({
  thumbnails,
  selectedThumbnailId,
  onSelect,
  onDiscard,
}: ImageAssetsPanelProps) {
  // LEFT column: regular video thumbnails (16:9)
  const videoThumbs = thumbnails.filter((t) => t.kind === "video").slice(0, 3);
  // RIGHT column: shorts thumbnails (9:16)
  const shortThumbs = thumbnails.filter((t) => t.kind === "short").slice(0, 3);

  const renderSlot = (
    thumb: ThumbnailVariant | null,
    columnKind: "video" | "short",
    slotKey: string
  ) => {
    const isFilled = !!thumb;
    const isSelected =
      isFilled && thumb!.id === selectedThumbnailId;

    return (
      <div
        key={slotKey}
        className={`border rounded-xl bg-black/40 overflow-hidden flex flex-col ${
          isFilled
            ? isSelected
              ? "border-[#FFD700] shadow-[0_0_0_1px_rgba(255,215,0,0.6)]"
              : "border-white/25"
            : "border-dashed border-white/25"
        }`}
      >
        {/* Fake thumbnail preview area */}
        <div
          className="w-full bg-black flex items-center justify-center"
          style={{
            height: columnKind === "video" ? "110px" : "140px",
          }}
        >
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B0F24] via-black to-[#FFD700]/35 ${
              columnKind === "short" ? "px-2" : "px-4"
            }`}
          >
            <span className="text-[11px] text-[#FFD700] font-semibold text-center leading-snug">
              {isFilled
                ? thumb!.label
                : columnKind === "video"
                ? "Video thumbnail slot (16:9)\nNo thumbnail yet"
                : "Short thumbnail slot (9:16)\nNo thumbnail yet"}
            </span>
          </div>
        </div>

        {/* Bottom details / buttons */}
        <div className="px-3 pb-3 pt-2 flex flex-col gap-2">
          {isFilled ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-white/50">
                  From {thumb!.source === "prompt" ? "Prompt" : "Video"}
                </span>
                <span className="text-[10px] text-white/50">
                  {thumb!.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-[11px] text-white/75 max-h-16 overflow-hidden">
                {thumb!.promptSummary}
              </p>

              <div className="flex items-center justify-between gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => onSelect(thumb!.id)}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${
                    isSelected
                      ? "border-[#FFD700] text-[#FFD700] bg-[#FFD700]/15"
                      : "border-white/40 text-white/80 hover:border-[#FFD700]/80 hover:text-[#FFD700]"
                  }`}
                >
                  {isSelected ? "Selected" : "Use this thumbnail"}
                </button>
                <button
                  type="button"
                  onClick={() => onDiscard(thumb!.id)}
                  className="text-[11px] text-white/50 hover:text-red-400"
                >
                  Discard
                </button>
              </div>
            </>
          ) : (
            <p className="text-[10px] text-white/60">
              Generate thumbnails in Step 1 to fill this slot.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="h-full flex flex-col">
      <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
        Step 2 · Choose a Thumbnail
      </h3>

      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-[#FFD700]">
            Generated Thumbnails
          </h2>
          <p className="text-xs text-white/70">
            Left column: Video (16:9). Right column: Shorts (9:16). Click one
            to preview it above.
          </p>
        </div>
        <div className="text-[10px] text-white/60 text-right">
          <p>
            Video: <span className="font-semibold">1280×720 (16:9)</span>
          </p>
          <p>Shorts: 720×1280 (9:16)</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-2 pb-2">
          {/* Always render a 2×3 grid – UI is stable even before generation */}
          <div className="grid grid-cols-2 gap-4">
            {/* LEFT column – 3 video slots */}
            <div className="space-y-4">
              {[0, 1, 2].map((index) =>
                renderSlot(
                  videoThumbs[index] ?? null,
                  "video",
                  `video-slot-${index}`
                )
              )}
            </div>

            {/* RIGHT column – 3 short slots */}
            <div className="space-y-4">
              {[0, 1, 2].map((index) =>
                renderSlot(
                  shortThumbs[index] ?? null,
                  "short",
                  `short-slot-${index}`
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
