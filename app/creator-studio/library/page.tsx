// app/creator-studio/library/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type Kind = "video" | "short";
type Status = "draft" | "published" | "scheduled";

type LibraryItem = {
  id: string;
  title: string;
  kind: Kind;
  status: Status;
  viewsLabel: string;
  whenLabel: string;
};

const MOCK_ITEMS: LibraryItem[] = [
  {
    id: "v1",
    title: "Integrity Streaming Episode 1",
    kind: "video",
    status: "published",
    viewsLabel: "1.2K views",
    whenLabel: "6 days ago",
  },
  {
    id: "v2",
    title: "Integrity Streaming Episode 2",
    kind: "video",
    status: "draft",
    viewsLabel: "—",
    whenLabel: "Draft",
  },
  {
    id: "s1",
    title: "Channel Trailer Short",
    kind: "short",
    status: "published",
    viewsLabel: "9.8K views",
    whenLabel: "2 days ago",
  },
  {
    id: "s2",
    title: "Quick Tip: Upload Flow",
    kind: "short",
    status: "scheduled",
    viewsLabel: "Scheduled",
    whenLabel: "Tomorrow",
  },
];

export default function ContentLibraryPage() {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>("video");
  const [status, setStatus] = useState<Status>("published");

  const filteredItems = useMemo(
    () => MOCK_ITEMS.filter((item) => item.kind === kind && item.status === status),
    [kind, status]
  );

  return (
    <div
      className="library-root"
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
        .library-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .library-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .library-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .library-top-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .library-top-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .library-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .library-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .library-toggle-group {
          display: inline-flex;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          overflow: hidden;
        }

        .library-toggle-btn {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
          color: ${IVORY};
          white-space: nowrap;
        }

        .library-toggle-btn.active {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .library-tabs-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .library-tab-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .library-tab-btn.active {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .library-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .library-card {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.35);
        }

        .library-thumb {
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.2),
            rgba(255, 249, 240, 0.06)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .library-thumb.video {
          aspect-ratio: 16 / 9;
        }

        .library-thumb.short {
          aspect-ratio: 9 / 16;
        }

        .library-thumb-inner-frame {
          width: 92%;
          height: 86%;
          border-radius: 10px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          text-align: center;
          padding: 4px;
          box-sizing: border-box;
        }

        .library-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          opacity: 0.9;
        }

        .library-title-text {
          font-weight: 700;
          font-size: 13px;
        }

        .library-buttons-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
          align-items: center;
        }

        .library-action-btn {
          width: 100%;
          max-width: 220px;
          padding: 8px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
        }

        .library-action-btn.primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        @media (max-width: 1024px) {
          .library-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .library-root {
            padding: 16px;
          }

          .library-top-bar {
            align-items: flex-start;
          }

          .library-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .library-grid {
            grid-template-columns: 1fr;
          }

          .library-title {
            font-size: 20px;
          }

          .library-action-btn {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Top bar / breadcrumbs */}
      <div className="library-top-bar">
        <div className="library-top-left">
          <button
            className="library-top-btn"
            onClick={() => router.push("/creator-studio")}
          >
            ← Back to Creator Studio
          </button>
          <span>Content Library</span>
        </div>
        <button
          className="library-top-btn library-top-btn-primary"
          onClick={() => router.push("/creator-studio/projects")}
        >
          Go to Projects
        </button>
      </div>

      {/* Header row */}
      <div className="library-header-row">
        <div className="library-title">Content Library</div>
        <div className="library-toggle-group">
          <button
            className={`library-toggle-btn ${kind === "video" ? "active" : ""}`}
            onClick={() => setKind("video")}
          >
            Videos
          </button>
          <button
            className={`library-toggle-btn ${kind === "short" ? "active" : ""}`}
            onClick={() => setKind("short")}
          >
            Shorts
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="library-tabs-row">
        <button
          className={`library-tab-btn ${status === "draft" ? "active" : ""}`}
          onClick={() => setStatus("draft")}
        >
          Draft
        </button>
        <button
          className={`library-tab-btn ${status === "published" ? "active" : ""}`}
          onClick={() => setStatus("published")}
        >
          Published
        </button>
        <button
          className={`library-tab-btn ${status === "scheduled" ? "active" : ""}`}
          onClick={() => setStatus("scheduled")}
        >
          Scheduled
        </button>
      </div>

      {/* Grid */}
      <div className="library-grid">
        {filteredItems.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              opacity: 0.8,
              fontSize: 14,
              fontWeight: 600,
              padding: 32,
              borderRadius: 16,
              border: `1px dashed ${GOLD}`,
            }}
          >
            No items yet in this view.
            <br />
            <span style={{ fontSize: 12 }}>
              Try switching status or kind to see other content.
            </span>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="library-card">
              {/* Thumbnail */}
              <div
                className={`library-thumb ${
                  item.kind === "video" ? "video" : "short"
                }`}
              >
                <div className="library-thumb-inner-frame">
                  {item.kind === "video"
                    ? "16:9 Video Placeholder"
                    : "9:16 Short Placeholder"}
                </div>
              </div>

              {/* Meta */}
              <div>
                <div className="library-title-text">{item.title}</div>
                <div className="library-meta-row">
                  <span style={{ fontWeight: 700 }}>{item.viewsLabel}</span>
                  <span>{item.whenLabel}</span>
                </div>
              </div>

              {/* Centered action buttons */}
              <div className="library-buttons-column">
                <button
                  className="library-action-btn primary"
                  onClick={() =>
                    router.push(`/creator-studio/content/${item.id}/details`)
                  }
                >
                  Edit video details
                </button>
                <button
                  className="library-action-btn"
                  onClick={() =>
                    router.push(`/creator-studio/editor?projectId=${item.id}`)
                  }
                >
                  Open in editor
                </button>
                <button
                  className="library-action-btn"
                  onClick={() =>
                    router.push(
                      `/creator-studio/content/${item.id}/analytics`
                    )
                  }
                >
                  View performance (mock)
                </button>
                <button
                  className="library-action-btn"
                  onClick={() => router.push(`/watch/${item.id}`)}
                >
                  Open watch page (mock)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
