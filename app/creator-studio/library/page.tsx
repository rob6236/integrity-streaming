"use client";

import React from "react";
import ContentCard, { ContentCardProps } from "./ContentCard";

const GOLD = "#FFD700";

/** Mock data to visualize layout; swap for Firestore later */
const videos: ContentCardProps[] = [
  { id: "v1", title: "Video Title",  viewsLabel: "1.2K views", whenLabel: "6 days ago", kind: "video", href: "/creator-studio/content/v1?kind=video" },
  { id: "v2", title: "Video Title",  viewsLabel: "1.2K views", whenLabel: "6 days ago", kind: "video", href: "/creator-studio/content/v2?kind=video" },
  { id: "v3", title: "Video Title",  viewsLabel: "1.2K views", whenLabel: "6 days ago", kind: "video", href: "/creator-studio/content/v3?kind=video" },
  { id: "v4", title: "Video Title",  viewsLabel: "1.2K views", whenLabel: "6 days ago", kind: "video", href: "/creator-studio/content/v4?kind=video" },
  { id: "v5", title: "Video Title",  viewsLabel: "1.2K views", whenLabel: "6 days ago", kind: "video", href: "/creator-studio/content/v5?kind=video" },
];

const shorts: ContentCardProps[] = [
  { id: "s1", title: "Shorts Title", viewsLabel: "12K views", whenLabel: "3 days ago", kind: "short", href: "/creator-studio/content/s1?kind=short" },
  { id: "s2", title: "Shorts Title", viewsLabel: "12K views", whenLabel: "3 days ago", kind: "short", href: "/creator-studio/content/s2?kind=short" },
  { id: "s3", title: "Shorts Title", viewsLabel: "12K views", whenLabel: "3 days ago", kind: "short", href: "/creator-studio/content/s3?kind=short" },
  { id: "s4", title: "Shorts Title", viewsLabel: "12K views", whenLabel: "3 days ago", kind: "short", href: "/creator-studio/content/s4?kind=short" },
  { id: "s5", title: "Shorts Title", viewsLabel: "12K views", whenLabel: "3 days ago", kind: "short", href: "/creator-studio/content/s5?kind=short" },
];

export default function LibraryPage() {
  return (
    <div>
      <style>{`
        .sectionTitle {
          color: ${GOLD};
          font-size: 28px;
          font-weight: 900;
          font-style: italic;
          text-shadow:
            1px 1px 0 #4a0b16,
            2px 2px 0 #4a0b16,
            3px 3px 0 rgba(0,0,0,0.5);
        }
        .gridWrap {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 24px;
        }
        @media (max-width: 1280px) {
          .gridWrap { grid-template-columns: repeat(4, minmax(0,1fr)); }
        }
        @media (max-width: 1024px) {
          .gridWrap { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }
        @media (max-width: 768px) {
          .gridWrap { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
      `}</style>

      <section style={{ marginTop: 8 }}>
        <h2 className="sectionTitle">Videos</h2>
        <div className="gridWrap" style={{ marginTop: 16 }}>
          {videos.map((v) => (
            <ContentCard key={v.id} {...v} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 className="sectionTitle">Shorts</h2>
        <div className="gridWrap" style={{ marginTop: 16 }}>
          {shorts.map((s) => (
            <ContentCard key={s.id} {...s} />
          ))}
        </div>
      </section>
    </div>
  );
}
