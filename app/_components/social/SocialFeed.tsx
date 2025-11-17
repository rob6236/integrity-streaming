"use client";

import { useMemo, useState } from "react";

/** ---- Shared types for social posts ---- */
type Source = "X" | "Threads" | "YouTube" | "TikTok" | "Integrity";

export type SocialPost = {
  id: string;
  author: string;
  handle: string;
  source: Source;
  text: string;
  timestamp: string;
  media?: { type: "image" | "video" | "none" };
  stats: { likes: number; comments: number; shares: number };
  isFollowed?: boolean;
  // for future use:
  channelHandle?: string; // which channel this belongs to
};

type SocialFeedProps = {
  /** 
   * Where is this feed being shown?
   * - "home"      => global / following feed
   * - "channel"   => a single creator's channel
   * - "studio"    => creator studio preview
   */
  variant: "home" | "channel" | "studio";
  channelHandle?: string; // used when variant="channel"
};

/** ---- TEMP MOCK DATA (replace with Firebase later) ---- */
const MOCK_POSTS: SocialPost[] = [
  {
    id: "1",
    author: "Tech Truths",
    handle: "@techtruths",
    source: "X",
    text: "AI-assisted editing workflows: my 3-step setup that cut post time by 60%.",
    timestamp: "45 minutes ago",
    media: { type: "none" },
    stats: { likes: 1290, comments: 203, shares: 190 },
    isFollowed: true,
    channelHandle: "tech-truths",
  },
  {
    id: "2",
    author: "Mira VFX",
    handle: "@miravfx",
    source: "TikTok",
    text: "Quick LUT pack for low-light creators. Free download for 24h.",
    timestamp: "5 hours ago",
    media: { type: "image" },
    stats: { likes: 980, comments: 120, shares: 80 },
    isFollowed: false,
    channelHandle: "mira-vfx",
  },
  {
    id: "3",
    author: "Policy Daily",
    handle: "@policydaily",
    source: "Integrity",
    text: "Today’s Integrity Brief: 3 verified stories, no spin, just facts.",
    timestamp: "2 hours ago",
    media: { type: "none" },
    stats: { likes: 560, comments: 67, shares: 45 },
    isFollowed: true,
    channelHandle: "policy-daily",
  },
];

export function SocialFeed({ variant, channelHandle }: SocialFeedProps) {
  const [filter, setFilter] = useState<"trending" | "following">("trending");

  // For now this is all mock + simple filtering.
  const posts = useMemo(() => {
    let base = MOCK_POSTS;

    if (variant === "channel" && channelHandle) {
      base = base.filter((p) => p.channelHandle === channelHandle);
    }

    if (variant === "home") {
      if (filter === "following") {
        base = base.filter((p) => p.isFollowed);
      }
    }

    // studio variant just shows everything for now
    return base;
  }, [variant, channelHandle, filter]);

  const title =
    variant === "home"
      ? "Social Feeds"
      : variant === "channel"
      ? "Channel Social Feed"
      : "Social Feed Preview";

  return (
    <section
      style={{
        border: "2px solid #FFD700",
        borderRadius: 24,
        padding: 16,
        background: "#7B0F24",
        color: "#FFF9F0",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#FFD700" }}>
          {title}
        </h2>

        {variant !== "channel" && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setFilter("trending")}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border:
                  filter === "trending"
                    ? "2px solid #FFD700"
                    : "1px solid #FFD70055",
                background: filter === "trending" ? "#FFD700" : "#FFF9F0",
                color: filter === "trending" ? "#7B0F24" : "#7B0F24",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Trending
            </button>
            <button
              onClick={() => setFilter("following")}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border:
                  filter === "following"
                    ? "2px solid #FFD700"
                    : "1px solid #FFD70055",
                background: filter === "following" ? "#FFD700" : "#FFF9F0",
                color: filter === "following" ? "#7B0F24" : "#7B0F24",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Following
            </button>
          </div>
        )}
      </div>

      {/* Posts list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              border: "2px solid #FFD700",
              borderRadius: 20,
              padding: 12,
              background: "#7B0F24",
            }}
          >
            {/* Top row: avatar + name + source */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#FFD700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#7B0F24",
                    fontSize: 14,
                  }}
                >
                  {post.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 600 }}>{post.author}</span>
                  <span
                    style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}
                  >
                    {post.handle} · {post.timestamp}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 999,
                  border: "1px solid #FFD70066",
                  color: "#FFD700",
                }}
              >
                {post.source}
              </span>
            </div>

            {/* Text */}
            <p style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 8 }}>
              {post.text}
            </p>

            {/* Media placeholder */}
            {post.media && post.media.type !== "none" && (
              <div
                style={{
                  borderRadius: 16,
                  border: "1px dashed #FFD70088",
                  padding: 16,
                  marginBottom: 8,
                  textAlign: "center",
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                {post.media.type === "image"
                  ? "Image preview"
                  : "Video preview"}
              </div>
            )}

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              <span>🔥 {post.stats.likes.toLocaleString()}</span>
              <span>💬 {post.stats.comments.toLocaleString()}</span>
              <span>📤 {post.stats.shares.toLocaleString()}</span>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p style={{ fontSize: 14, opacity: 0.8 }}>
            No posts yet. When creators start posting, their social content will
            appear here.
          </p>
        )}
      </div>
    </section>
  );
}

export default SocialFeed;
