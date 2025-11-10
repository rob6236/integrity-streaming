// app/creator-studio/editor/_components/Viewer.tsx
"use client";

import React from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

export default function Viewer() {
  const { previewUrl } = useTimelineStore();
  return (
    <div
      style={{
        background: "#0b0b0b",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 12,
        height: 240,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      {previewUrl ? (
        previewUrl.match(/\.(png|jpg|jpeg|gif|webp)$/i) ? (
          <img
            src={previewUrl}
            alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <video
            src={previewUrl}
            controls
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )
      ) : (
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>
          Drag from Media Pool into Timeline, or click <b>Preview</b>.
        </div>
      )}
    </div>
  );
}
