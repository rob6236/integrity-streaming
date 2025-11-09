"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function WatchTimeChart({ range }: Props) {
  const hours = {
    "24h": [40, 55, 60, 52, 70, 66, 72, 81, 90, 87, 92, 95],
    "7d":  [620, 680, 710, 760, 800, 820, 850],
    "28d": [2100, 2200, 2400, 2600, 2700, 2850, 3000, 3120],
    "90d": [6200, 6400, 6600, 6900, 7200, 7400, 7800, 8100],
  }[range];
  const max = Math.max(...hours);
  return (
    <div style={{ color: "#fff" }}>
      <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>Period: {range}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
        {hours.map((h, i) => (
          <div key={i} style={{ width: 12, height: (h / max) * 130, background: "#FFD700", borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}
