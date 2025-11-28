// app/creator-studio/content/[id]/details/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function VideoDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params?.id as string;

  const [title, setTitle] = useState("Example video title");
  const [description, setDescription] = useState(
    "This is a sample description for the Integrity Streaming video."
  );
  const [tags, setTags] = useState("integrity, streaming, sample");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [category, setCategory] = useState("Education");

  const handleSave = () => {
    alert("Video details saved (mock).");
  };

  const handleCancel = () => {
    router.back();
  };

  const handleBackToLibrary = () => {
    router.push("/creator-studio/library");
  };

  const handleOpenEditor = () => {
    router.push(`/creator-studio/editor?projectId=${videoId}`);
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
        .details-shell {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .details-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .details-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .details-top-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .details-top-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .details-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .details-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .details-subtitle {
          font-size: 12px;
          opacity: 0.9;
          font-weight: 700;
        }

        .details-form-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 24px;
        }

        .details-card {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .details-label {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .details-input,
        .details-textarea,
        .details-select {
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

        .details-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .details-input:focus,
        .details-textarea:focus,
        .details-select:focus {
          outline: 2px solid ${GOLD};
          outline-offset: 1px;
        }

        .details-thumb-preview {
          width: 100%;
          border-radius: 12px;
          aspect-ratio: 16 / 9;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.22),
            rgba(255, 249, 240, 0.06)
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .details-thumb-frame {
          width: 92%;
          height: 85%;
          border-radius: 10px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          padding: 6px;
          box-sizing: border-box;
        }

        .details-thumb-caption {
          margin-top: 8px;
          font-size: 11px;
          opacity: 0.85;
          font-weight: 700;
        }

        .details-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          flex-wrap: wrap;
        }

        .details-btn {
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
        }

        .details-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        @media (max-width: 900px) {
          .details-form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .details-shell {
            gap: 20px;
          }
          .details-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="details-shell">
        {/* Top nav / breadcrumbs */}
        <div className="details-top-bar">
          <div className="details-top-left">
            <button
              className="details-top-btn"
              onClick={handleBackToLibrary}
            >
              ← Back to Content Library
            </button>
            <span>Video details • ID: {videoId || "unknown"}</span>
          </div>
          <button
            className="details-top-btn details-top-btn-primary"
            onClick={handleOpenEditor}
          >
            Open Editor
          </button>
        </div>

        {/* Header */}
        <div className="details-header-row">
          <div>
            <div className="details-title">Video details</div>
            <div className="details-subtitle">
              UI-only metadata editor for this video.
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="details-form-grid">
          {/* Left: main metadata */}
          <div className="details-card">
            <div>
              <div className="details-label">Title</div>
              <input
                className="details-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <div className="details-label">Description</div>
              <textarea
                className="details-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="details-label">Tags (comma separated)</div>
              <input
                className="details-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* Right: visibility, category, thumbnail preview */}
          <div className="details-card">
            <div>
              <div className="details-label">Visibility</div>
              <select
                className="details-select"
                value={visibility}
                onChange={(e) =>
                  setVisibility(e.target.value as "public" | "unlisted" | "private")
                }
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <div className="details-label">Category</div>
              <select
                className="details-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="News & Politics">News &amp; Politics</option>
                <option value="People & Blogs">People &amp; Blogs</option>
              </select>
            </div>

            <div>
              <div className="details-label">Thumbnail</div>
              <div className="details-thumb-preview">
                <div className="details-thumb-frame">
                  Thumbnail preview placeholder
                  <br />
                  (UI only)
                </div>
              </div>
              <div className="details-thumb-caption">
                Thumbnail picker will be wired up later or to your AI thumbnail tool.
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="details-actions-row">
          <button className="details-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="details-btn details-btn-primary"
            onClick={handleSave}
          >
            Save changes (mock)
          </button>
        </div>
      </div>
    </div>
  );
}
