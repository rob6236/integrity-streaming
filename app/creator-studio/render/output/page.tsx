// app/creator-studio/render/output/page.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function RenderOutputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Optional query param: ?state=ready
  const state = (searchParams.get("state") ?? "empty").toLowerCase();
  const hasOutput = state === "ready";

  return (
    <div className="ro-root">
      <style jsx>{`
        .ro-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .ro-shell {
          width: 100%;
          max-width: 1180px;
        }

        .ro-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .ro-title-block {
          min-width: 220px;
        }

        .ro-title {
          font-size: 28px;
          font-weight: 800;
          color: ${GOLD};
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
          margin-bottom: 2px;
        }

        .ro-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }

        .ro-header-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .ro-chip-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          background: transparent;
          color: ${IVORY};
        }

        .ro-chip-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.8);
        }

        .ro-chip-btn:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        .ro-chip-btn.primary:hover {
          background: #ffe676;
        }

        .ro-layout {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: 16px;
        }

        .ro-panel {
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 18px;
          border: 2px solid ${GOLD};
          padding: 16px 16px 14px;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.85);
        }

        .ro-panel-title {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .ro-panel-sub {
          font-size: 12px;
          opacity: 0.85;
          margin-bottom: 14px;
        }

        .ro-player-frame {
          border-radius: 14px;
          border: 3px solid ${GOLD};
          background: rgba(0, 0, 0, 0.55);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .ro-player-inner {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: radial-gradient(circle at top, #272727, #020202);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .ro-play {
          width: 0;
          height: 0;
          border-left: 28px solid #fff;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.3))
            drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
        }

        .ro-player-banner {
          padding: 8px 12px;
          font-size: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .ro-player-label {
          font-weight: 700;
          font-size: 12px;
        }

        .ro-player-pill {
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 11px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(0, 0, 0, 0.7);
        }

        .ro-empty-state {
          border-radius: 14px;
          border: 2px dashed rgba(255, 255, 255, 0.4);
          padding: 20px 16px 18px;
          font-size: 13px;
          text-align: center;
          background: rgba(0, 0, 0, 0.4);
        }

        .ro-empty-title {
          font-weight: 700;
          margin-bottom: 4px;
        }

        .ro-empty-note {
          font-size: 12px;
          opacity: 0.85;
        }

        .ro-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }

        .ro-meta-item {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 8px 10px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.45);
        }

        .ro-meta-label {
          font-size: 11px;
          opacity: 0.8;
          margin-bottom: 2px;
        }

        .ro-meta-value {
          font-size: 12px;
          font-weight: 600;
        }

        .ro-actions-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ro-small-btn {
          border-radius: 999px;
          border: 1px solid ${GOLD};
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          background: transparent;
          color: ${IVORY};
          white-space: normal;
          line-height: 1.25;
        }

        .ro-small-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
        }

        .ro-small-btn:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        .ro-small-btn.primary:hover {
          background: #ffe676;
        }

        .ro-footnote {
          font-size: 11px;
          opacity: 0.8;
          margin-top: 8px;
        }

        .ro-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }

        .ro-pill {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 5px 10px;
          font-size: 11px;
          background: rgba(0, 0, 0, 0.45);
        }

        @media (max-width: 960px) {
          .ro-layout {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 900px) {
          .ro-root {
            padding: 16px;
          }

          .ro-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .ro-header-buttons {
            width: 100%;
          }

          .ro-chip-btn,
          .ro-chip-btn.primary {
            flex: 1 1 150px;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .ro-title {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="ro-shell">
        {/* Header */}
        <div className="ro-header-row">
          <div className="ro-title-block">
            <h1 className="ro-title">Output File</h1>
            <p className="ro-subtitle">
              Preview the last rendered file for this project. This is a placeholder UI
              until the render engine is live.
            </p>
          </div>

          <div className="ro-header-buttons">
            <button
              type="button"
              className="ro-chip-btn"
              onClick={() => router.push("/creator-studio/render")}
            >
              Back to Render Settings
            </button>
            <button
              type="button"
              className="ro-chip-btn primary"
              onClick={() => router.push("/creator-studio/projects")}
            >
              Go to Projects
            </button>
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="ro-layout">
          {/* LEFT: Player / Empty state */}
          <div className="ro-panel">
            <div className="ro-panel-title">Rendered Preview</div>
            <div className="ro-panel-sub">
              Once your render engine is connected, this panel will show the final MP4 for
              the latest successful render job.
            </div>

            {hasOutput ? (
              <div className="ro-player-frame">
                <div className="ro-player-inner">
                  <div className="ro-play" aria-hidden />
                </div>
                <div className="ro-player-banner">
                  <span className="ro-player-label">
                    Integrity Streaming — Episode 1 (Render v1)
                  </span>
                  <span className="ro-player-pill">Mock MP4 • 1080p • 16:9</span>
                </div>
              </div>
            ) : (
              <div className="ro-empty-state">
                <div className="ro-empty-title">No rendered output yet</div>
                <div className="ro-empty-note">
                  When a project is sent to render and completes successfully, you’ll see
                  the latest output file preview here.
                </div>
              </div>
            )}

            <div className="ro-footnote">
              Note: This page is UI-only right now. No actual files are being loaded or
              streamed yet.
            </div>
          </div>

          {/* RIGHT: Metadata + actions */}
          <div className="ro-panel">
            <div className="ro-panel-title">File Details & Actions</div>
            <div className="ro-panel-sub">
              Review basic information about the rendered file and launch follow-up tools.
            </div>

            <div className="ro-meta-grid">
              <div className="ro-meta-item">
                <div className="ro-meta-label">Status</div>
                <div className="ro-meta-value">
                  {hasOutput ? "Rendered (mock)" : "Waiting for first render"}
                </div>
              </div>
              <div className="ro-meta-item">
                <div className="ro-meta-label">Resolution</div>
                <div className="ro-meta-value">
                  {hasOutput ? "1920 × 1080 (mock)" : "—"}
                </div>
              </div>
              <div className="ro-meta-item">
                <div className="ro-meta-label">Duration</div>
                <div className="ro-meta-value">
                  {hasOutput ? "12:34 (mock)" : "—"}
                </div>
              </div>
              <div className="ro-meta-item">
                <div className="ro-meta-label">File Size</div>
                <div className="ro-meta-value">
                  {hasOutput ? "742 MB (mock)" : "—"}
                </div>
              </div>
            </div>

            <div className="ro-pill-row">
              <span className="ro-pill">
                Source: Integrity Streaming Editor (sample project)
              </span>
              <span className="ro-pill">
                Next step: Publish or download (future)
              </span>
            </div>

            <div className="ro-actions-col">
              <button
                type="button"
                className="ro-small-btn primary"
                onClick={() =>
                  alert(
                    "This would open a dedicated player or download dialog for the rendered file.\n\nRight now this is UI-only (no real file)."
                  )
                }
              >
                Open in Viewer (mock)
              </button>
              <button
                type="button"
                className="ro-small-btn"
                onClick={() =>
                  alert(
                    "This would download the rendered MP4 to your device.\n\nRight now this is just a placeholder action."
                  )
                }
              >
                Download File (mock)
              </button>
              <button
                type="button"
                className="ro-small-btn"
                onClick={() =>
                  alert(
                    "This would open the Publish / Video Details screen pre-linked to this output.\n\nFor now it is a UI-only preview."
                  )
                }
              >
                Send to Publish Flow (mock)
              </button>
              <button
                type="button"
                className="ro-small-btn"
                onClick={() =>
                  alert(
                    "This would open a job history or logs panel for this render.\n\nRight now this is UI-only."
                  )
                }
              >
                View Render Job History (mock)
              </button>
            </div>

            <div className="ro-footnote">
              Later these buttons will be wired to real endpoints that know about your
              render jobs, storage buckets, and publishing pipeline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
