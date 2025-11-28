// app/watch/[id]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Mock data – in the future you can map this to real content
  const title = "Integrity Streaming — Sample Watch Page";
  const viewsLabel = "12,340 views";
  const whenLabel = "3 days ago";
  const creatorName = "Integrity Streaming Channel";

  const handleMock = (label: string) => {
    alert(`${label} clicked (mock only).`);
  };

  const handleBackToLibrary = () => {
    router.push("/creator-studio/library");
  };

  return (
    <div
      className="watch-root"
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
        .watch-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .watch-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .watch-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .watch-top-link-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .watch-top-link-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .watch-layout {
          display: grid;
          grid-template-columns: 2.2fr 1.1fr;
          gap: 24px;
        }

        .watch-player-card {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .watch-player-frame {
          width: 100%;
          border-radius: 14px;
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

        .watch-player-inner {
          width: 92%;
          height: 86%;
          border-radius: 12px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          padding: 8px;
          box-sizing: border-box;
        }

        .watch-title {
          font-size: 18px;
          font-weight: 700;
        }

        .watch-meta-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
          flex-wrap: wrap;
        }

        .watch-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }

        .watch-action-btn {
          padding: 8px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .watch-action-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .watch-description-card {
          background: rgba(0, 0, 0, 0.30);
          border-radius: 18px;
          padding: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          font-size: 12px;
          font-weight: 700;
          opacity: 0.92;
        }

        .watch-description-heading {
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 11px;
        }

        .watch-description-body {
          white-space: pre-wrap;
        }

        .watch-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .watch-creator-card {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 18px;
          padding: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 12px;
        }

        .watch-creator-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .watch-avatar {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.4);
        }

        .watch-creator-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .watch-creator-name {
          font-size: 13px;
          font-weight: 700;
        }

        .watch-creator-subs {
          font-size: 11px;
          font-weight: 700;
          opacity: 0.85;
        }

        .watch-sub-btn {
          margin-top: 4px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: ${GOLD};
          color: ${BURGUNDY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          align-self: flex-start;
        }

        .watch-meta-chip-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .watch-meta-chip {
          padding: 3px 9px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
        }

        .watch-comments-card {
          background: rgba(0, 0, 0, 0.30);
          border-radius: 18px;
          padding: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 12px;
        }

        .watch-comments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .watch-comments-title {
          font-size: 13px;
          font-weight: 700;
        }

        .watch-comment-pseudo {
          padding: 8px 10px;
          border-radius: 12px;
          background: rgba(0,0,0,0.55);
          font-size: 11px;
          font-weight: 700;
          opacity: 0.95;
        }

        .watch-comments-footer {
          font-size: 11px;
          font-weight: 700;
          opacity: 0.85;
        }

        @media (max-width: 960px) {
          .watch-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .watch-root {
            padding: 16px;
          }
          .watch-title {
            font-size: 16px;
          }
        }
      `}</style>

      {/* Top bar: back to creator tools */}
      <div className="watch-top-bar">
        <div className="watch-top-left">
          <button
            className="watch-top-link-btn"
            onClick={handleBackToLibrary}
          >
            ← Back to Content Library
          </button>
          <span>Watch experience (mock) • ID: {id || "unknown"}</span>
        </div>
        <button
          className="watch-top-link-btn watch-top-link-btn-primary"
          onClick={() => router.push("/creator-studio")}
        >
          Open Creator Studio
        </button>
      </div>

      {/* Main layout */}
      <div className="watch-layout">
        {/* Left: player + description */}
        <div>
          <div className="watch-player-card">
            <div className="watch-player-frame">
              <div className="watch-player-inner">
                Video player placeholder
                <br />
                (UI only, no actual playback yet)
              </div>
            </div>

            <div className="watch-title">{title}</div>

            <div className="watch-meta-row">
              <span>{viewsLabel}</span>
              <span>{whenLabel}</span>
            </div>

            <div className="watch-actions-row">
              <button
                className="watch-action-btn"
                onClick={() => handleMock("Like")}
              >
                👍 Like (mock)
              </button>
              <button
                className="watch-action-btn"
                onClick={() => handleMock("Dislike")}
              >
                👎 Dislike (mock)
              </button>
              <button
                className="watch-action-btn"
                onClick={() => handleMock("Share")}
              >
                ⤴ Share (mock)
              </button>
              <button
                className="watch-action-btn watch-action-btn-primary"
                onClick={() => handleMock("Save")}
              >
                Save to playlist (mock)
              </button>
            </div>
          </div>

          <div className="watch-description-card">
            <div className="watch-description-heading">Description</div>
            <div className="watch-description-body">
              This is a mock description for the Integrity Streaming watch page.
              {"\n\n"}
              In the real platform, this will show the creator&apos;s full video
              description, links, and any additional metadata.
            </div>
          </div>
        </div>

        {/* Right: creator + comments preview */}
        <div className="watch-sidebar">
          <div className="watch-creator-card">
            <div className="watch-creator-row">
              <div className="watch-avatar">IS</div>
              <div className="watch-creator-meta">
                <div className="watch-creator-name">{creatorName}</div>
                <div className="watch-creator-subs">23.4K subscribers (mock)</div>
              </div>
            </div>
            <button
              className="watch-sub-btn"
              onClick={() => handleMock("Subscribe")}
            >
              Subscribe (mock)
            </button>
            <div className="watch-meta-chip-row">
              <div className="watch-meta-chip">Integrity-focused</div>
              <div className="watch-meta-chip">Ad-safe</div>
              <div className="watch-meta-chip">Mock data</div>
            </div>
          </div>

          <div className="watch-comments-card">
            <div className="watch-comments-header">
              <div className="watch-comments-title">Comments (mock)</div>
              <button
                className="watch-top-link-btn"
                onClick={() => handleMock("Open comments manager")}
              >
                Open comments manager
              </button>
            </div>

            <div className="watch-comment-pseudo">
              Viewer123: “Loving the Integrity Streaming concept. Excited to see
              real videos here soon!”
            </div>
            <div className="watch-comment-pseudo">
              CreatorReply: “Appreciate the support! This comment thread is a
              UI-only preview for now.”
            </div>

            <div className="watch-comments-footer">
              Comments and moderation will be wired to the real Inbox/Comments
              tools later.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
