"use client";

import React, { useState } from "react";
import RealtimeNow from "./_components/RealtimeNow";
import TimeRangePicker from "./_components/TimeRangePicker";
import ViewsChart from "./_components/ViewsChart";
import TrafficSources from "./_components/TrafficSources";
import RevenueChart from "./_components/RevenueChart";
import WatchTimeChart from "./_components/WatchTimeChart";
import TopVideos from "./_components/TopVideos";
import TopShorts from "./_components/TopShorts";
import NotificationsPanel from "./_components/NotificationsPanel";
import KPIStrip from "./_components/KPIStrip";
import StudioCard from "./_components/StudioCard";

const GOLD = "#FFD700";

export default function DashboardPage() {
  // Single source of truth for period (prop-drilled to charts/tables)
  const [range, setRange] = useState<"24h" | "7d" | "28d" | "90d">("7d");

  return (
    <div style={{ padding: "12px 16px 28px 16px" }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 32, lineHeight: "36px", margin: 0 }}>
          Dashboard
        </h1>
        <div style={{ marginLeft: "auto" }}>
          <TimeRangePicker value={range} onChange={setRange} />
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ marginBottom: 16 }}>
        <KPIStrip range={range} />
      </div>

      {/* Responsive grid */}
      <div className="grid-wrapper">
        {/* Realtime & Views */}
        <StudioCard span={4} minHeight={180} title="Realtime">
          <RealtimeNow />
        </StudioCard>
        <StudioCard span={8} minHeight={180} title="Views">
          <ViewsChart range={range} />
        </StudioCard>

        {/* Traffic sources & Watch time */}
        <StudioCard span={4} minHeight={280} title="Traffic Sources">
          <TrafficSources range={range} />
        </StudioCard>
        <StudioCard span={4} minHeight={280} title="Watch Time">
          <WatchTimeChart range={range} />
        </StudioCard>
        <StudioCard span={4} minHeight={280} title="Revenue">
          <RevenueChart range={range} />
        </StudioCard>

        {/* Top content */}
        <StudioCard span={7} minHeight={300} title="Best Performing Videos">
          <TopVideos range={range} />
        </StudioCard>
        <StudioCard span={5} minHeight={300} title="Best Performing Shorts">
          <TopShorts range={range} />
        </StudioCard>

        {/* Notifications */}
        <StudioCard span={12} minHeight={180} title="Notifications">
          <NotificationsPanel />
        </StudioCard>
      </div>

      {/* Local styles for the grid */}
      <style jsx>{`
        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 12px;
        }

        /* Tablet */
        @media (max-width: 1100px) {
          .grid-wrapper {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }
        }

        /* Mobile */
        @media (max-width: 720px) {
          .grid-wrapper {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        h2.cardTitle {
          margin: 0;
          color: ${GOLD};
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
      `}</style>
    </div>
  );
}
