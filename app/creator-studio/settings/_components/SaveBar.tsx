// app/creator-studio/settings/_components/SaveBar.tsx
"use client";

import React from "react";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type SaveBarProps = {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function SaveBar({ hasChanges, onSave, onCancel }: SaveBarProps) {
  if (!hasChanges) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "10px 28px",
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.9), rgba(123,15,36,0.95))",
        borderTop: `2px solid ${GOLD}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 40,
      }}
    >
      <span
        style={{
          color: "white",
          fontWeight: 700,
          letterSpacing: 0.8,
          fontSize: 13,
        }}
      >
        You have unsaved changes in Settings.
      </span>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            border: `2px solid ${GOLD}`,
            backgroundColor: "transparent",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: 0.6,
          }}
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          style={{
            padding: "8px 22px",
            borderRadius: 999,
            border: `2px solid ${GOLD}`,
            backgroundColor: GOLD,
            color: BURGUNDY,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: 0.7,
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
