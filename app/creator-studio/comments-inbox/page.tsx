"use client";

import Link from "next/link";

export default function CommentsInboxPage() {
  const burgundy = "#7B0F24";
  const gold = "#FFD700";
  const ivory = "#FFF9F0";
  return (
    <div style={{ minHeight: "100vh", background: burgundy, color: ivory, padding: "24px 20px" }}>
      <header style={{ maxWidth: 1200, margin: "0 auto 16px" }}>
        <h1 style={{ margin: 0, color: gold, fontWeight: 800 }}>Comments / Inbox</h1>
        <nav style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <Link href="/creator-studio" style={{ color: gold }}>Dashboard</Link>
          <Link href="/creator-studio/library" style={{ color: gold }}>Content Library</Link>
        </nav>
      </header>
      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ border: `1px solid ${gold}66`, borderRadius: 14, padding: 20, background: "rgba(0,0,0,0.18)" }}>
          <p>Inbox placeholder. Unified comments, filters, and replies will appear here.</p>
        </div>
      </main>
    </div>
  );
}
