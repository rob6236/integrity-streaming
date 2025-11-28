// app/creator-studio/render/confirm/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

export default function RenderConfirmPage() {
  const router = useRouter();

  const handleConfirm = () => {
    // Later this will actually send a render job.
    // For now, it's UI-only and just pretends to "queue" the render.
    alert(
      "This would send your current project settings to the render engine.\n\n" +
        "Right now it’s UI-only. Later this will create a real render job and track its status."
    );
    router.push("/creator-studio/render");
  };

  const handleCancel = () => {
    router.push("/creator-studio/render");
  };

  return (
    <div className="rc-root">
      <style jsx>{`
        .rc-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .rc-card {
          width: 100%;
          max-width: 640px;
          border-radius: 24px;
          border: 3px solid ${GOLD};
          background: radial-gradient(circle at top, #181818, #050505);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.9);
          padding: 22px 20px 20px;
        }

        .rc-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .rc-icon-ring {
          width: 54px;
          height: 54px;
          border-radius: 999px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 24px rgba(255, 215, 0, 0.3);
          flex-shrink: 0;
        }

        .rc-icon-inner {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          border: 2px solid ${GOLD};
          position: relative;
          box-sizing: border-box;
        }

        .rc-icon-inner::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: 2px solid ${GOLD};
        }

        .rc-title-block {
          min-width: 0;
        }

        .rc-title {
          font-size: 22px;
          font-weight: 800;
          color: ${GOLD};
          margin-bottom: 2px;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
        }

        .rc-subtitle {
          font-size: 13px;
          opacity: 0.9;
        }

        .rc-body {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 14px;
        }

        .rc-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .rc-pill {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          padding: 5px 10px;
          font-size: 11px;
          background: rgba(0, 0, 0, 0.5);
        }

        .rc-warning {
          font-size: 11px;
          opacity: 0.8;
          margin-bottom: 16px;
        }

        .rc-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .rc-btn {
          border-radius: 999px;
          border: 2px solid ${GOLD};
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          min-width: 140px;
        }

        .rc-btn.cancel {
          background: transparent;
          color: ${IVORY};
        }

        .rc-btn.primary {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.8);
        }

        .rc-btn.primary:hover {
          background: #ffe676;
        }

        .rc-btn.cancel:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        .rc-footnote {
          font-size: 11px;
          opacity: 0.75;
          margin-top: 10px;
        }

        @media (max-width: 600px) {
          .rc-card {
            padding: 18px 16px 18px;
          }

          .rc-header-row {
            align-items: flex-start;
          }

          .rc-title {
            font-size: 20px;
          }

          .rc-buttons {
            justify-content: center;
          }

          .rc-btn {
            flex: 1 1 140px;
            text-align: center;
          }
        }
      `}</style>

      <div className="rc-card">
        <div className="rc-header-row">
          <div className="rc-icon-ring" aria-hidden>
            <div className="rc-icon-inner" />
          </div>
          <div className="rc-title-block">
            <h1 className="rc-title">Save &amp; Send to Render?</h1>
            <p className="rc-subtitle">
              This step locks in your current timeline and settings and queues a render job.
            </p>
          </div>
        </div>

        <div className="rc-body">
          When you confirm, we’ll take the current project state from the editor (timeline,
          resolution, aspect, and output destination) and send it to your render engine.
          Later, this screen will also show a link to track the job status.
        </div>

        <div className="rc-pill-row">
          <span className="rc-pill">Timeline: Current edit version</span>
          <span className="rc-pill">Output: MP4 (mock)</span>
          <span className="rc-pill">Destination: Integrity Streaming</span>
        </div>

        <div className="rc-warning">
          <strong>Note:</strong> This is UI-only right now. No real render job is created yet.
          You can safely click either button without affecting any actual files.
        </div>

        <div className="rc-buttons">
          <button type="button" className="rc-btn cancel" onClick={handleCancel}>
            Cancel, go back
          </button>
          <button type="button" className="rc-btn primary" onClick={handleConfirm}>
            Yes, save &amp; send (mock)
          </button>
        </div>

        <div className="rc-footnote">
          Later this flow will: save the project, create a render job, and show a job link
          here. For now it’s a preview of the experience.
        </div>
      </div>
    </div>
  );
}
