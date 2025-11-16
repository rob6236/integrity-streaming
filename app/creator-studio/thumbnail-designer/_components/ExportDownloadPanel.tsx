// app/creator-studio/thumbnail-designer/_components/ExportDownloadPanel.tsx
"use client";

import React from "react";
import type { ThumbnailVariant } from "../page";

type ExportDownloadPanelProps = {
  selectedThumbnail: ThumbnailVariant | null;
  onMarkReady: () => void;
  statusMessage: string | null;
};

export default function ExportDownloadPanel({
  selectedThumbnail,
  onMarkReady,
  statusMessage,
}: ExportDownloadPanelProps) {
  return (
    <section className="h-full">
      <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
        Step 4 · Save for Channel Upload
      </h3>

      <p className="text-xs text-white/70 mb-3">
        When you&apos;re happy with a thumbnail, mark it as ready. In a future
        step, this will save it under your account so that when you upload a
        final rendered video to your channel, you can choose from your AI
        thumbnails instead of uploading from scratch.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          onClick={onMarkReady}
          className="inline-flex items-center justify-center rounded-full border border-[#FFD700] bg-[#FFD700] px-4 py-2 text-[11px] md:text-xs font-semibold text-[#7B0F24] hover:bg-[#FFD700]/90 whitespace-normal text-center"
        >
          {selectedThumbnail
            ? "Mark selected thumbnail as ready for channel upload"
            : "Select a thumbnail to mark it as ready"}
        </button>
      </div>

      {statusMessage && (
        <p className="text-[11px] text-[#FFD700] bg-black/40 border border-[#FFD700]/50 rounded-lg px-3 py-2">
          {statusMessage}
        </p>
      )}
    </section>
  );
}
