"use client";
import React from "react";

export default function NotificationsPanel() {
  const items = [
    { t: "2h ago", msg: "New comment: “This thumbnail pops!”" },
    { t: "6h ago", msg: "New subscriber joined your channel." },
    { t: "1d ago", msg: "Payout ready for review." },
    { t: "2d ago", msg: "Video 'Grading 101' reached 100K views." },
  ];
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
      {items.map((i, idx) => (
        <li
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#fff",
            padding: "8px 10px",
            background: "rgba(0,0,0,0.12)",
            borderRadius: 12,
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        >
          <span style={{ opacity: 0.8, fontSize: 12, minWidth: 70 }}>{i.t}</span>
          <span>{i.msg}</span>
        </li>
      ))}
    </ul>
  );
}
