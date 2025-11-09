"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function TopShorts({ range }: Props) {
  const rows = [
    { title: "Short: speed grade trick", views: 53_406, likes: 5_240, ctr: "8.2%" },
    { title: "Short: perfect cut", views: 44_880, likes: 4_120, ctr: "7.6%" },
    { title: "Short: lens hack", views: 38_710, likes: 3_480, ctr: "7.1%" },
  ];
  return (
    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
      <thead>
        <tr style={{ color: "#FFD700", textAlign: "left", fontWeight: 800 }}>
          <th style={{ padding: "8px 6px" }}>Title</th>
          <th style={{ padding: "8px 6px" }}>Views ({range})</th>
          <th style={{ padding: "8px 6px" }}>Likes</th>
          <th style={{ padding: "8px 6px" }}>CTR</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ color: "#fff", borderTop: "1px solid rgba(255,215,0,0.35)" }}>
            <td style={{ padding: "8px 6px" }}>{r.title}</td>
            <td style={{ padding: "8px 6px", color: "#FFD700", fontWeight: 800 }}>{r.views.toLocaleString()}</td>
            <td style={{ padding: "8px 6px" }}>{r.likes.toLocaleString()}</td>
            <td style={{ padding: "8px 6px" }}>{r.ctr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
