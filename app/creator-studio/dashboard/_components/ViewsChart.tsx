"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function ViewsChart({ range }: Props) {
  // Simple spark bars (text-based) to keep things lightweight for now
  const bars = {
    "24h": [3,5,7,6,8,5,9,8,6,7,5,9,10,8,7,9,6,5,7,8,6,9,7,10],
    "7d":  [4,6,8,9,10,9,8,7,6,8,10,9,7,8],
    "28d": [5,7,8,9,6,7,8,10,9,8,7,6,8,9,10,9,8,7,8,9,7,8,9,10],
    "90d": [6,7,8,8,9,10,9,8,8,7,9,10,9,8,8,7,6,7,8,9,9,10,8,7],
  }[range];

  return (
    <div style={{ color: "#fff" }}>
      <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>Period: {range}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 130 }}>
        {bars.map((n, i) => (
          <div key={i} style={{ width: 10, height: n * 10, background: "#FFD700", borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}
