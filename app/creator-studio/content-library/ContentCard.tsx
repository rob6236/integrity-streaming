// app/creator-studio/content-library/page.tsx
"use client";

import React, { useState } from "react";
import ContentCard, { VideoItem } from "./ContentCard";
import Link from "next/link";

/* BRAND COLORS via simple CSS vars */
const BRAND = {
  burgundy: "#7B0F24",
  burgundyDark: "#5b0918",
  gold: "#FFD700",
};

const MOCK_VIDEOS: VideoItem[] = [
  { id: "v1", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  { id: "v2", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  { id: "v3", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  { id: "s1", title: "Shorts Title", isShort: true, views: "12K views", uploaded: "5 days ago" },
  { id: "v4", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  // add more mock items
];

export default function ContentLibraryPage() {
  const [videos] = useState<VideoItem[]>(MOCK_VIDEOS);

  const videosRow = videos.filter((v) => !v.isShort);
  const shortsRow = videos.filter((v) => v.isShort);

  return (
    <div className="min-h-screen pb-10" style={{ background: BRAND.burgundy }}>
      <style>{`
        :root {
          --burgundy: ${BRAND.burgundy};
          --burgundy-dark: ${BRAND.burgundyDark};
          --gold: ${BRAND.gold};
        }
        .bg-burgundy { background: var(--burgundy); }
        .bg-burgundy-dark { background: var(--burgundy-dark); }
        .bg-burgundy-darker { background: rgba(0,0,0,0.15); }
        .text-gold { color: var(--gold); }
        .border-gold { border-color: var(--gold); }
      `}</style>

      {/* HEADER */}
      <header className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="rounded-lg border-2 border-gold p-4 flex items-center justify-between" style={{ borderColor: BRAND.gold }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded p-2">
              {/* logo placeholder */}
              <div className="w-full h-full bg-burgundy flex items-center justify-center text-white">logo</div>
            </div>
            <div className="text-3xl font-extrabold text-gold text-center">
              Integrity Streaming<br/><span className="text-xl">Creator Studio</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/home" className="px-4 py-2 rounded-lg border-2 border-gold text-white">Home</Link>
            <button className="px-4 py-2 rounded-lg border-2 border-gold text-white">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 mt-6 grid grid-cols-12 gap-6">
        {/* LEFT NAV */}
        <aside className="col-span-2">
          <nav className="flex flex-col gap-4">
            {[
              "Dashboard",
              "Content Library",
              "Upload",
              "Editor",
              "Thumbnail Designer",
              "Captions",
              "Monetization",
              "Posts (Social)",
              "Comments / Inbox",
              "Settings",
              "Billing",
            ].map((label) => (
              <Link
                key={label}
                href={label === "Content Library" ? "/creator-studio/content-library" : "#"}
                className={`block rounded-lg py-3 px-4 border-2 text-left text-white`}
                style={{
                  borderColor: "#FFD700",
                  background: label === "Content Library" ? BRAND.gold : "transparent",
                  color: label === "Content Library" ? "#7B0F24" : "white",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN PANEL */}
        <section className="col-span-10">
          <h1 className="text-center text-gold text-4xl font-bold mb-8">Content Library</h1>

          {/* VIDEOS ROW */}
          <div className="mb-8">
            <h2 className="text-gold text-2xl font-bold mb-4">Videos</h2>
            <div className="flex overflow-x-auto py-2 px-2">
              {videosRow.map((v) => (
                <ContentCard key={v.id} video={v} />
              ))}
            </div>
          </div>

          {/* SHORTS ROW */}
          <div>
            <h2 className="text-gold text-2xl font-bold mb-4">Shorts</h2>
            <div className="flex overflow-x-auto py-2 px-2">
              {shortsRow.map((v) => (
                <ContentCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
