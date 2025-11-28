// app/creator-studio/projects/[projectId]/render-setup/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type Preset =
  | "1080p-24"
  | "1080p-30"
  | "4k-24"
  | "4k-30"
  | "vertical-1080p-30";

export default function RenderSetupPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string;

  const [preset, setPreset] = useState<Preset>("1080p-30");
  const [format, setFormat] = useState<"mp4" | "mov" | "webm">("mp4");
  const [bitrate, setBitrate] = useState(18); // mock Mbps
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioBitrate, setAudioBitrate] = useState(320); // kbps
  const [renderNotes, setRenderNotes] = useState(
    "UI-only notes for this render."
  );

  const handleSave = () => {
    alert("Render settings saved (mock).");
  };

  const handleSendToQueue = () => {
    alert(
      `Project "${projectId}" sent to render queue (mock).\nNo real rendering yet.`
    );
  };

  const handleBackToProjectList = () => {
    router.push("/creator-studio/projects");
  };

  const handleOpenEditor = () => {
    router.push(`/creator-studio/editor?projectId=${projectId}`);
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
        .render-shell {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .render-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .render-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .render-top-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .render-top-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .render-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .render-title-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .render-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .render-subtitle {
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .render-badge-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .render-badge {
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .render-layout-grid {
          display: grid;
          grid-template-columns: 1.7fr 1.3fr;
          gap: 24px;
        }

        .render-card {
          background: rgba(0, 0, 0, 0.32);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .render-section-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          opacity: 0.95;
        }

        .render-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .render-label {
          font-size: 12px;
          font-weight: 700;
        }

        .render-input,
        .render-select,
        .render-textarea {
          width: 100%;
          border-radius: 10px;
          border: 1px solid ${GOLD};
          background: rgba(0, 0, 0, 0.5);
          color: ${IVORY};
          font-size: 13px;
          padding: 8px 10px;
          font-family: inherit;
          box-sizing: border-box;
        }

        .render-textarea {
          min-height: 90px;
          resize: vertical;
        }

        .render-input:focus,
        .render-select:focus,
        .render-textarea:focus {
          outline: 2px solid ${GOLD};
          outline-offset: 1px;
        }

        .render-slider-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .render-slider-row span {
          font-size: 11px;
          font-weight: 700;
          opacity: 0.9;
          white-space: nowrap;
        }

        .render-range {
          flex: 1;
          accent-color: ${GOLD};
        }

        .render-toggle-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .render-toggle-label {
          font-size: 12px;
          font-weight: 700;
        }

        .render-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          accent-color: ${GOLD};
        }

        .render-preview-thumb {
          width: 100%;
          border-radius: 14px;
          aspect-ratio: 16 / 9;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.24),
            rgba(255, 249, 240, 0.05)
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .render-preview-frame {
          width: 92%;
          height: 85%;
          border-radius: 10px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          padding: 6px;
          box-sizing: border-box;
        }

        .render-preview-meta {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          opacity: 0.9;
        }

        .render-preview-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .render-preview-pill {
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
        }

        .render-footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .render-footer-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 11px;
          font-weight: 700;
          opacity: 0.9;
        }

        .render-footer-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .render-btn {
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
        }

        .render-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        @media (max-width: 960px) {
          .render-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .render-shell {
            gap: 20px;
          }
          .render-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="render-shell">
        {/* Top nav / breadcrumbs */}
        <div className="render-top-bar">
          <div className="render-top-left">
            <button
              className="render-top-btn"
              onClick={handleBackToProjectList}
            >
              ← Back to Projects
            </button>
            <span>
              Render setup • Project ID: {projectId || "unknown"}
            </span>
          </div>
          <button
            className="render-top-btn render-top-btn-primary"
            onClick={handleOpenEditor}
          >
            Open Editor
          </button>
        </div>

        {/* Header */}
        <div className="render-header-row">
          <div className="render-title-block">
            <div className="render-title">Render setup</div>
            <div className="render-subtitle">
              Configure export before sending to the render queue.
            </div>
          </div>
          <div className="render-badge-row">
            <div className="render-badge">UI ONLY</div>
            <div className="render-badge">NO RENDER ENGINE YET</div>
          </div>
        </div>

        {/* Main layout */}
        <div className="render-layout-grid">
          {/* Left: settings */}
          <div className="render-card">
            <div className="render-section-title">Export settings</div>

            {/* Preset */}
            <div className="render-field">
              <div className="render-label">Preset</div>
              <select
                className="render-select"
                value={preset}
                onChange={(e) => setPreset(e.target.value as Preset)}
              >
                <option value="1080p-24">1080p • 24 fps (landscape)</option>
                <option value="1080p-30">1080p • 30 fps (landscape)</option>
                <option value="4k-24">4K • 24 fps (landscape)</option>
                <option value="4k-30">4K • 30 fps (landscape)</option>
                <option value="vertical-1080p-30">
                  1080x1920 • 30 fps (vertical)
                </option>
              </select>
            </div>

            {/* Format */}
            <div className="render-field">
              <div className="render-label">Format</div>
              <select
                className="render-select"
                value={format}
                onChange={(e) =>
                  setFormat(e.target.value as "mp4" | "mov" | "webm")
                }
              >
                <option value="mp4">MP4 (H.264)</option>
                <option value="mov">MOV</option>
                <option value="webm">WEBM</option>
              </select>
            </div>

            {/* Bitrate slider */}
            <div className="render-field">
              <div className="render-label">Video bitrate (approx)</div>
              <div className="render-slider-row">
                <input
                  type="range"
                  min={8}
                  max={50}
                  value={bitrate}
                  onChange={(e) => setBitrate(Number(e.target.value))}
                  className="render-range"
                />
                <span>{bitrate} Mbps</span>
              </div>
            </div>

            {/* Audio toggle & bitrate */}
            <div className="render-field">
              <div className="render-toggle-row">
                <input
                  type="checkbox"
                  className="render-checkbox"
                  checked={audioEnabled}
                  onChange={(e) => setAudioEnabled(e.target.checked)}
                />
                <span className="render-toggle-label">Include audio track</span>
              </div>
            </div>

            {audioEnabled && (
              <div className="render-field">
                <div className="render-label">Audio bitrate</div>
                <div className="render-slider-row">
                  <input
                    type="range"
                    min={96}
                    max={320}
                    step={32}
                    value={audioBitrate}
                    onChange={(e) => setAudioBitrate(Number(e.target.value))}
                    className="render-range"
                  />
                  <span>{audioBitrate} kbps</span>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="render-field">
              <div className="render-label">Render notes (optional)</div>
              <textarea
                className="render-textarea"
                value={renderNotes}
                onChange={(e) => setRenderNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right: preview & estimates */}
          <div className="render-card">
            <div className="render-section-title">Preview & estimates</div>

            <div className="render-preview-thumb">
              <div className="render-preview-frame">
                Render preview placeholder
                <br />
                (final video frame UI-only)
              </div>
            </div>

            <div className="render-preview-meta">
              <div className="render-preview-row">
                <span>Estimated duration</span>
                <span>12:34 (mock)</span>
              </div>
              <div className="render-preview-row">
                <span>Estimated file size</span>
                <span>
                  ~{Math.round((bitrate * 12.5) / 10)}0 MB (very rough mock)
                </span>
              </div>
              <div className="render-preview-row">
                <span>Estimated render time</span>
                <span>5–8 min (mock)</span>
              </div>

              <div className="render-preview-row">
                <span>Summary</span>
                <span className="render-preview-pill">
                  {preset.toUpperCase()} • {format.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="render-footer-actions">
          <div className="render-footer-left">
            <span>Step 3 of 3 • Render setup</span>
            <span>Editor → Projects → Render</span>
          </div>
          <div className="render-footer-buttons">
            <button className="render-btn" onClick={handleBackToProjectList}>
              Back to Projects
            </button>
            <button className="render-btn" onClick={handleSave}>
              Save settings (mock)
            </button>
            <button
              className="render-btn render-btn-primary"
              onClick={handleSendToQueue}
            >
              Send to render queue (mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
