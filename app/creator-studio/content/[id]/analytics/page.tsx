// app/creator-studio/content/[id]/analytics/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function VideoAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params?.id as string;

  const handleBackToDetails = () => {
    router.push(`/creator-studio/content/${videoId}/details`);
  };

  const handleOpenWatch = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BURGUNDY,
        color: IVORY,
        padding: 24,
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        .analytics-shell {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .analytics-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .analytics-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .analytics-top-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .analytics-top-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .analytics-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .analytics-title-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .analytics-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .analytics-subtitle {
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .analytics-badge-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .analytics-badge {
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .analytics-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .analytics-metric-card {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .analytics-metric-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          opacity: 0.9;
        }

        .analytics-metric-value {
          font-size: 20px;
          font-weight: 700;
        }

        .analytics-metric-context {
          font-size: 11px;
          font-weight: 700;
          opacity: 0.85;
        }

        .analytics-main-grid {
          display: grid;
          grid-template-columns: 1.8fr 1.2fr;
          gap: 16px;
        }

        .analytics-card {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 18px;
          padding: 16px;
          boxShadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .analytics-card-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          opacity: 0.95;
        }

        .analytics-chart-placeholder {
          border-radius: 12px;
          border: 1px dashed ${GOLD};
          padding: 16px;
          min-height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .analytics-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
        }

        .analytics-list-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .analytics-list-label {
          opacity: 0.9;
        }

        .analytics-list-value {
          opacity: 0.95;
        }

        .analytics-footer-note {
          font-size: 11px;
          font-weight: 700;
          opacity: 0.85;
        }

        @media (max-width: 960px) {
          .analytics-metrics-grid {
            grid-template-columns: 1fr;
          }

          .analytics-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .analytics-shell {
            gap: 20px;
          }
          .analytics-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="analytics-shell">
        {/* Top bar / breadcrumbs */}
        <div className="analytics-top-bar">
          <div className="analytics-top-left">
            <button
              className="analytics-top-btn"
              onClick={handleBackToDetails}
            >
              ← Back to Video details
            </button>
            <span>Video performance • ID: {videoId || "unknown"}</span>
          </div>
          <button
            className="analytics-top-btn analytics-top-btn-primary"
            onClick={handleOpenWatch}
          >
            Open watch page
          </button>
        </div>

        {/* Header */}
        <div className="analytics-header-row">
          <div className="analytics-title-block">
            <div className="analytics-title">Video performance</div>
            <div className="analytics-subtitle">
              UI-only analytics view for this video (last 28 days, mock data).
            </div>
          </div>
          <div className="analytics-badge-row">
            <div className="analytics-badge">UI ONLY</div>
            <div className="analytics-badge">MOCK METRICS</div>
          </div>
        </div>

        {/* Top metrics */}
        <div className="analytics-metrics-grid">
          <div className="analytics-metric-card">
            <div className="analytics-metric-label">Views</div>
            <div className="analytics-metric-value">12,340</div>
            <div className="analytics-metric-context">
              +18% vs previous 28 days (mock)
            </div>
          </div>
          <div className="analytics-metric-card">
            <div className="analytics-metric-label">Watch time (hours)</div>
            <div className="analytics-metric-value">642.5</div>
            <div className="analytics-metric-context">
              +9% vs previous 28 days (mock)
            </div>
          </div>
          <div className="analytics-metric-card">
            <div className="analytics-metric-label">Avg view duration</div>
            <div className="analytics-metric-value">3:08</div>
            <div className="analytics-metric-context">
              24.5% of video watched on average (mock)
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="analytics-main-grid">
          {/* Left: views chart + CTR */}
          <div className="analytics-card">
            <div className="analytics-card-title">Views over time (mock)</div>
            <div className="analytics-chart-placeholder">
              Line chart placeholder for daily views over the last 28 days.
              <br />
              In the real platform this will be a real chart component.
            </div>
            <div className="analytics-list">
              <div className="analytics-list-row">
                <span className="analytics-list-label">Impressions (mock)</span>
                <span className="analytics-list-value">120,000</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Click-through rate (CTR, mock)
                </span>
                <span className="analytics-list-value">6.4%</span>
              </div>
            </div>
          </div>

          {/* Right: traffic sources */}
          <div className="analytics-card">
            <div className="analytics-card-title">Traffic sources (mock)</div>
            <div className="analytics-list">
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Browse / home feed
                </span>
                <span className="analytics-list-value">48%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Suggested / related videos
                </span>
                <span className="analytics-list-value">27%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">Search</span>
                <span className="analytics-list-value">15%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">External links</span>
                <span className="analytics-list-value">7%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">Other</span>
                <span className="analytics-list-value">3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="analytics-main-grid">
          <div className="analytics-card">
            <div className="analytics-card-title">Devices (mock)</div>
            <div className="analytics-list">
              <div className="analytics-list-row">
                <span className="analytics-list-label">Mobile</span>
                <span className="analytics-list-value">62%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">Desktop</span>
                <span className="analytics-list-value">28%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">Tablet</span>
                <span className="analytics-list-value">7%</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">TV / other</span>
                <span className="analytics-list-value">3%</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-card-title">Audience (mock)</div>
            <div className="analytics-list">
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Returning viewers
                </span>
                <span className="analytics-list-value">5,320</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">New viewers</span>
                <span className="analytics-list-value">7,020</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Subscribers gained (mock)
                </span>
                <span className="analytics-list-value">+132</span>
              </div>
              <div className="analytics-list-row">
                <span className="analytics-list-label">
                  Subscribers lost (mock)
                </span>
                <span className="analytics-list-value">-18</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-footer-note">
          All values on this page are mock placeholders. In the real Integrity
          Streaming platform, this view will connect to your analytics backend.
        </div>
      </div>
    </div>
  );
}
