"use client";

import React, { useState } from "react";

const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type ResetSettingsPanelProps = {
  currentAspect?: "16:9" | "9:16";
  currentResolution?: "720p" | "1080p" | "4k";
  currentDestination?: "integrity" | "shorts" | "tiktok";
};

export default function ResetSettingsPanel({
  currentAspect = "16:9",
  currentResolution = "1080p",
  currentDestination = "integrity",
}: ResetSettingsPanelProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"recommended" | "factory" | null>(null);

  const openModal = (m: "recommended" | "factory") => {
    setMode(m);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMode(null);
  };

  const confirmReset = () => {
    if (!mode) return;

    if (mode === "recommended") {
      alert(
        "This would reset your render settings to recommended values for your current project.\n\nRight now this is UI-only (no real settings are changed)."
      );
    } else {
      alert(
        "This would reset EVERYTHING to factory defaults for render settings.\n\nRight now this is UI-only (no real settings are changed)."
      );
    }

    closeModal();
  };

  const destinationLabel =
    currentDestination === "integrity"
      ? "Integrity Streaming Videos"
      : currentDestination === "shorts"
      ? "Integrity Streaming Shorts"
      : "TikTok (vertical)";

  return (
    <div className="rs-root">
      <style jsx>{`
        .rs-root {
          position: relative;
        }

        .rs-card {
          border-radius: 18px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #181818, #050505);
          padding: 14px 14px 12px;
          color: ${IVORY};
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.85);
        }

        .rs-title {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .rs-sub {
          font-size: 12px;
          opacity: 0.85;
          margin-bottom: 12px;
        }

        .rs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 10px;
        }

        .rs-pill {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 6px 8px;
          font-size: 11px;
          background: rgba(0, 0, 0, 0.45);
        }

        .rs-label {
          font-size: 11px;
          opacity: 0.8;
          margin-bottom: 2px;
        }

        .rs-value {
          font-size: 12px;
          font-weight: 600;
        }

        .rs-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .rs-btn {
          border-radius: 999px;
          border: 1px solid ${GOLD};
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
          white-space: normal;
          line-height: 1.25;
        }

        .rs-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
        }

        .rs-btn:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        .rs-btn.primary:hover {
          background: #ffe676;
        }

        .rs-footnote {
          font-size: 11px;
          opacity: 0.8;
          margin-top: 6px;
        }

        /* Modal */
        .rs-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          z-index: 50;
        }

        .rs-modal {
          width: 100%;
          max-width: 420px;
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 20px;
          border: 2px solid ${GOLD};
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.9);
          padding: 16px 16px 14px;
        }

        .rs-modal-title {
          font-size: 18px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 6px;
        }

        .rs-modal-body {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 10px;
        }

        .rs-modal-list {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 10px;
        }

        .rs-modal-list ul {
          padding-left: 18px;
          margin: 4px 0 0 0;
        }

        .rs-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        .rs-modal-btn {
          border-radius: 999px;
          border: 1px solid ${GOLD};
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          min-width: 110px;
        }

        .rs-modal-btn.cancel {
          background: transparent;
          color: ${IVORY};
        }

        .rs-modal-btn.confirm {
          background: ${GOLD};
          color: #2c020b;
        }

        @media (max-width: 720px) {
          .rs-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .rs-buttons {
            justify-content: stretch;
          }

          .rs-btn,
          .rs-btn.primary {
            flex: 1 1 140px;
            text-align: center;
          }

          .rs-modal-actions {
            justify-content: center;
          }

          .rs-modal-btn {
            flex: 1 1 120px;
            text-align: center;
          }
        }
      `}</style>

      <div className="rs-card">
        <div className="rs-title">Reset Render Settings</div>
        <div className="rs-sub">
          Quickly roll back to safe, predictable defaults without touching your timeline.
          This is UI-only for now.
        </div>

        <div className="rs-grid">
          <div className="rs-pill">
            <div className="rs-label">Current Aspect</div>
            <div className="rs-value">{currentAspect}</div>
          </div>
          <div className="rs-pill">
            <div className="rs-label">Base Resolution</div>
            <div className="rs-value">{currentResolution}</div>
          </div>
          <div className="rs-pill">
            <div className="rs-label">Destination</div>
            <div className="rs-value">{destinationLabel}</div>
          </div>
        </div>

        <div className="rs-buttons">
          <button
            type="button"
            className="rs-btn primary"
            onClick={() => openModal("recommended")}
          >
            Reset to Recommended (mock)
          </button>
          <button
            type="button"
            className="rs-btn"
            onClick={() => openModal("factory")}
          >
            Reset to Factory Defaults (mock)
          </button>
        </div>

        <div className="rs-footnote">
          Later this will call your real render settings API. For now, it’s a preview of
          the flow only.
        </div>
      </div>

      {modalOpen && mode && (
        <div className="rs-modal-backdrop">
          <div className="rs-modal" role="dialog" aria-modal="true">
            <div className="rs-modal-title">
              {mode === "recommended"
                ? "Reset to Recommended Settings?"
                : "Reset to Factory Defaults?"}
            </div>
            <div className="rs-modal-body">
              {mode === "recommended" ? (
                <>
                  This will align your render settings with recommended values for your
                  current project type.
                </>
              ) : (
                <>
                  This will reset all render settings back to the original defaults on
                  Integrity Streaming.
                </>
              )}
            </div>
            <div className="rs-modal-list">
              <strong>Includes:</strong>
              <ul>
                <li>Output resolution &amp; aspect ratio</li>
                <li>Bitrate &amp; quality profile (future)</li>
                <li>Destination profile and presets</li>
              </ul>
            </div>

            <div className="rs-modal-actions">
              <button
                type="button"
                className="rs-modal-btn cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rs-modal-btn confirm"
                onClick={confirmReset}
              >
                Yes, reset (UI only)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
