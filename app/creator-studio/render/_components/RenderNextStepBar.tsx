// app/creator-studio/render/_components/RenderNextStepBar.tsx
"use client";

const GOLD = "#FFD700";
const TEXT_IVORY = "#FFF9F0";

export default function RenderNextStepBar() {
  const handleClick = () => {
    // Later: start render job, then navigate to Content Library
    console.log("Render & Send To Library clicked – wire this up later.");
  };

  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 12,
        borderTop: "1px solid rgba(255,255,255,0.18)",
        display: "flex",
        flexDirection: "column",      // stack text + button vertically
        alignItems: "center",         // CENTER everything horizontally
        gap: 12,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.85rem",
          color: TEXT_IVORY,
          opacity: 0.9,
          textAlign: "center",        // center the helper text too
          maxWidth: 600,
        }}
      >
        When you’re happy with your settings, render this project and send the
        finished video straight to your Content Library.
      </p>

      <button
        onClick={handleClick}
        style={{
          background: GOLD,
          color: "#000",
          border: "none",
          borderRadius: 999,
          padding: "10px 22px",
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.6)",
        }}
      >
        Render &amp; Send To Library
      </button>
    </div>
  );
}
