// app/creator-studio/publish/success/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function PublishSuccessPage() {
  const router = useRouter();

  const handleBackToDetails = () => {
    // Later: pass along the specific video id
    router.push("/creator-studio/video-detail");
  };

  const handleGoToLibrary = () => {
    router.push("/creator-studio/library");
  };

  const handleGoToChannel = () => {
    // You can change this once your channel path is finalized
    router.push("/channel/my");
  };

  return (
    <div className="ps-root">
      <style jsx>{`
        .ps-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ps-shell {
          width: 100%;
          max-width: 720px;
          border-radius: 24px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #181818, #050505);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.9);
          padding: 20px 18px 18px;
          text-align: center;
        }

        .ps-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: rgba(0, 0, 0, 0.6);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
        }

        .ps-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #32d74b;
          box-shadow: 0 0 12px rgba(50, 215, 75, 0.7);
        }

        .ps-title {
          font-size: 28px;
          font-weight: 900;
          color: ${GOLD};
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
          margin-bottom: 6px;
        }

        .ps-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 16px;
        }

        .ps-preview-frame {
          margin: 0 auto 14px auto;
          border-radius: 18px;
          border: 2px solid ${GOLD};
          background: radial-gradient(circle at top, #262626, #000);
          width: 100%;
          max-width: 420px;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .ps-preview-play {
          width: 0;
          height: 0;
          border-left: 28px solid #fff;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.35))
            drop-shadow(0 0 2px rgba(0, 0, 0, 0.45));
        }

        .ps-preview-pill {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-size: 10px;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .ps-meta {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 16px;
        }

        .ps-meta-strong {
          font-weight: 700;
        }

        .ps-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 4px;
        }

        .ps-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
          text-decoration: none; /* make sure links are not blue/underlined */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1.2;
          white-space: normal; /* allow stacking text inside the button */
          min-width: 140px;
          text-align: center;
        }

        .ps-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.85);
        }

        .ps-btn.secondary {
          border-color: rgba(255, 255, 255, 0.5);
        }

        .ps-btn.ghost {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .ps-footer-note {
          margin-top: 12px;
          font-size: 11px;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .ps-root {
            padding: 16px;
          }

          .ps-shell {
            padding: 18px 14px 14px;
          }

          .ps-title {
            font-size: 22px;
          }

          .ps-actions {
            gap: 6px;
          }

          .ps-btn {
            flex: 1 1 150px;
          }
        }
      `}</style>

      <div className="ps-shell">
        <div className="ps-badge">
          <span className="ps-badge-dot" />
          <span>Publish complete (mock)</span>
        </div>

        <h1 className="ps-title">Your video is live on Integrity Streaming*</h1>
        <p className="ps-subtitle">
          This is a UI-only confirmation screen for now. Later, this will reflect the
          actual published video and real analytics.
        </p>

        <div className="ps-preview-frame">
          <div className="ps-preview-play" aria-hidden />
          <span className="ps-preview-pill">16:9 video · preview only</span>
        </div>

        <p className="ps-meta">
          <span className="ps-meta-strong">Title:</span> Integrity Streaming — Example
          Episode
          <br />
          <span className="ps-meta-strong">Visibility:</span> Public (mock)
          <br />
          <span className="ps-meta-strong">Destination:</span> Integrity Streaming videos
          (mock)
        </p>

        <div className="ps-actions">
          {/* Go to content library */}
          <button
            type="button"
            className="ps-btn primary"
            onClick={handleGoToLibrary}
          >
            Go to
            <br />
            content library
          </button>

          {/* View channel */}
          <button
            type="button"
            className="ps-btn secondary"
            onClick={handleGoToChannel}
          >
            View my
            <br />
            public channel (mock)
          </button>

          {/* Back to details */}
          <button
            type="button"
            className="ps-btn ghost"
            onClick={handleBackToDetails}
          >
            Back to
            <br />
            video details
          </button>
        </div>

        <p className="ps-footer-note">
          *No real video was published yet. Once your backend is wired up, this screen will
          show the actual URL, thumbnail, and live status.
        </p>
      </div>
    </div>
  );
}
