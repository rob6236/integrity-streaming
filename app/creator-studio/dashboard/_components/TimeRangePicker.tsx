"use client";

import React from "react";

type Range = "24h" | "7d" | "28d" | "90d";

export default function TimeRangePicker({
  value,
  onChange,
}: {
  value: Range;
  onChange: (v: Range) => void;
}) {
  const options: Range[] = ["24h", "7d", "28d", "90d"];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "3px solid #FFD700",
              background: active ? "#ffffff" : "#FFD700",
              color: "#000000",
              fontWeight: 900,
              fontSize: 14,
              lineHeight: "16px",
              cursor: "pointer",
              minWidth: 60,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
