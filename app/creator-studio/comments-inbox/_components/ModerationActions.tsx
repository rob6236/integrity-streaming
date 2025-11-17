"use client";

import React from "react";

const GOLD = "#FFD700";

type ModerationActionsProps = {
  onAction?: (actionId: string) => void;
};

const ACTIONS = [
  { id: "heart", label: "Heart / Like" },
  { id: "pin", label: "Pin to top" },
  { id: "hide", label: "Hide comment" },
  { id: "delete", label: "Delete comment" },
  { id: "block", label: "Block user" },
  { id: "report", label: "Report spam" },
];

export default function ModerationActions({
  onAction,
}: ModerationActionsProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${GOLD}`,
        backgroundColor: "rgba(0,0,0,.4)",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: GOLD,
        }}
      >
        Moderation tools
      </div>

      <p
        style={{
          fontSize: 12,
          color: "#ffe8a1",
          margin: 0,
        }}
      >
        Keep your comments healthy and on-topic with quick actions.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 6,
        }}
      >
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onAction?.(a.id)}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: "rgba(0,0,0,.75)",
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 5px rgba(0,0,0,.8)",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
