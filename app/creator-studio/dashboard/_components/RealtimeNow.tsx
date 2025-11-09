"use client";

import React, { useEffect, useState } from "react";

const GOLD = "#FFD700";

/** Default export so `<RealtimeNow />` works */
export default function RealtimeNow() {
  // Mock realtime viewers that wiggle a bit
  const [now, setNow] = useState<number>(360);

  useEffect(() => {
    const id = setInterval(() => {
      setNow((n) => {
        const delta = Math.round((Math.random() - 0.5) * 14); // -7..+7
        const next = n + delta;
        return Math.max(120, Math.min(1200, next));
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
      <div>
        <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 4 }}>Viewers right now</div>
        <div style={{ color: GOLD, fontWeight: 900, fontSize: 28, lineHeight: "28px" }}>
          {now.toLocaleString()}
        </div>
      </div>

      {/* tiny equalizer bars just for motion */}
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 56 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 12 + ((i * 7) % 36); // varied heights
          return <div key={i} style={{ width: 6, height: h, background: GOLD, borderRadius: 3 }} />;
        })}
      </div>
    </div>
  );
}
