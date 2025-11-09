"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function TrafficSources({ range }: Props) {
  const data = [
    { name: "Browse features", pct: 48 },
    { name: "Search", pct: 27 },
    { name: "Suggested", pct: 15 },
    { name: "External", pct: 6 },
    { name: "Other", pct: 4 },
  ];
  return (
    <div style={{ color: "#fff" }}>
      <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>Period: {range}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {data.map((r) => (
          <li key={r.name} style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span>{r.name}</span>
              <span style={{ color: "#FFD700", fontWeight: 800 }}>{r.pct}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.12)", borderRadius: 999 }}>
              <div
                style={{
                  width: `${r.pct}%`,
                  height: "100%",
                  background: "#FFD700",
                  borderRadius: 999,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
