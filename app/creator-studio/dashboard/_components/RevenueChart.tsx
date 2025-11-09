"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function RevenueChart({ range }: Props) {
  const points = {
    "24h": [12, 8, 10, 15, 9, 18, 22, 20, 24, 19, 26, 28],
    "7d":  [140, 180, 160, 220, 210, 190, 382],
    "28d": [210, 220, 260, 240, 280, 310, 330, 360, 390, 420, 410, 435],
    "90d": [410, 420, 460, 480, 520, 540, 580, 620, 640, 700, 720, 760],
  }[range];

  const max = Math.max(...points);
  return (
    <div style={{ color: "#fff" }}>
      <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>Period: {range}</div>
      <div style={{ height: 150, position: "relative" }}>
        <svg width="100%" height="150" viewBox={`0 0 ${points.length * 20} 150`} preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
            points={points
              .map((v, i) => `${i * 20},${150 - (v / max) * 140}`)
              .join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}
