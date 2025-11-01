"use client";

import Link from "next/link";

const gold = "#FFD700";

/**
 * Shows a creator's recent long-form videos and a quick link
 * to edit ad breaks for each one.
 */
export default function AdPlacementsManager() {
  // TODO: replace with Firestore query: videos owned by current user
  const videos = [
    { id: "v_abc", title: "How to color-grade in 10 minutes", duration: "14:21", eligible: true },
    { id: "v_def", title: "Street photography tips", duration: "22:04", eligible: true },
    { id: "v_ghi", title: "My desk setup tour", duration: "08:47", eligible: false },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>
        Ad Placements (Long-form)
      </h2>

      <div className="grid gap-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="rounded-xl p-3 border flex items-center justify-between"
            style={{ borderColor: gold, opacity: v.eligible ? 1 : 0.65 }}
          >
            <div className="min-w-0">
              <div className="font-medium truncate">{v.title}</div>
              <div className="text-sm opacity-80">
                Duration {v.duration} • {v.eligible ? "Eligible" : "Not eligible"}
              </div>
            </div>

            <Link
              href={`/creator-studio/monetization/ad-placements/${v.id}`}
              className="adbreak-link rounded px-3 py-2 border no-underline"
              style={{ borderColor: gold, pointerEvents: v.eligible ? "auto" : "none" }}
            >
              Edit Ad Breaks
            </Link>
          </div>
        ))}
      </div>

      <div className="text-sm opacity-80 mt-2">
        Eligibility: videos ≥ 8 minutes and monetization enabled.
      </div>

      {/* Force link color in all states */}
      <style jsx global>{`
        a.adbreak-link,
        a.adbreak-link:visited,
        a.adbreak-link:hover,
        a.adbreak-link:active,
        a.adbreak-link:focus {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
