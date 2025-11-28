// app/creator-studio/editor/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaItem, loadMediaLibrary } from "@/lib/mediaLibrary";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type TextFont = "system" | "serif" | "mono";
type TextSize = "small" | "medium" | "large";
type TextColor = "white" | "gold" | "burgundy";

export default function EditorPage() {
  const router = useRouter();
  const search = useSearchParams();
  const projectId = search?.get("projectId") ?? "unknown";

  // Inspector state (UI-only mock)
  const [clipName, setClipName] = useState("Ferris.mp4");
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0.0);
  const [posX, setPosX] = useState(0.0);
  const [posY, setPosY] = useState(0.0);

  // Text tools state (live-linked to preview)
  const [textContent, setTextContent] = useState("Sample title over video");
  const [textFont, setTextFont] = useState<TextFont>("system");
  const [textSize, setTextSize] = useState<TextSize>("medium");
  const [textColor, setTextColor] = useState<TextColor>("white");

  // Media library items uploaded from the Upload page
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setMediaItems(loadMediaLibrary());
  }, []);

  const format = (value: number, digits: number) => value.toFixed(digits);
  const parse = (raw: string, fallback: number) => {
    const n = parseFloat(raw);
    return Number.isNaN(n) ? fallback : n;
  };

  const textFontFamily =
    textFont === "serif"
      ? "Georgia, 'Times New Roman', serif"
      : textFont === "mono"
      ? "'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      : "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

  const textFontSize =
    textSize === "small" ? 14 : textSize === "large" ? 26 : 20;

  const textColorValue:
    | typeof IVORY
    | typeof GOLD
    | typeof BURGUNDY = textColor === "gold"
    ? GOLD
    : textColor === "burgundy"
    ? BURGUNDY
    : IVORY;

  // Position mapping for overlay text
  const overlayOffsetX = posX * 20; // pixels
  const overlayOffsetY = posY * 20; // pixels

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BURGUNDY,
        color: IVORY,
        boxSizing: "border-box",
        padding: 16,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        .editor-shell {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .editor-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .editor-top-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .editor-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .editor-subtitle {
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .editor-top-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .editor-pill-btn {
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .editor-pill-btn.primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .editor-main-grid {
          display: grid;
          grid-template-columns: 260px minmax(0, 1.8fr) 260px;
          gap: 12px;
        }

        .editor-panel {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 16px;
          padding: 12px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .editor-panel-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.95;
        }

        .editor-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .editor-input {
          width: 100%;
          padding: 6px 8px;
          border-radius: 10px;
          border: 1px solid ${GOLD};
          background: rgba(0,0,0,0.5);
          color: ${IVORY};
          font-size: 12px;
          font-weight: 600;
          box-sizing: border-box;
        }

        .editor-input:focus {
          outline: 2px solid ${GOLD};
          outline-offset: 1px;
        }

        .editor-label {
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 3px;
        }

        /* MEDIA POOL */

        .editor-media-pool {
          border-radius: 12px;
          border: 1px dashed rgba(255,215,0,0.6);
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .editor-media-pool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
        }

        .editor-media-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .editor-media-item {
          border-radius: 8px;
          border: 1px solid rgba(255,215,0,0.6);
          background: rgba(0,0,0,0.7);
          padding: 4px 6px;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          flex-direction: column;
          gap: 2px;
          cursor: pointer;
        }

        .editor-media-thumb {
          width: 100%;
          height: 36px;
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            rgba(255,215,0,0.25),
            rgba(255,249,240,0.05)
          );
        }

        .editor-media-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .editor-media-hint {
          font-size: 9px;
          opacity: 0.75;
        }

        .editor-add-media-btn {
          margin-top: 4px;
          padding: 4px 8px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          align-self: flex-start;
        }

        /* PREVIEW + TOOLS + TIMELINE */

        .editor-preview-shell {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .editor-preview-monitor {
          border-radius: 14px;
          padding: 8px;
          background: radial-gradient(circle at top left, rgba(255,215,0,0.18), rgba(0,0,0,0.9));
          box-shadow: 0 0 0 1px rgba(0,0,0,0.6);
        }

        /* SINGLE WINDOW PREVIEW */
        .editor-monitor-inner {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          border: 2px solid ${GOLD};
          background: linear-gradient(
            135deg,
            rgba(255,215,0,0.15),
            rgba(0,0,0,0.9)
          );
          box-shadow: 0 0 24px rgba(0,0,0,0.7) inset;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .editor-video-layer {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .editor-monitor-hint {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          font-weight: 700;
          opacity: 0.7;
          white-space: nowrap;
        }

        .editor-transport-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .editor-transport-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .editor-transport-btn {
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .editor-timecode {
          padding: 4px 8px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
        }

        /* EDIT TOOLS BAR */

        .editor-tools-bar {
          margin-top: 4px;
          border-radius: 12px;
          border: 1px solid rgba(255,215,0,0.5);
          padding: 6px 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .editor-tools-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .editor-tools-label {
          opacity: 0.9;
        }

        .editor-tools-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .editor-tool-btn {
          padding: 4px 8px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: rgba(0,0,0,0.6);
          color: ${IVORY};
          font-size: 10px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .editor-tool-btn.active {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .editor-tool-icon {
          font-size: 11px;
        }

        .editor-timeline-shell {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 16px;
          padding: 8px 10px 10px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .editor-timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          opacity: 0.9;
        }

        .editor-zoom-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .editor-zoom-track {
          width: 80px;
          height: 4px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: rgba(0,0,0,0.4);
          overflow: hidden;
        }

        .editor-zoom-bar {
          width: 40%;
          height: 100%;
          background: ${GOLD};
        }

        .editor-lanes {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .editor-lane-row {
          display: grid;
          grid-template-columns: 60px minmax(0, 1fr);
          gap: 4px;
          align-items: stretch;
        }

        .editor-lane-label {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.95;
        }

        /* Lanes twice as tall */
        .editor-lane-track {
          border-radius: 10px;
          border: 1px solid rgba(255,215,0,0.7);
          background: linear-gradient(
            90deg,
            rgba(255,215,0,0.15),
            rgba(255,249,240,0.02)
          );
          height: 64px;
          position: relative;
          overflow: hidden;
        }

        .editor-clip {
          position: absolute;
          top: 12px;
          left: 6%;
          width: 30%;
          height: 40px;
          border-radius: 8px;
          background: rgba(255,215,0,0.85);
          color: ${BURGUNDY};
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
        }

        .editor-clip.secondary {
          left: 40%;
          width: 24%;
          background: rgba(255,249,240,0.9);
        }

        .editor-playhead {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          left: 50%;
          background: ${GOLD};
        }

        /* INSPECTOR */

        .editor-inspector-section {
          border-radius: 12px;
          border: 1px dashed rgba(255,215,0,0.5);
          padding: 8px;
          font-size: 11px;
          font-weight: 700;
          opacity: 0.9;
        }

        .inspector-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 8px;
        }

        .inspector-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .inspector-control {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .inspector-input-numeric {
          flex: 1;
          font-variant-numeric: tabular-nums;
        }

        .inspector-arrows {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .inspector-arrow-btn {
          width: 22px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid ${GOLD};
          background: rgba(0,0,0,0.6);
          color: ${IVORY};
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .inspector-arrow-btn:active {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        /* Responsive */

        @media (max-width: 1100px) {
          .editor-main-grid {
            grid-template-columns: minmax(0, 1.4fr) 260px;
            grid-template-rows: auto auto;
          }

          .editor-panel-left {
            grid-column: 1 / -1;
            order: 2;
          }

          .editor-panel-middle {
            order: 1;
          }

          .editor-panel-right {
            order: 3;
          }
        }

        @media (max-width: 768px) {
          .editor-main-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .editor-panel-left,
          .editor-panel-middle,
          .editor-panel-right {
            order: initial;
          }
        }

        @media (max-width: 640px) {
          .editor-title {
            font-size: 18px;
          }

          .editor-shell {
            gap: 12px;
          }
        }
      `}</style>

      <div className="editor-shell">
        {/* Top bar */}
        <div className="editor-top-bar">
          <div className="editor-top-left">
            <div className="editor-title">Editor</div>
            <div className="editor-subtitle">
              Project ID: <span style={{ fontWeight: 800 }}>{projectId}</span> •
              UI-only timeline shell (no real rendering yet).
            </div>
          </div>
          <div className="editor-top-buttons">
            <button
              className="editor-pill-btn"
              onClick={() => router.push("/creator-studio/projects")}
            >
              ← Back to Projects
            </button>
            <button
              className="editor-pill-btn"
              onClick={() => router.push("/creator-studio/library")}
            >
              Content Library
            </button>
            <button
              className="editor-pill-btn primary"
              onClick={() => alert("Save timeline (mock only).")}
            >
              Save timeline (mock)
            </button>
          </div>
        </div>

        {/* Main layout: left | center | right */}
        <div className="editor-main-grid">
          {/* LEFT: Project + MEDIA POOL */}
          <div className="editor-panel editor-panel-left">
            <div className="editor-panel-title">Project</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700 }}>
                Integrity Streaming project
              </span>
              <span className="editor-tag">UI ONLY</span>
            </div>

            <div>
              <div className="editor-label">Project name</div>
              <input
                className="editor-input"
                defaultValue="Integrity Streaming — Episode draft"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: 8,
              }}
            >
              <div>
                <div className="editor-label">Aspect</div>
                <select className="editor-input" defaultValue="16:9">
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Vertical)</option>
                  <option value="1:1">1:1 (Square)</option>
                </select>
              </div>
              <div>
                <div className="editor-label">FPS (mock)</div>
                <select className="editor-input" defaultValue="30">
                  <option value="24">24</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </div>
            </div>

            {/* MEDIA POOL BOX (now populated from uploads) */}
            <div className="editor-media-pool">
              <div className="editor-media-pool-header">
                <span>Media Pool</span>
                <span style={{ fontSize: 10, opacity: 0.9 }}>
                  Upload media in Creator Studio → Upload — it will appear here.
                </span>
              </div>

              {mediaItems.length === 0 ? (
                <div
                  style={{
                    fontSize: 10,
                    opacity: 0.8,
                    padding: 6,
                    borderRadius: 8,
                    border: "1px dashed rgba(255,215,0,0.5)",
                    marginTop: 4,
                  }}
                >
                  No media yet. Go to the <strong>Upload</strong> page, upload a
                  file, then come back here — it will automatically appear in
                  this pool.
                </div>
              ) : (
                <div className="editor-media-grid">
                  {mediaItems.map((item) => (
                    <div
                      key={item.id}
                      className="editor-media-item"
                      onClick={() =>
                        alert(
                          `In the full editor, dragging "${item.name}" to the timeline would place its video on V1 and its audio on A1 (if it has audio).`
                        )
                      }
                    >
                      <div className="editor-media-thumb" />
                      <span className="editor-media-label">{item.name}</span>
                      <span className="editor-media-hint">
                        {item.type === "audio" ? "Audio" : "Video"} • added to
                        library
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="editor-add-media-btn"
                onClick={() =>
                  alert(
                    "In the future this could open the same upload flow. For now, use the Creator Studio → Upload page."
                  )
                }
              >
                + Add media (mock)
              </button>
            </div>
          </div>

          {/* CENTER: Preview + TOOLS + timeline */}
          <div className="editor-panel editor-panel-middle editor-preview-shell">
            <div className="editor-panel-title">Preview</div>

            {/* SINGLE-WINDOW LIVE PREVIEW */}
            <div className="editor-preview-monitor">
              <div className="editor-monitor-inner">
                <div
                  className="editor-video-layer"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Fake video content background */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Overlay text driven by Text tools + Position */}
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(50% + ${overlayOffsetX}px)`,
                        top: `calc(50% + ${overlayOffsetY}px)`,
                        transform: "translate(-50%, -50%)",
                        fontFamily: textFontFamily,
                        fontSize: textFontSize,
                        color: textColorValue,
                        fontWeight: 800,
                        textShadow:
                          textColor === "burgundy"
                            ? "0 0 10px rgba(255,215,0,0.7)"
                            : "0 0 10px rgba(0,0,0,0.7)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {textContent}
                    </div>
                  </div>
                </div>

                <div className="editor-monitor-hint">
                  Preview reflects Inspector + Text tools in real time (UI only)
                </div>
              </div>
            </div>

            <div className="editor-transport-row">
              <div className="editor-transport-buttons">
                <button
                  className="editor-transport-btn"
                  onClick={() => alert("Play/Pause (mock).")}
                >
                  ▶ / ❚❚
                </button>
                <button
                  className="editor-transport-btn"
                  onClick={() => alert("Step backward (mock).")}
                >
                  ◀ 1f
                </button>
                <button
                  className="editor-transport-btn"
                  onClick={() => alert("Step forward (mock).")}
                >
                  1f ▶
                </button>
              </div>
              <div className="editor-timecode">01:00:00:00</div>
            </div>

            {/* EDIT TOOLS BAR */}
            <div className="editor-tools-bar">
              <div className="editor-tools-left">
                <span className="editor-tools-label">Edit tools</span>
                <div className="editor-tools-buttons">
                  <button
                    className="editor-tool-btn active"
                    onClick={() => alert("Select tool (mock).")}
                  >
                    <span className="editor-tool-icon">↖</span>
                    <span>Select</span>
                  </button>
                  <button
                    className="editor-tool-btn"
                    onClick={() => alert("Trim tool (mock).")}
                  >
                    <span className="editor-tool-icon">〓</span>
                    <span>Trim</span>
                  </button>
                  <button
                    className="editor-tool-btn"
                    onClick={() => alert("Blade / Cut tool (mock).")}
                  >
                    <span className="editor-tool-icon">✂</span>
                    <span>Blade</span>
                  </button>
                  <button
                    className="editor-tool-btn"
                    onClick={() => alert("Slip tool (mock).")}
                  >
                    <span className="editor-tool-icon">⇋</span>
                    <span>Slip</span>
                  </button>
                  <button
                    className="editor-tool-btn"
                    onClick={() => alert("Slide tool (mock).")}
                  >
                    <span className="editor-tool-icon">⟷</span>
                    <span>Slide</span>
                  </button>
                </div>
              </div>

              <span style={{ fontSize: 10, opacity: 0.85 }}>
                UI-only — tools don&apos;t modify clips yet
              </span>
            </div>

            {/* Timeline: V, A, O1, O2, T (top to bottom) */}
            <div className="editor-timeline-shell">
              <div className="editor-timeline-header">
                <span>Timeline</span>
                <div className="editor-zoom-row">
                  <span style={{ fontSize: 10 }}>Zoom</span>
                  <div className="editor-zoom-track">
                    <div className="editor-zoom-bar" />
                  </div>
                </div>
              </div>

              <div className="editor-lanes">
                {/* Video lane */}
                <div className="editor-lane-row">
                  <div className="editor-lane-label">V1</div>
                  <div className="editor-lane-track">
                    <div className="editor-playhead" />
                    <div className="editor-clip">Video</div>
                  </div>
                </div>

                {/* Audio lane */}
                <div className="editor-lane-row">
                  <div className="editor-lane-label">A1</div>
                  <div className="editor-lane-track">
                    <div className="editor-playhead" />
                    <div className="editor-clip secondary">Audio</div>
                  </div>
                </div>

                {/* Overlay 1 */}
                <div className="editor-lane-row">
                  <div className="editor-lane-label">O1</div>
                  <div className="editor-lane-track">
                    <div className="editor-playhead" />
                    <div className="editor-clip secondary">Overlay 1</div>
                  </div>
                </div>

                {/* Overlay 2 */}
                <div className="editor-lane-row">
                  <div className="editor-lane-label">O2</div>
                  <div className="editor-lane-track">
                    <div className="editor-playhead" />
                    <div className="editor-clip secondary">Overlay 2</div>
                  </div>
                </div>

                {/* Text lane */}
                <div className="editor-lane-row">
                  <div className="editor-lane-label">T1</div>
                  <div className="editor-lane-track">
                    <div className="editor-playhead" />
                    <div className="editor-clip secondary">Text</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  opacity: 0.85,
                }}
              >
                Order (top → bottom): <strong>V1</strong> video,{" "}
                <strong>A1</strong> audio, <strong>O1</strong> overlay,
                <strong> O2</strong> overlay, <strong>T1</strong> text. Dragging
                a video from the Media Pool will (in the real editor) place its
                video on V1 and its audio on A1, while overlays and titles live
                on O1/O2/T1 above the main video.
              </div>
            </div>
          </div>

          {/* RIGHT: Inspector with arrow buttons + text tools */}
          <div className="editor-panel editor-panel-right">
            <div className="editor-panel-title">Inspector</div>
            <div className="editor-inspector-section">
              Transform controls are live-linked to the preview.
              <br />
              Adjust Zoom / Rotation / Position — the monitor updates instantly.
            </div>

            {/* Clip name */}
            <div style={{ marginTop: 6 }}>
              <div className="editor-label">Selected clip name (mock)</div>
              <input
                className="editor-input"
                value={clipName}
                onChange={(e) => setClipName(e.target.value)}
              />
            </div>

            {/* Zoom / Rotation */}
            <div className="inspector-grid-2">
              <div className="inspector-row">
                <div className="editor-label">Zoom</div>
                <div className="inspector-control">
                  <input
                    className="editor-input inspector-input-numeric"
                    value={format(zoom, 3)}
                    onChange={(e) => setZoom(parse(e.target.value, zoom))}
                  />
                  <div className="inspector-arrows">
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setZoom((z) => parseFloat(format(z + 0.1, 3)))
                      }
                    >
                      ▲
                    </button>
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setZoom((z) => parseFloat(format(z - 0.1, 3)))
                      }
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="inspector-row">
                <div className="editor-label">Rotation (deg)</div>
                <div className="inspector-control">
                  <input
                    className="editor-input inspector-input-numeric"
                    value={format(rotation, 1)}
                    onChange={(e) =>
                      setRotation(parse(e.target.value, rotation))
                    }
                  />
                  <div className="inspector-arrows">
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setRotation((r) => parseFloat(format(r + 1, 1)))
                      }
                    >
                      ▲
                    </button>
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setRotation((r) => parseFloat(format(r - 1, 1)))
                      }
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Position X / Y */}
            <div className="inspector-grid-2">
              <div className="inspector-row">
                <div className="editor-label">Position X</div>
                <div className="inspector-control">
                  <input
                    className="editor-input inspector-input-numeric"
                    value={format(posX, 3)}
                    onChange={(e) => setPosX(parse(e.target.value, posX))}
                  />
                  <div className="inspector-arrows">
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setPosX((x) => parseFloat(format(x + 0.1, 3)))
                      }
                    >
                      ▲
                    </button>
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setPosX((x) => parseFloat(format(x - 0.1, 3)))
                      }
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="inspector-row">
                <div className="editor-label">Position Y</div>
                <div className="inspector-control">
                  <input
                    className="editor-input inspector-input-numeric"
                    value={format(posY, 3)}
                    onChange={(e) => setPosY(parse(e.target.value, posY))}
                  />
                  <div className="inspector-arrows">
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setPosY((y) => parseFloat(format(y + 0.1, 3)))
                      }
                    >
                      ▲
                    </button>
                    <button
                      className="inspector-arrow-btn"
                      onClick={() =>
                        setPosY((y) => parseFloat(format(y - 0.1, 3)))
                      }
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Text tools for the Text timeline */}
            <div
              style={{
                marginTop: 10,
                paddingTop: 8,
                borderTop: "1px solid rgba(255,215,0,0.35)",
              }}
            >
              <div className="editor-panel-title">Text tools (T1)</div>

              <div className="inspector-row">
                <div className="editor-label">Text content</div>
                <input
                  className="editor-input"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>

              <div className="inspector-grid-2">
                <div className="inspector-row">
                  <div className="editor-label">Font</div>
                  <select
                    className="editor-input"
                    value={textFont}
                    onChange={(e) =>
                      setTextFont(e.target.value as TextFont)
                    }
                  >
                    <option value="system">System UI (default)</option>
                    <option value="serif">Serif</option>
                    <option value="mono">Mono</option>
                  </select>
                </div>
                <div className="inspector-row">
                  <div className="editor-label">Size</div>
                  <select
                    className="editor-input"
                    value={textSize}
                    onChange={(e) =>
                      setTextSize(e.target.value as TextSize)
                    }
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              <div className="inspector-row" style={{ marginTop: 6 }}>
                <div className="editor-label">Color</div>
                <select
                  className="editor-input"
                  value={textColor}
                  onChange={(e) =>
                    setTextColor(e.target.value as TextColor)
                  }
                >
                  <option value="white">White</option>
                  <option value="gold">Gold</option>
                  <option value="burgundy">Burgundy</option>
                </select>
              </div>

              <button
                className="editor-pill-btn"
                style={{
                  width: "100%",
                  marginTop: 8,
                  justifyContent: "center",
                }}
                onClick={() =>
                  alert(
                    "In the full editor, this would create a text clip on the T1 timeline over your video. The preview already shows how it will look."
                  )
                }
              >
                Add text clip to T1 (mock)
              </button>
            </div>

            <button
              className="editor-pill-btn"
              style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
              onClick={() => {
                setZoom(1.0);
                setRotation(0.0);
                setPosX(0.0);
                setPosY(0.0);
                alert("Reset transform (mock). Preview reset too.");
              }}
            >
              Reset transform (mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
