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

/** What the UI shows (button labels) */
type DisplayRange = "24h" | "7d" | "30d" | "60d" | "90d";

/** What the data objects inside the charts actually have */
type DataRange = "24h" | "7d" | "28d" | "90d";

/** Map UI ranges to existing data keys so nothing is undefined */
function toDataRange(range: DisplayRange): DataRange {
  switch (range) {
    case "30d":
      return "28d"; // use 28-day data for the “30d” button
    case "60d":
      return "90d"; // use 90-day data for the “60d” button
    default:
      return range; // "24h", "7d", "90d"
  }
}

export default function DashboardPage() {
  // Range for the buttons / UI
  const [displayRange, setDisplayRange] = useState<DisplayRange>("7d");
  // Range actually passed into data-driven components
  const effectiveRange: DataRange = toDataRange(displayRange);

  return (
    <div className="dashboard-root" style={{ padding: "12px 16px 28px 16px" }}>
      <div className="dashboard-inner">
        {/* TITLE ROW */}
        <div
          className="title-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <h1
            className="dashboard-title"
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 32,
              lineHeight: "36px",
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <div className="time-range-wrap" style={{ marginLeft: "auto" }}>
            {/* Buttons use full UI set */}
            <TimeRangePicker
              value={displayRange}
              onChange={setDisplayRange}
            />
          </div>
        </div>

        {/* KPI STRIP AS ITS OWN BLOCK */}
        <div className="kpi-shell">
          <div className="card-inner">
            {/* Data uses mapped effective range */}
            <KPIStrip range={effectiveRange} />
          </div>
        </div>

        {/* GRID / STACK OF CARDS */}
        <div className="grid-wrapper">
          {/* Realtime */}
          <div className="card-shell span-4 realtime-shell">
            <div className="card-inner">
              <StudioCard span={4} minHeight={180} title="Realtime">
                {/* wrapper so we can scale realtime content on tablet & mobile */}
                <div className="realtime-content">
                  <RealtimeNow />
                </div>
              </StudioCard>
            </div>
          </div>

          <div className="card-shell span-8">
            <div className="card-inner">
              <StudioCard span={8} minHeight={180} title="Views">
                <ViewsChart range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          <div className="card-shell span-4">
            <div className="card-inner">
              <StudioCard span={4} minHeight={280} title="Traffic Sources">
                <TrafficSources range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          <div className="card-shell span-4">
            <div className="card-inner">
              <StudioCard span={4} minHeight={280} title="Watch Time">
                <WatchTimeChart range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          <div className="card-shell span-4">
            <div className="card-inner">
              <StudioCard span={4} minHeight={280} title="Revenue">
                <RevenueChart range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          {/* Best Performing Videos */}
          <div className="card-shell span-7 videos-shell">
            <div className="card-inner">
              <StudioCard span={7} minHeight={300} title="Best Performing Videos">
                <TopVideos range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          {/* Best Performing Shorts */}
          <div className="card-shell span-5 shorts-shell">
            <div className="card-inner">
              <StudioCard span={5} minHeight={300} title="Best Performing Shorts">
                <TopShorts range={effectiveRange} />
              </StudioCard>
            </div>
          </div>

          <div className="card-shell span-12">
            <div className="card-inner">
              <StudioCard span={12} minHeight={180} title="Notifications">
                <NotificationsPanel />
              </StudioCard>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-root {
          width: 100%;
        }

        .dashboard-inner {
          width: 100%;
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 12px;
        }

        .card-shell {
          width: 100%;
        }

        .span-4 {
          grid-column: span 4;
        }
        .span-5 {
          grid-column: span 5;
        }
        .span-7 {
          grid-column: span 7;
        }
        .span-8 {
          grid-column: span 8;
        }
        .span-12 {
          grid-column: span 12;
        }

        .kpi-shell {
          width: 100%;
          margin-bottom: 16px;
        }

        /* ========== TABLET ONLY (no mobile, no desktop) ========== */
        @media (max-width: 1100px) and (min-width: 721px) {
          .grid-wrapper {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }

          /* shrink font ONLY in Best Performing Shorts box (tablet) */
          .shorts-shell .card-inner {
            font-size: 0.85rem;
          }

          .shorts-shell .card-inner * {
            font-size: 0.85rem;
          }

          /* 🔹 TABLET REALTIME ONLY: shrink inner content so bars stay inside box */
          .realtime-shell .realtime-content {
            transform: scale(0.9);
            transform-origin: left center;
            overflow: hidden;
          }

          .realtime-shell .realtime-content * {
            max-width: 100%;
          }
        }

        /* ========== MOBILE ONLY (body only) ========== */
        @media (max-width: 720px) {
          :global(html),
          :global(body) {
            overflow-x: hidden;
          }

          .dashboard-root {
            padding: 8px 0 18px 0;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          .dashboard-inner {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 0 8px 20px 8px;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          .title-row {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 4px;
            margin-bottom: 10px;
          }

          .dashboard-title {
            font-size: 14px;
            line-height: 16px;
          }

          .time-range-wrap {
            margin-left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 4px;
            transform: scale(0.7);
            transform-origin: center;
          }

          .grid-wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-bottom: 16px;
            font-size: 0.7rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          .card-shell {
            width: 100%;
            max-width: 100%;
            margin: 4px 0;
            box-sizing: border-box;
            overflow: hidden;
          }

          .card-inner {
            width: 100%;
            max-width: 260px;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 6px 8px;
            transform: scale(0.85);
            transform-origin: top center;
            font-size: 0.65rem;
          }

          .kpi-shell .card-inner {
            max-width: 260px;
            font-size: 0.65rem;
          }

          .card-inner * {
            max-width: 100%;
            font-size: 0.65rem;
          }

          .videos-shell .card-inner {
            font-size: 0.6rem;
          }

          /* 🔹 MOBILE REALTIME ONLY */
          .realtime-shell .card-inner {
            max-width: 230px;
            margin: 0 auto;
            padding: 6px 10px;
            transform: none;
            font-size: 0.6rem;
            overflow: hidden;
          }

          .realtime-shell .realtime-content {
            width: 100%;
            transform: scale(0.85);
            transform-origin: left center;
            overflow: hidden;
          }

          .realtime-shell .realtime-content * {
            max-width: 100%;
            font-size: 0.6rem;
          }

          .videos-shell table {
            width: 100%;
            table-layout: fixed;
          }

          .videos-shell th,
          .videos-shell td {
            word-wrap: break-word;
            white-space: normal;
          }

          h2.cardTitle {
            font-size: 10px;
          }
        }

        /* Default card title (desktop) */
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
