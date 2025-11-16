// app/creator-studio/thumbnail-designer/_components/TextOverlayControls.tsx
"use client";

import React from "react";
import type { ThumbnailVariant } from "../page";

type TextOverlayControlsProps = {
  selectedThumbnail: ThumbnailVariant | null;
};

export default function TextOverlayControls({
  selectedThumbnail,
}: TextOverlayControlsProps) {
  return (
    <section className="h-full">
      <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
        Step 3 · Text &amp; Overlay (Future)
      </h3>
      <p className="text-xs text-white/70 mb-3">
        In the future, this panel will let you add or tweak text overlays,
        positioning, and effects on top of your AI thumbnail (similar to a
        mini-editor just for thumbnails). For now, you can review the AI&apos;s
        concept summary below so you remember what this thumbnail represents.
      </p>

      {selectedThumbnail ? (
        <div className="text-[11px] text-white/80 bg-black/40 border border-white/20 rounded-lg p-3 max-h-40 overflow-auto">
          <p className="font-semibold mb-1">
            Selected thumbnail concept summary:
          </p>
          <p>{selectedThumbnail.promptSummary}</p>
        </div>
      ) : (
        <p className="text-[11px] text-white/60">
          Select a thumbnail from the gallery to see its concept summary here.
        </p>
      )}
    </section>
  );
}
