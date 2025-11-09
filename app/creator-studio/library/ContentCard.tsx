"use client";

import Link from "next/link";
import React from "react";

type Kind = "video" | "short";

export type ContentCardProps = {
  id: string;
  title: string;
  viewsLabel: string; // e.g., "12K views"
  whenLabel: string;  // e.g., "6 days ago"
  kind: Kind;
  href?: string;      // if omitted we build one automatically
};

const GOLD = "#FFD700";

/**
 * ContentCard
 * - Videos: 16:9 media box
 * - Shorts:  9:16 media box
 * - Gold outline, rounded corners, brand colors
 */
export default function ContentCard({
  id,
  title,
  viewsLabel,
  whenLabel,
  kind,
  href,
}: ContentCardProps) {
  const aspect = kind === "video" ? "16 / 9" : "9 / 16";
  const finalHref = href ?? `/creator-studio/content/${id}?kind=${kind}`;

  const Card = (
    <article
      className="rounded-xl"
      style={{
        border: `2px solid ${GOLD}`,
        background: "rgba(0,0,0,0.15)",
        color: "#fff",
        padding: "18px",
      }}
    >
      {/* Media box with fixed aspect ratio */}
      <div
        className="rounded-lg grid place-items-center"
        style={{
          border: `2px solid ${GOLD}`,
          background: "rgba(0,0,0,0.25)",
          aspectRatio: aspect,
          width: "100%",
        }}
      >
        {/* Play triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "18px solid #fff",
            borderTop: "12px solid transparent",
            borderBottom: "12px solid transparent",
            filter:
              "drop-shadow(0 1px 0 rgba(0,0,0,0.25)) drop-shadow(0 0 1px rgba(0,0,0,0.25))",
          }}
          aria-hidden
        />
      </div>

      {/* Metadata */}
      <div style={{ marginTop: 10 }}>
        <h3
          style={{
            fontWeight: 800,
            fontSize: 18,
            margin: 0,
            lineHeight: 1.15,
            color: "#fff",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {viewsLabel} • {whenLabel}
        </div>
      </div>
    </article>
  );

  return (
    <Link href={finalHref} aria-label={`${kind} ${title}`} prefetch={false}>
      {Card}
    </Link>
  );
}
