// Server component so params/searchParams work directly (no "use client")
import React from "react";
import Link from "next/link";

const GOLD = "#FFD700";

export default function ContentDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { kind?: string };
}) {
  const { id } = params;
  const kind = (searchParams?.kind ?? "video").toLowerCase();
  const isShort = kind === "short";

  // Dynamic pieces
  const aspect = isShort ? "9 / 16" : "16 / 9";
  const displayTitle = isShort ? "Shorts Title" : "Video Title";
  const wrapClass = isShort ? "playerWrap short" : "playerWrap video";

  return (
    <div>
      <style>{`
        /* ---------- Page shell: center the content ---------- */
        .shell {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .title {
          color: ${GOLD};
          font-weight: 900;
          font-style: italic;
          font-size: 40px;
          line-height: 1.1;
          text-align: center;
          text-shadow:
            1px 1px 0 #4a0b16,
            2px 2px 0 #4a0b16,
            3px 3px 0 rgba(0,0,0,0.55);
          margin: 8px 0 16px 0;
        }

        /* ---------- Frame that holds player + buttons ---------- */
        .frame {
          border: 3px solid ${GOLD};
          border-radius: 16px;
          background: rgba(0,0,0,0.18);
          padding: 14px;
        }

        /* ---------- Player width caps (compact) ---------- */
        .playerWrap {
          width: 100%;
          margin: 0 auto;
        }
        .playerWrap.video { max-width: 720px; }
        .playerWrap.short { max-width: 300px; }

        .player {
          border: 3px solid ${GOLD};
          border-radius: 12px;
          background: rgba(0,0,0,0.25);
          width: 100%;
          aspect-ratio: ${aspect};
          display: grid;
          place-items: center;
        }

        .metaTitle {
          margin: 14px auto 12px auto;
          color: #fff;
          font-size: 20px;
          font-weight: 800;
          text-align: left;
          max-width: 720px;
        }
        .metaTitle.short { max-width: 300px; }

        /* ---------- ACTION BAR ---------- */
        .bar {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
          max-width: 720px;
          margin: 0 auto;
        }
        /* For shorts: only 2 columns so labels have room */
        .bar.short {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          max-width: 300px;
        }

        @media (max-width: 900px) {
          .bar { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .bar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .btn {
          border: 3px solid ${GOLD};
          border-radius: 14px;
          background: rgba(0,0,0,0.25);
          color: #fff;
          font-weight: 800;
          font-size: 15px;
          line-height: 1.1;
          padding: 12px 14px;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;        /* consistent button height */
          white-space: nowrap;     /* keep labels on one line */
          overflow: hidden;
          text-overflow: ellipsis; /* protect tiny widths */
        }
      `}</style>

      <div className="shell">
        <h1 className="title">{displayTitle}</h1>

        <div className="frame">
          {/* Player */}
          <div className={wrapClass}>
            <div className="player" aria-label={`${displayTitle} player`}>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "22px solid #fff",
                  borderTop: "16px solid transparent",
                  borderBottom: "16px solid transparent",
                  filter:
                    "drop-shadow(0 1px 0 rgba(0,0,0,0.25)) drop-shadow(0 0 1px rgba(0,0,0,0.25))",
                }}
                aria-hidden
              />
            </div>
          </div>

          <h2 className={`metaTitle ${isShort ? "short" : ""}`}>
            {displayTitle} (id: {id})
          </h2>

          <div className={`bar ${isShort ? "short" : ""}`}>
            <Link className="btn" href={`/creator-studio/editor?from=${id}`}>
              Edit
            </Link>
            <button className="btn">Share</button>
            <button className="btn">Embed</button>
            <Link className="btn" href={`/creator-studio/analytics?content=${id}`}>
              Analytics
            </Link>
            <button className="btn">Delete</button>
            <Link className="btn" href="/creator-studio/library">
              Done
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
