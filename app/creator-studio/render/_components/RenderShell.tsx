// app/creator-studio/render/_components/RenderShell.tsx
"use client";

import React, { useState } from "react";
import RenderSettingsPanel from "./RenderSettingsPanel";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function RenderShell() {
  const [hasSentToRender, setHasSentToRender] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveTimeline = () => {
    console.log("Save timeline (UI only)");
    alert(
      "Timeline state would be saved here.\n\nRight now this is UI-only; later it will save to your real backend."
    );
  };

  const handleSaveProject = () => {
    console.log("Save project (UI only)");
    alert(
      "Full project (timeline + settings) would be saved here.\n\nFor now this is UI-only."
    );
  };

  const handleDuplicateTimeline = () => {
    console.log("Duplicate timeline (UI only)");
    alert(
      "This would create a duplicate timeline with the same clips and settings.\n\nRight now this is just a mock action so you can design the flow."
    );
  };

  const handleSendToRenderClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmSend = () => {
    console.log("Save & send to render (UI only)");
    setHasSentToRender(true);
    setShowConfirm(false);
    alert(
      "This would send the timeline + settings to your render engine.\n\nRight now it's a mock action, but the UI shell is ready."
    );
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="render-root">
      <style jsx>{`
        .render-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          position: relative;
        }

        .render-shell {
          width: 100%;
          max-width: 1180px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* HEADER */
        .render-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .render-title-block {
          min-width: 220px;
        }

        .render-title {
          font-size: 30px;
          font-weight: 800;
          color: ${GOLD};
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
          margin-bottom: 2px;
        }

        .render-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }

        .render-header-right {
          font-size: 12px;
          opacity: 0.8;
          text-align: right;
        }

        /* LAYOUT GRID */
        .render-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 2fr);
          gap: 16px;
        }

        .render-card {
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 18px;
          border: 2px solid ${GOLD};
          padding: 14px 14px 12px;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.85);
        }

        .card-title {
          font-size: 16px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 4px;
        }

        .card-sub {
          font-size: 12px;
          opacity: 0.85;
          margin-bottom: 10px;
        }

        /* LEFT: SETTINGS PANEL WRAP */
        .settings-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* RIGHT: TIMELINE + OUTPUT */
        .timeline-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
        }

        .timeline-preview-box {
          border-radius: 14px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #262626, #000);
          width: 100%;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .timeline-play {
          width: 0;
          height: 0;
          border-left: 28px solid #fff;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.3))
            drop-shadow(0 0 2px rgba(0, 0, 0, 0.4));
        }

        .timeline-pill {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-size: 10px;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .timeline-caption {
          font-size: 11px;
          opacity: 0.85;
        }

        /* ACTIONS + OUTPUT */
        .actions-card-inner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        .pill-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
          line-height: 1.2;
          white-space: normal; /* allow text to stack inside */
          text-align: center;
          min-width: 130px;
        }

        .pill-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.75);
        }

        .pill-btn.secondary {
          border-color: rgba(255, 255, 255, 0.5);
        }

        .pill-btn.ghost {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .output-box {
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.55);
          padding: 10px 12px;
          font-size: 12px;
        }

        .output-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .output-title {
          font-weight: 700;
        }

        .output-status-pill {
          border-radius: 999px;
          padding: 3px 8px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(0, 0, 0, 0.4);
          font-size: 11px;
        }

        .output-body {
          font-size: 12px;
          opacity: 0.9;
        }

        .output-preview {
          margin-top: 10px;
          border-radius: 12px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #222, #000);
          width: 100%;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .output-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          font-size: 10px;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .output-text-center {
          font-size: 12px;
          opacity: 0.9;
          text-align: center;
          padding: 0 8px;
        }

        /* CONFIRMATION MODAL */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          z-index: 40;
        }

        .modal {
          width: 100%;
          max-width: 460px;
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 20px;
          border: 2px solid ${GOLD};
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.9);
          padding: 18px 18px 16px;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 6px;
        }

        .modal-body {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 12px;
        }

        .modal-note {
          font-size: 11px;
          opacity: 0.85;
          margin-bottom: 14px;
        }

        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        .modal-btn {
          border-radius: 999px;
          border: 1px solid ${GOLD};
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          min-width: 120px;
        }

        .modal-btn.cancel {
          background: transparent;
          color: ${IVORY};
        }

        .modal-btn.confirm {
          background: ${GOLD};
          color: #2c020b;
        }

        @media (max-width: 900px) {
          .render-root {
            padding: 16px;
          }

          .render-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .render-header-right {
            text-align: left;
          }

          .render-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 600px) {
          .render-title {
            font-size: 24px;
          }

          .actions-row {
            justify-content: center;
          }

          .pill-btn {
            flex: 1 1 140px;
          }

          .modal-actions {
            justify-content: center;
          }

          .modal-btn {
            flex: 1 1 140px;
            text-align: center;
          }
        }
      `}</style>

      <div className="render-shell">
        {/* HEADER */}
        <div className="render-header">
          <div className="render-title-block">
            <h1 className="render-title">Render & Output</h1>
            <p className="render-subtitle">
              Lock in your settings, save your timeline, and prepare a render job. All UI
              here is safe and independent of the actual render engine.
            </p>
          </div>
          <div className="render-header-right">
            Render engine: <strong>Not connected yet</strong>
            <br />
            These controls are <strong>UI-only</strong> until your backend is wired up.
          </div>
        </div>

        <div className="render-grid">
          {/* LEFT: SETTINGS PANEL (unchanged inner component) */}
          <div className="render-card">
            <div className="card-title">Render settings</div>
            <div className="card-sub">
              Choose output resolution, codecs, destinations, and more. This panel is safe
              to build now — later it will just pass data to your real render pipeline.
            </div>
            <div className="settings-wrap">
              <RenderSettingsPanel />
            </div>
          </div>

          {/* RIGHT: TIMELINE PREVIEW + OUTPUT */}
          <div className="render-card">
            {/* Timeline preview */}
            <div className="timeline-card">
              <div className="card-title">Timeline snapshot (mock)</div>
              <div className="card-sub">
                This represents the current state of your edit. Later it can be wired to a
                live preview or thumbnail of the timeline.
              </div>
              <div className="timeline-preview-box">
                <div className="timeline-play" aria-hidden />
                <span className="timeline-pill">16:9 timeline preview</span>
              </div>
              <div className="timeline-caption">
                This is a placeholder preview. It does not play video yet — it’s only here
                so the layout is ready for your real viewer.
              </div>
            </div>

            {/* Actions + output */}
            <div className="actions-card-inner">
              <div className="card-title">Save, duplicate & output (UI shell)</div>
              <div className="card-sub">
                These buttons act on your project and timeline, not the final MP4 file. All
                actions here are mocks until your render backend is connected.
              </div>

              <div className="actions-row">
                <button
                  type="button"
                  className="pill-btn secondary"
                  onClick={handleSaveTimeline}
                >
                  Save
                  <br />
                  timeline (mock)
                </button>
                <button
                  type="button"
                  className="pill-btn ghost"
                  onClick={handleSaveProject}
                >
                  Save full
                  <br />
                  project (mock)
                </button>
                <button
                  type="button"
                  className="pill-btn ghost"
                  onClick={handleDuplicateTimeline}
                >
                  Duplicate
                  <br />
                  timeline (mock)
                </button>
                <button
                  type="button"
                  className="pill-btn primary"
                  onClick={handleSendToRenderClick}
                >
                  Save &amp; send
                  <br />
                  to render (mock)
                </button>
              </div>

              {/* Output file placeholder */}
              <div className="output-box">
                <div className="output-header-row">
                  <span className="output-title">Output file</span>
                  <span className="output-status-pill">
                    {hasSentToRender
                      ? "Render in progress (UI only)"
                      : "No render job started yet"}
                  </span>
                </div>

                {!hasSentToRender ? (
                  <div className="output-body">
                    You haven&apos;t sent this project to render yet. When you click{" "}
                    <strong>Save &amp; send to render</strong>, this box will show a
                    placeholder player and mock status — later it will show a real MP4.
                  </div>
                ) : (
                  <>
                    <div className="output-body">
                      This is a placeholder for your rendered output. In the real system,
                      this area will show the job status, duration, and a playable video
                      once your render engine returns a file.
                    </div>
                    <div className="output-preview">
                      <span className="output-badge">Mock output preview</span>
                      <div className="output-text-center">
                        Render job created (UI only).
                        <br />
                        Waiting for a real backend to return an MP4 file.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-title">Save &amp; send to render? (mock)</div>
            <div className="modal-body">
              This will save your current timeline and settings, then create a{" "}
              <strong>mock render job</strong>. No real files will be generated yet.
            </div>
            <div className="modal-note">
              Later, this exact button will talk to your real render engine and update the
              output section with a real status and MP4 link.
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn cancel"
                onClick={handleCancelConfirm}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn confirm"
                onClick={handleConfirmSend}
              >
                Yes, save &amp; send (UI only)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
