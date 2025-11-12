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

export default function EditorPage() {
  return (
    <div style={{ padding: "16px 0 24px 0", color: "#fff" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 10px 0" }}>Editor</h1>

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
          <div style={{ height: "calc(100% - 42px)", padding: 12, overflowY: "auto" }}>
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
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: 0.3 }}>TIMELINE</span>
          {/* (No buttons rendered here) */}
        </div>

        <div style={{ height: 520 }}>
          <TimelineCanvas />
        </div>
      </section>
    </div>
  );
}
