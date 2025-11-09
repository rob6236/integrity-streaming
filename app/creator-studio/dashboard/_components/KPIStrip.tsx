"use client";
import React from "react";

const GOLD = "#FFD700";

type Props = { range: "24h" | "7d" | "28d" | "90d" };

const mock = (range: Props["range"]) => {
  switch (range) {
    case "24h":
      return { views: 12940, watch: "1,472h", revenue: "$214", avg: "4:12" };
    case "7d":
      return { views: 92340, watch: "9,120h", revenue: "$1,482", avg: "4:18" };
    case "28d":
      return { views: 382_410, watch: "37,920h", revenue: "$6,375", avg: "4:03" };
    default:
      return { views: 1_112_540, watch: "112,300h", revenue: "$19,820", avg: "4:21" };
  }
};

export default function KPIStrip({ range }: Props) {
  const data = mock(range);
  const Item = ({ label, value }: { label: string; value: string | number }) => (
    <div
      style={{
        flex: 1,
        minWidth: 160,
        background: "rgba(0,0,0,0.18)",
        border: `3px solid ${GOLD}`,
        borderRadius: 18,
        padding: "10px 12px",
      }}
    >
      <div style={{ color: "#fff", fontSize: 12, opacity: 0.9 }}>{label}</div>
      <div style={{ color: GOLD, fontWeight: 900, fontSize: 22 }}>{value}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Item label="Views" value={data.views.toLocaleString()} />
      <Item label="Watch Time" value={data.watch} />
      <Item label="Revenue" value={data.revenue} />
      <Item label="Avg View Duration" value={data.avg} />
    </div>
  );
}
