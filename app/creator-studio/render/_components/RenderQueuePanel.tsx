// app/creator-studio/render/_components/RenderQueuePanel.tsx
"use client";

const PANEL_BG = "rgba(0,0,0,0.88)";
const BORDER = "1px solid rgba(255,255,255,0.16)";
const TEXT_IVORY = "#FFF9F0";
const GOLD = "#FFD700";

export default function RenderQueuePanel() {
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
        gap: 8,
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
        RENDER QUEUE
      </h2>

      {/* Fake first job row */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.24)",
          padding: 8,
          fontSize: "0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontWeight: 700 }}>Job 1</span>
          <span style={{ fontSize: "0.75rem", color: "#7CFC86" }}>
            Ready (mock)
          </span>
        </div>
        <div style={{ opacity: 0.85 }}>
          Current Timeline | Integrity Streaming
        </div>

        {/* Fake progress bar */}
        <div
          style={{
            marginTop: 4,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "0%",
              height: "100%",
              background: GOLD,
            }}
          />
        </div>
      </div>

      {/* Hint text */}
      <p
        style={{
          marginTop: 4,
          fontSize: "0.75rem",
          opacity: 0.8,
        }}
      >
        When you start a render, jobs will appear here and move to your Content
        Library when finished.
      </p>
    </section>
  );
}
