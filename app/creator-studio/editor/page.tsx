// app/creator-studio/editor/page.tsx
"use client";

import React from "react";
import MediaDrawer from "./_components/MediaDrawer";
import PreviewMonitor from "./_components/PreviewMonitor";
import Inspector from "./_components/Inspector";
import TimelineCanvas from "./_components/TimelineCanvas";

const CARD: React.CSSProperties = {
  background: "rgba(0,0,0,.88)",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 10,
  color: "#fff",
};

const RENDER_BUTTON: React.CSSProperties = {
  background: "#FFD700",
  color: "#000",
  border: "none",
  borderRadius: 999,
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 0 1px rgba(0,0,0,.5)",
  whiteSpace: "nowrap",
};

export default function EditorPage() {
  // Placeholder handler – later you can navigate to your render page
  // and pass whatever data you need.
  const handleSendToRender = () => {
    // TODO: wire this to the render page when it exists
    console.log("Send to Render clicked – hook this up to the render page.");
  };

  return (
    <div
      style={{
        padding: "16px 12px 24px 12px",
        color: "#fff",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 10px 0" }}>
        Editor
      </h1>

      {/* TOP STRIP: 3 equal columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 18,
          alignItems: "start",
          marginBottom: 16,
        }}
      >
        {/* MEDIA POOL */}
        <section style={{ ...CARD, height: 320, overflow: "hidden" }}>
          <div
            style={{
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,.10)",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            MEDIA POOL
          </div>
          <div style={{ height: "calc(100% - 42px)" }}>
            <MediaDrawer />
          </div>
        </section>

        {/* VIEWER */}
        <section style={{ ...CARD, height: 320, overflow: "hidden" }}>
          <div
            style={{
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,.10)",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            VIEWER
          </div>
          <div style={{ padding: 12 }}>
            <PreviewMonitor />
          </div>
        </section>

        {/* INSPECTOR */}
        <section style={{ ...CARD, height: 320, overflow: "hidden" }}>
          <div
            style={{
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,.10)",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            INSPECTOR
          </div>
          <div
            style={{
              height: "calc(100% - 42px)",
              padding: 12,
              overflowY: "auto",
            }}
          >
            <Inspector />
          </div>
        </section>
      </div>

      {/* TIMELINE */}
      <section style={{ ...CARD }}>
        <div
          style={{
            padding: "10px 12px",
            borderBottom: "1px solid rgba(255,255,255,.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: 0.3 }}>
            TIMELINE
          </span>

          {/* Send to Render (stubbed for future render page) */}
          <button style={RENDER_BUTTON} onClick={handleSendToRender}>
            Send to Render
          </button>
        </div>

        <div style={{ height: 520 }}>
          <TimelineCanvas />
        </div>
      </section>
    </div>
  );
}
