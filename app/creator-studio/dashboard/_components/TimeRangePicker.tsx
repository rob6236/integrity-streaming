"use client";

import React from "react";

type RangeKey = "24h" | "7d" | "30d" | "60d" | "90d";

interface TimeRangePickerProps {
  value: RangeKey;
  onChange: (val: RangeKey) => void;
}

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

const options: { key: RangeKey; label: string }[] = [
  { key: "24h", label: "24h" },
  { key: "7d",  label: "7d" },
  { key: "30d", label: "30d" },
  { key: "60d", label: "60d" },
  { key: "90d", label: "90d" },
];

export default function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
  return (
    <div className="range-wrap">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            className={`range-btn ${active ? "active" : ""}`}
            onClick={() => onChange(opt.key)}
          >
            {opt.label}
          </button>
        );
      })}

      <style jsx>{`
        .range-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .range-btn {
          border: 3px solid ${GOLD};
          border-radius: 999px;
          background: ${GOLD};
          color: ${BURGUNDY};
          font-weight: 800;
          padding: 6px 16px;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          white-space: nowrap;
        }

        .range-btn.active {
          background: #ffffff;
          color: ${BURGUNDY};
        }

        .range-btn:focus {
          outline: none;
        }

        /* Tablet: slightly smaller so all 5 fit nicely */
        @media (max-width: 1100px) and (min-width: 721px) {
          .range-wrap {
            gap: 6px;
          }
          .range-btn {
            padding: 5px 12px;
            font-size: 13px;
          }
        }

        /* Mobile: shrink + allow wrapping so they stay in view */
        @media (max-width: 720px) {
          .range-wrap {
            gap: 4px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .range-btn {
            padding: 4px 10px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
