// app/creator-studio/video-detail/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type Visibility = "public" | "unlisted" | "private";

export default function VideoDetailPage() {
  const router = useRouter();

  const [title, setTitle] = useState("Integrity Streaming — Episode 1");
  const [description, setDescription] = useState(
    "In this episode I walk through why Integrity Streaming exists and how the creator tools work."
  );
  const [tags, setTags] = useState("integrity streaming, creator tools, episode 1");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  function handleSaveDraft(e: FormEvent) {
    e.preventDefault();
    console.log("Save draft (UI only)", {
      title,
      description,
      tags,
      visibility,
      scheduleEnabled,
      scheduleDate,
      scheduleTime,
    });
    alert(
      "Draft saved (UI only).\n\nLater this will call your real backend to save metadata."
    );
  }

  function handlePublishNow() {
    console.log("Publish now (UI only)", {
      title,
      description,
      tags,
      visibility,
    });
    // Later this will trigger a real publish; for now we just show the success UI
    router.push("/creator-studio/publish/success");
  }

  function handleGenerateThumbnail() {
    alert(
      "AI thumbnail generation will live here.\n\nFor now it's a mock button with no backend."
    );
  }

  function handleOpenThumbnailDesigner() {
    alert("This would open your Thumbnail Designer tool.\n\nUI-only for now.");
  }

  function handleGenerateTagsAI() {
    // Mock AI behavior: just show how the flow will feel
    console.log("AI: Generate tags (UI only)", { title, description });
    setTags(
      "integrity streaming, creator tools, long-form video, episode 1, content creation, video editing"
    );
    alert(
      "AI would suggest tags based on your title and description.\n\nRight now this is a mock and just fills in example tags."
    );
  }

  return (
    <div className="vd-root">
      <style jsx>{`
        .vd-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .vd-shell {
          width: 100%;
          max-width: 1180px;
        }

        .vd-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .vd-title-block {
          min-width: 220px;
        }

        .vd-title {
          font-size: 30px;
          font-weight: 800;
          color: ${GOLD};
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
          margin-bottom: 2px;
        }

        .vd-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }

        .vd-header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .vd-header-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 8px 16px;
          background: transparent;
          color: ${IVORY};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .vd-header-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.8);
        }

        .vd-card-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1.6fr);
          gap: 16px;
        }

        .vd-card {
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 18px;
          border: 2px solid ${GOLD};
          padding: 16px 16px 14px;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.85);
        }

        .vd-card-title {
          font-size: 18px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 4px;
        }

        .vd-card-sub {
          font-size: 12px;
          opacity: 0.85;
          margin-bottom: 12px;
        }

        .vd-field {
          margin-bottom: 12px;
        }

        .vd-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .vd-label {
          font-size: 13px;
          font-weight: 700;
        }

        .vd-help {
          font-size: 11px;
          opacity: 0.8;
        }

        .vd-input,
        .vd-textarea {
          width: 100%;
          border-radius: 999px;
          border: 2px solid ${GOLD};
          background: ${BURGUNDY};
          color: ${IVORY};
          font-size: 13px;
          padding: 9px 12px;
          outline: none;
        }

        .vd-textarea {
          border-radius: 16px;
          resize: vertical;
          min-height: 90px;
          line-height: 1.4;
        }

        .vd-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
          font-size: 11px;
          opacity: 0.85;
        }

        .vd-chip {
          border-radius: 999px;
          padding: 3px 8px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.35);
        }

        /* Thumbnail block */
        .vd-thumb-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .vd-thumb-box {
          border-radius: 14px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #202020, #000);
          width: 220px;
          max-width: 100%;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .vd-thumb-play {
          width: 0;
          height: 0;
          border-left: 24px solid #fff;
          border-top: 16px solid transparent;
          border-bottom: 16px solid transparent;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.3))
            drop-shadow(0 0 2px rgba(0, 0, 0, 0.4));
        }

        .vd-thumb-pill {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-size: 10px;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .vd-thumb-caption {
          font-size: 11px;
          opacity: 0.85;
          margin-top: 4px;
        }

        .vd-thumb-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-width: 160px;
        }

        .vd-pill-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 9px 12px;
          background: transparent;
          color: ${IVORY};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          line-height: 1.2;
          white-space: normal; /* allow stacking text in buttons */
        }

        .vd-pill-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
        }

        /* Visibility + schedule */
        .vd-visibility-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .vd-vis-btn {
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.35);
          color: ${IVORY};
          white-space: nowrap;
        }

        .vd-vis-btn.active {
          background: ${GOLD};
          color: #2c020b;
          border-color: ${GOLD};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
        }

        .vd-schedule-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 10px;
        }

        .vd-schedule-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .vd-schedule-fields {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .vd-schedule-input {
          flex: 1 1 140px;
          border-radius: 999px;
          border: 2px solid ${GOLD};
          background: ${BURGUNDY};
          color: ${IVORY};
          font-size: 12px;
          padding: 7px 10px;
          outline: none;
        }

        .vd-footer-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .vd-footer-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
          white-space: nowrap;
        }

        .vd-footer-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.75);
        }

        .vd-footer-btn.secondary {
          border-color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 960px) {
          .vd-card-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 900px) {
          .vd-root {
            padding: 16px;
          }

          .vd-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .vd-header-actions {
            width: 100%;
          }

          .vd-header-btn,
          .vd-header-btn.primary {
            flex: 1 1 150px;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .vd-title {
            font-size: 24px;
          }

          .vd-thumb-box {
            width: 100%;
          }

          .vd-thumb-actions {
            width: 100%;
          }

          .vd-footer-actions {
            justify-content: center;
          }

          .vd-footer-btn {
            flex: 1 1 140px;
            text-align: center;
          }
        }
      `}</style>

      <div className="vd-shell">
        {/* Header */}
        <div className="vd-header-row">
          <div className="vd-title-block">
            <h1 className="vd-title">Video details</h1>
            <p className="vd-subtitle">
              Edit the title, description, tags, thumbnail, and visibility for this upload.
            </p>
          </div>

          <div className="vd-header-actions">
            <button
              type="button"
              className="vd-header-btn"
              onClick={() =>
                alert("This would discard unsaved changes and return to the library (mock).")
              }
            >
              Cancel
            </button>
            <button
              type="button"
              className="vd-header-btn primary"
              onClick={handlePublishNow}
            >
              Publish now (mock)
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveDraft}>
          <div className="vd-card-grid">
            {/* LEFT: basic info */}
            <div className="vd-card">
              <div className="vd-card-title">Basic info</div>
              <div className="vd-card-sub">
                These details help viewers find and understand your video across feeds and
                search.
              </div>

              {/* Title */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Title</span>
                  <span className="vd-help">Good titles are clear and specific.</span>
                </div>
                <input
                  className="vd-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
              </div>

              {/* Description */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Description</span>
                  <span className="vd-help">
                    Add context, links, and anything viewers should know.
                  </span>
                </div>
                <textarea
                  className="vd-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Tags + AI generate */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Tags</span>
                  <span className="vd-help">
                    Comma-separated. Helps with search and recommendations.
                  </span>
                </div>
                <input
                  className="vd-input"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <div className="vd-chip-row">
                  <span className="vd-chip">integrity streaming</span>
                  <span className="vd-chip">creator tools</span>
                  <span className="vd-chip">long-form</span>
                  <span className="vd-chip">episode 1</span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    className="vd-pill-btn primary"
                    onClick={handleGenerateTagsAI}
                  >
                    AI: Generate tags (mock)
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: thumbnail, visibility, schedule */}
            <div className="vd-card">
              <div className="vd-card-title">Thumbnail & Visibility</div>
              <div className="vd-card-sub">
                Choose how this video appears in feeds and when it becomes visible.
              </div>

              {/* Thumbnail block */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Thumbnail</span>
                  <span className="vd-help">You can update this any time.</span>
                </div>

                <div className="vd-thumb-wrapper">
                  <div className="vd-thumb-box">
                    <div className="vd-thumb-play" />
                    <span className="vd-thumb-pill">16:9 preview</span>
                  </div>

                  <div className="vd-thumb-actions">
                    <button
                      type="button"
                      className="vd-pill-btn"
                      onClick={handleOpenThumbnailDesigner}
                    >
                      Open Thumbnail Designer
                    </button>
                    <button
                      type="button"
                      className="vd-pill-btn primary"
                      onClick={handleGenerateThumbnail}
                    >
                      AI: Generate Thumbnail (mock)
                    </button>
                    <p className="vd-thumb-caption">
                      This is a UI preview only. Later this will show your actual thumbnail.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Visibility</span>
                  <span className="vd-help">
                    Choose who can see this when it&apos;s published or scheduled.
                  </span>
                </div>
                <div className="vd-visibility-row">
                  <button
                    type="button"
                    className={`vd-vis-btn ${
                      visibility === "public" ? "active" : ""
                    }`}
                    onClick={() => setVisibility("public")}
                  >
                    Public
                  </button>
                  <button
                    type="button"
                    className={`vd-vis-btn ${
                      visibility === "unlisted" ? "active" : ""
                    }`}
                    onClick={() => setVisibility("unlisted")}
                  >
                    Unlisted
                  </button>
                  <button
                    type="button"
                    className={`vd-vis-btn ${
                      visibility === "private" ? "active" : ""
                    }`}
                    onClick={() => setVisibility("private")}
                  >
                    Private
                  </button>
                </div>
              </div>

              {/* Schedule */}
              <div className="vd-field">
                <div className="vd-label-row">
                  <span className="vd-label">Schedule</span>
                  <span className="vd-help">
                    Optional – set a date and time if you want this to go live later.
                  </span>
                </div>

                <div className="vd-schedule-row">
                  <label className="vd-schedule-toggle">
                    <input
                      type="checkbox"
                      checked={scheduleEnabled}
                      onChange={(e) => setScheduleEnabled(e.target.checked)}
                    />
                    Enable scheduled publish
                  </label>

                  {scheduleEnabled && (
                    <div className="vd-schedule-fields">
                      <input
                        type="date"
                        className="vd-schedule-input"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                      <input
                        type="time"
                        className="vd-schedule-input"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Footer actions */}
              <div className="vd-footer-actions">
                <button
                  type="button"
                  className="vd-footer-btn secondary"
                  onClick={() =>
                    alert(
                      "This would move the video back to draft in your publishing pipeline (mock)."
                    )
                  }
                >
                  Move back to draft (mock)
                </button>
                <button type="submit" className="vd-footer-btn primary">
                  Save draft (UI only)
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
