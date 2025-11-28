// app/creator-studio/render/_components/RenderPreviewPanel.tsx
"use client";

import React, { useState } from "react";

const PANEL_BG = "rgba(0,0,0,0.88)";
const BORDER = "1px solid rgba(255,255,255,0.16)";
const TEXT_IVORY = "#FFF9F0";
const GOLD = "#FFD700";

export default function RenderPreviewPanel() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    // UI-only toggle for now
    setIsPlaying((prev) => !prev);
  };

  return (
    <section
      style={{
        background: PANEL_BG,
        border: BORDER,
        borderRadius: 10,
        padding: 12,
        minHeight: 260,
        color: TEXT_IVORY,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h2
        style={{
          fontSize: 14,
          fontWeight: 800,
          margin: "0 0 8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          paddingBottom: 6,
          letterSpacing: 0.4,
          textAlign: "center", // centered title
        }}
      >
        PREVIEW
      </h2>

      {/* Preview frame */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.25)",
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.06), rgba(0,0,0,0.9))",
          aspectRatio: "16 / 9",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            opacity: 0.9,
          }}
        >
          Timeline preview (UI only)
        </span>

        {/* Simple center play icon (visual only) */}
        <button
          type="button"
          onClick={handleTogglePlay}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.6)",
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginLeft: isPlaying ? 0 : 3,
              width: isPlaying ? 14 : 0,
              height: 0,
              borderStyle: isPlaying ? "none" : "solid",
              borderWidth: isPlaying ? 0 : "8px 0 8px 14px",
              borderColor: isPlaying
                ? "transparent"
                : "transparent transparent transparent " + GOLD,
            }}
          />
          {isPlaying && (
            <span
              style={{
                position: "absolute",
                width: 16,
                height: 16,
                display: "flex",
                gap: 3,
              }}
            >
              <span
                style={{
                  flex: 1,
                  backgroundColor: GOLD,
                }}
              />
              <span
                style={{
                  flex: 1,
                  backgroundColor: GOLD,
                }}
              />
            </span>
          )}
        </button>

        {/* Aspect hint badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "2px 8px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
            opacity: 0.9,
          }}
        >
          Aspect: 16:9 (mock)
        </div>
      </div>

      {/* Fake transport controls + progress */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: isPlaying ? "40%" : "15%",
              height: "100%",
              background: GOLD,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Timeline info row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.8rem",
            opacity: 0.9,
          }}
        >
          <span>00:00 / 10:00 (mock)</span>
          <span>Current project timeline</span>
        </div>
      </div>
    </section>
  );
}
