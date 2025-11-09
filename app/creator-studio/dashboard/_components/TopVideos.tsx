"use client";
import React from "react";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

export default function TopVideos({ range }: Props) {
  const rows = [
    { title: "How to light interviews", views: 128_940, watch: "472h", revenue: "$214" },
    { title: "Studio tour 2025", views: 93_120, watch: "381h", revenue: "$189" },
    { title: "Color grading basics", views: 82_550, watch: "344h", revenue: "$176" },
    { title: "Top 10 B-roll tricks", views: 77_203, watch: "302h", revenue: "$161" },
  ];
  return (
    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
      <thead>
        <tr style={{ color: "#FFD700", textAlign: "left", fontWeight: 800 }}>
          <th style={{ padding: "8px 6px" }}>Title</th>
          <th style={{ padding: "8px 6px" }}>Views ({range})</th>
          <th style={{ padding: "8px 6px" }}>Watch Time</th>
          <th style={{ padding: "8px 6px" }}>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ color: "#fff", borderTop: "1px solid rgba(255,215,0,0.35)" }}>
            <td style={{ padding: "8px 6px" }}>{r.title}</td>
            <td style={{ padding: "8px 6px", color: "#FFD700", fontWeight: 800 }}>{r.views.toLocaleString()}</td>
            <td style={{ padding: "8px 6px" }}>{r.watch}</td>
            <td style={{ padding: "8px 6px" }}>{r.revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
