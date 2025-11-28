// app/creator-studio/render/_components/RenderSettingsPanel.tsx
"use client";

import React, { useState } from "react";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type Container = "mp4" | "mov";
type Codec = "h264" | "hevc";
type Resolution = "720p" | "1080p" | "4k";
type FrameRate = "24" | "30" | "60";

export default function RenderSettingsPanel() {
  const [container, setContainer] = useState<Container>("mp4");
  const [codec, setCodec] = useState<Codec>("h264");
  const [resolution, setResolution] = useState<Resolution>("1080p");
  const [frameRate, setFrameRate] = useState<FrameRate>("30");
  const [bitrateMbps, setBitrateMbps] = useState<number>(16);
  const [sendToIntegrity, setSendToIntegrity] = useState(true);
  const [sendToDownload, setSendToDownload] = useState(true);
  const [sendToBackup, setSendToBackup] = useState(false);

  const handleReset = () => {
    // UI-only reset; later you can wire this to real project defaults
    setContainer("mp4");
    setCodec("h264");
    setResolution("1080p");
    setFrameRate("30");
    setBitrateMbps(16);
    setSendToIntegrity(true);
    setSendToDownload(true);
    setSendToBackup(false);

    console.log("Reset render settings to defaults (UI only)");
    alert(
      "Render settings have been reset to your mock defaults.\n\nLater this button can pull real project or account defaults from your backend."
    );
  };

  return (
    <div className="rs-root">
      <style jsx>{`
        .rs-root {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rs-section {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.45);
          padding: 10px 10px 8px;
        }

        .rs-section-title {
          font-size: 13px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 4px;
        }

        .rs-section-sub {
          font-size: 11px;
          opacity: 0.85;
          margin-bottom: 8px;
        }

        .rs-field {
          margin-bottom: 8px;
        }

        .rs-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .rs-label {
          font-size: 12px;
          font-weight: 700;
        }

        .rs-help {
          font-size: 10px;
          opacity: 0.8;
        }

        .rs-select,
        .rs-input {
          width: 100%;
          border-radius: 999px;
          border: 2px solid ${GOLD};
          background: ${BURGUNDY};
          color: ${IVORY};
          font-size: 12px;
          padding: 7px 10px;
          outline: none;
        }

        .rs-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rs-row > .rs-field {
          flex: 1 1 120px;
          margin-bottom: 0;
        }

        .rs-slider-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rs-slider {
          flex: 1;
        }

        .rs-slider input[type="range"] {
          width: 100%;
        }

        .rs-pill {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 3px 9px;
          font-size: 11px;
          opacity: 0.9;
        }

        .rs-toggle-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .rs-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .rs-toggle span {
          opacity: 0.95;
        }

        .rs-reset-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .rs-reset-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
          white-space: nowrap;
        }

        .rs-reset-btn:hover {
          background: rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 600px) {
          .rs-section {
            padding: 9px 9px 7px;
          }

          .rs-reset-row {
            justify-content: center;
          }

          .rs-reset-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* OUTPUT FORMAT */}
      <div className="rs-section">
        <div className="rs-section-title">Output format</div>
        <div className="rs-section-sub">
          Safe to tweak now. Later these values will map directly into your render engine.
        </div>

        <div className="rs-row">
          <div className="rs-field">
            <div className="rs-label-row">
              <span className="rs-label">Container</span>
              <span className="rs-help">Most platforms prefer MP4.</span>
            </div>
            <select
              className="rs-select"
              value={container}
              onChange={(e) => setContainer(e.target.value as Container)}
            >
              <option value="mp4">MP4</option>
              <option value="mov">MOV</option>
            </select>
          </div>

          <div className="rs-field">
            <div className="rs-label-row">
              <span className="rs-label">Codec</span>
              <span className="rs-help">H.264 for compatibility, HEVC for efficiency.</span>
            </div>
            <select
              className="rs-select"
              value={codec}
              onChange={(e) => setCodec(e.target.value as Codec)}
            >
              <option value="h264">H.264</option>
              <option value="hevc">HEVC (H.265)</option>
            </select>
          </div>
        </div>

        <div className="rs-row" style={{ marginTop: 8 }}>
          <div className="rs-field">
            <div className="rs-label-row">
              <span className="rs-label">Resolution</span>
              <span className="rs-help">1080p is a strong default.</span>
            </div>
            <select
              className="rs-select"
              value={resolution}
              onChange={(e) => setResolution(e.target.value as Resolution)}
            >
              <option value="720p">720p HD</option>
              <option value="1080p">1080p Full HD</option>
              <option value="4k">4K UHD</option>
            </select>
          </div>

          <div className="rs-field">
            <div className="rs-label-row">
              <span className="rs-label">Frame rate</span>
              <span className="rs-help">Match your edit timeline.</span>
            </div>
            <select
              className="rs-select"
              value={frameRate}
              onChange={(e) => setFrameRate(e.target.value as FrameRate)}
            >
              <option value="24">24 fps</option>
              <option value="30">30 fps</option>
              <option value="60">60 fps</option>
            </select>
          </div>
        </div>
      </div>

      {/* QUALITY */}
      <div className="rs-section">
        <div className="rs-section-title">Quality & bitrate</div>
        <div className="rs-section-sub">
          These are just UI sliders right now. Later they&apos;ll become real encoder
          parameters.
        </div>

        <div className="rs-field">
          <div className="rs-label-row">
            <span className="rs-label">Target bitrate</span>
            <span className="rs-help">{bitrateMbps} Mbps</span>
          </div>
          <div className="rs-slider-row">
            <div className="rs-slider">
              <input
                type="range"
                min={4}
                max={80}
                step={2}
                value={bitrateMbps}
                onChange={(e) => setBitrateMbps(Number(e.target.value))}
              />
            </div>
            <span className="rs-pill">
              {bitrateMbps <= 8
                ? "Smaller file • lower quality"
                : bitrateMbps <= 20
                ? "Balanced quality"
                : "Highest quality • larger file"}
            </span>
          </div>
        </div>
      </div>

      {/* DESTINATIONS */}
      <div className="rs-section">
        <div className="rs-section-title">Destinations (mock)</div>
        <div className="rs-section-sub">
          Decide where the rendered file will be delivered. All of this is UI-only until
          your pipeline is wired.
        </div>

        <div className="rs-toggle-row">
          <label className="rs-toggle">
            <input
              type="checkbox"
              checked={sendToIntegrity}
              onChange={(e) => setSendToIntegrity(e.target.checked)}
            />
            <span>Publish to Integrity Streaming (primary)</span>
          </label>
          <label className="rs-toggle">
            <input
              type="checkbox"
              checked={sendToDownload}
              onChange={(e) => setSendToDownload(e.target.checked)}
            />
            <span>Make a downloadable copy for the creator</span>
          </label>
          <label className="rs-toggle">
            <input
              type="checkbox"
              checked={sendToBackup}
              onChange={(e) => setSendToBackup(e.target.checked)}
            />
            <span>Send a backup copy to cloud storage (mock)</span>
          </label>
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="rs-reset-row">
        <button type="button" className="rs-reset-btn" onClick={handleReset}>
          Reset render settings (mock)
        </button>
      </div>
    </div>
  );
}
