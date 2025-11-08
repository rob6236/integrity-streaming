// app/creator-studio/content/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type VideoItem = {
  id: string;
  title: string;
  views?: string;
  uploaded?: string;
};

const MOCK_DB: Record<string, VideoItem> = {
  v1: { id: "v1", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  v2: { id: "v2", title: "Video Title", views: "12K views", uploaded: "6 days ago" },
  s1: { id: "s1", title: "Shorts Title", views: "12K views", uploaded: "5 days ago" },
  // extend as needed
};

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  // Next 14+ passes params via server props in app router. But for client interactions we keep it simple.
  const id = params?.id ?? "v1"; // fallback
  const video = MOCK_DB[id] ?? { id, title: "Unknown video" };
  const [showEmbed, setShowEmbed] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function onEdit() {
    // TODO: navigate to editor for this video
    alert("Edit — open editor for " + id);
  }
  function onShare() {
    setShowShare(true);
  }
  function onEmbed() {
    setShowEmbed(true);
  }
  function onAnalytics() {
    alert("Analytics — open analytics panel for " + id);
  }
  function onDelete() {
    if (!confirm("Delete this video? This is irreversible in mock mode.")) return;
    setDeleted(true);
  }

  if (deleted) {
    return (
      <div className="min-h-screen bg-burgundy text-white p-12">
        <div className="max-w-4xl mx-auto border-2 border-gold p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Deleted</h2>
          <p className="mt-4">The video has been deleted (mock mode).</p>
          <Link href="/creator-studio/content-library" className="mt-6 inline-block px-4 py-2 border-2 border-gold">Back to library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-burgundy text-white p-6">
      <style>{`
        .bg-burgundy { background: #7B0F24; }
        .border-gold { border-color: #FFD700; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <header className="rounded-lg border-2 border-gold p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded p-1">
                <div className="w-full h-full bg-burgundy flex items-center justify-center text-white">logo</div>
              </div>
              <div className="text-gold text-2xl font-bold text-center">Integrity Streaming Creator Studio</div>
            </div>
            <div className="flex gap-3">
              <Link href="/home" className="px-4 py-2 border-2 border-gold rounded">Home</Link>
              <button className="px-4 py-2 border-2 border-gold rounded">Logout</button>
            </div>
          </div>
        </header>

        <h1 className="text-center text-5xl text-gold font-extrabold mb-6">{video.title}</h1>

        <div className="rounded-lg border-2 border-gold p-6 bg-burgundy-dark">
          {/* player mock */}
          <div className="w-full aspect-video bg-burgundy-darker rounded-md mb-6 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"></path></svg>
          </div>

          <div className="text-2xl font-semibold mb-4">{video.title}</div>

          <div className="flex gap-4 flex-wrap">
            <button onClick={onEdit} className="px-6 py-4 rounded-md border-2 border-gold flex items-center gap-3">
              <span>✏️</span> Edit
            </button>

            <button onClick={onShare} className="px-6 py-4 rounded-md border-2 border-gold flex items-center gap-3">
              <span>🔁</span> Share
            </button>

            <button onClick={onEmbed} className="px-6 py-4 rounded-md border-2 border-gold flex items-center gap-3">
              <span>{"</>"}</span> Embed
            </button>

            <button onClick={onAnalytics} className="px-6 py-4 rounded-md border-2 border-gold flex items-center gap-3">
              <span>📊</span> Analytics
            </button>

            <button onClick={onDelete} className="px-6 py-4 rounded-md border-2 border-gold flex items-center gap-3">
              <span>🗑️</span> Delete
            </button>
          </div>

          {/* Embed modal */}
          {showEmbed && (
            <div className="mt-6 bg-black/60 p-4 rounded">
              <div className="text-white">Embed code (mock):</div>
              <pre className="bg-[#2b0f12] p-3 rounded mt-2 text-sm">
{`<iframe src="https://integritystreaming.com/embed/${video.id}" width="560" height="315"></iframe>`}
              </pre>
              <div className="mt-2">
                <button onClick={() => setShowEmbed(false)} className="px-3 py-2 border-2 border-gold">Close</button>
              </div>
            </div>
          )}

          {/* Share modal */}
          {showShare && (
            <div className="mt-6 bg-black/60 p-4 rounded">
              <div>Share URL:</div>
              <div className="mt-2 text-gold">{`https://integritystreaming.com/watch/${video.id}`}</div>
              <div className="mt-3 flex gap-3">
                <button onClick={() => { navigator.clipboard?.writeText(`https://integritystreaming.com/watch/${video.id}`); alert("Copied"); }} className="px-3 py-2 border-2 border-gold">Copy</button>
                <button onClick={() => setShowShare(false)} className="px-3 py-2 border-2 border-gold">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
