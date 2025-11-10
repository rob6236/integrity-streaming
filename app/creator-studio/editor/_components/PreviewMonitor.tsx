// app/creator-studio/editor/_components/PreviewMonitor.tsx
"use client";

import React, { useMemo } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

export default function PreviewMonitor() {
  const { previewUrl, selected, timeline, mediaPool } = useTimelineStore();

  // Determine what kind of media to show:
  // 1) If a clip is selected, use that clip's kind.
  // 2) Else, try to find the previewUrl in the media pool and use its kind.
  // 3) Else, fall back to regex on the URL; if unknown, assume video.
  const kind: "image" | "video" | "other" | undefined = useMemo(() => {
    // from selected timeline clip
    if (selected) {
      let i = -1;
      const clip = timeline.find((c) => {
        if (c.lane !== selected.lane) return false;
        i += 1;
        return i === selected.index;
      });
      if (clip?.kind) return clip.kind;
    }

    // from media pool
    if (previewUrl) {
      const m = mediaPool.find((x) => x.url === previewUrl);
      if (m?.kind) return m.kind;

      // fallback by extension
      if (/\.(png|jpe?g|gif|webp|avif)(\?|$)/i.test(previewUrl)) return "image";
      if (/\.(mp4|mov|mkv|webm|m4v|avi)(\?|$)/i.test(previewUrl)) return "video";
    }

    return undefined;
  }, [previewUrl, selected, timeline, mediaPool]);

  return (
    <div style={box}>
      {!previewUrl && (
        <div style={ghost}>
          Drag from Media Pool into Timeline, or click <b>Preview</b>.
        </div>
      )}

      {previewUrl && (kind === "image") && (
        <img src={previewUrl} alt="" style={player} />
      )}

      {previewUrl && (kind === "video" || !kind) && (
        <video
          key={previewUrl}
          src={previewUrl}
          controls
          playsInline
          style={player}
        />
      )}
    </div>
  );
}

const box: React.CSSProperties = {
  padding: 12,
  display: "grid",
  placeItems: "center",
  height: "100%",
};
const ghost: React.CSSProperties = {
  color: "rgba(255,255,255,.75)",
  fontSize: 13,
  textAlign: "center",
};
const player: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  borderRadius: 10,
};
