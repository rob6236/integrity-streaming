// app/_components/SocialFeeds.tsx
"use client";

import { useMemo, useState } from "react";

type Source = "X" | "Threads" | "YouTube" | "TikTok";
type Post = {
  id: string;
  author: string;
  handle: string;
  source: Source;
  text: string;
  timestamp: string;
  media?: { type: "image" | "none" };
  stats: { likes: number; comments: number; shares: number };
  isFollowed?: boolean;
};

const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    author: "Avery Johnson",
    handle: "@averycreates",
    source: "YouTube",
    text: "Dropped a deep-dive on creator revenue splits. TL;DR: Integrity Streaming is 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
    media: { type: "none" },
    stats: { likes: 421, comments: 58, shares: 22 },
    isFollowed: true,
  },
  {
    id: "p2",
    author: "Tech Truths",
    handle: "@techtruths",
    source: "X",
    text: "AI-assisted editing workflows: my 3-step setup that cut post time by 60%.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    media: { type: "none" },
    stats: { likes: 1290, comments: 203, shares: 190 },
  },
  {
    id: "p3",
    author: "Studio Sage",
    handle: "@studiosage",
    source: "Threads",
    text: "Designing channel pages with fewer distractions → better session time. Here's my layout.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    media: { type: "none" },
    stats: { likes: 342, comments: 41, shares: 17 },
    isFollowed: true,
  },
  {
    id: "p4",
    author: "Mira VFX",
    handle: "@miravfx",
    source: "TikTok",
    text: "Quick LUT pack for low-light creators. Free download for 24h.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    media: { type: "none" },
    stats: { likes: 996, comments: 87, shares: 112 },
  },
];

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (diff < 60) return rtf.format(-diff, "second");
  const m = Math.floor(diff / 60);
  if (m < 60) return rtf.format(-m, "minute");
  const h = Math.floor(m / 60);
  if (h < 24) return rtf.format(-h, "hour");
  const dys = Math.floor(h / 24);
  return rtf.format(-dys, "day");
}

function SourceBadge({ s }: { s: Source }) {
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-black/40 gold-outline">
      {s}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? "")
        .join(""),
    [name]
  );
  return (
    <div className="size-9 grid place-items-center rounded-full bg-white text-black font-bold gold-outline-2">
      {initials}
    </div>
  );
}

function FeedCard({ post }: { post: Post }) {
  return (
    <article className="rounded-xl bg-black/25 gold-outline transition p-3">
      <header className="flex items-center gap-3">
        <Avatar name={post.author} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold truncate">{post.author}</h3>
            <SourceBadge s={post.source} />
            {post.isFollowed && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[--color-gold] text-black gold-outline">
                Following
              </span>
            )}
          </div>
          <div className="text-xs text-white/70">
            {post.handle} • {timeAgo(post.timestamp)}
          </div>
        </div>
      </header>

      <p className="text-sm mt-3 whitespace-pre-wrap">{post.text}</p>

      {post.media?.type === "image" && (
        <div className="mt-3 aspect-video rounded-lg bg-black/40 gold-outline" />
      )}

      <footer className="mt-3 flex items-center gap-2 text-xs">
        <button className="rounded px-2 py-1 gold-outline gold-hover">
          👍 {post.stats.likes.toLocaleString()}
        </button>
        <button className="rounded px-2 py-1 gold-outline gold-hover">
          💬 {post.stats.comments.toLocaleString()}
        </button>
        <button className="rounded px-2 py-1 gold-outline gold-hover">
          ↻ {post.stats.shares.toLocaleString()}
        </button>
      </footer>
    </article>
  );
}

export default function SocialFeeds() {
  const [tab, setTab] = useState<"trending" | "following">("trending");

  const posts = useMemo(() => {
    if (tab === "following") return MOCK_POSTS.filter((p) => p.isFollowed);
    return [...MOCK_POSTS].sort(
      (a, b) =>
        b.stats.likes + b.stats.shares * 2 - (a.stats.likes + a.stats.shares * 2)
    );
  }, [tab]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Social Feeds</h2>
        <div className="inline-flex items-center gap-1 rounded-lg p-1 gold-outline bg-black/20">
          <button
            onClick={() => setTab("trending")}
            className={`px-3 py-1 rounded-md gold-outline ${
              tab === "trending" ? "bg-[--color-gold] text-black" : "gold-hover"
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setTab("following")}
            className={`px-3 py-1 rounded-md gold-outline ${
              tab === "following" ? "bg-[--color-gold] text-black" : "gold-hover"
            }`}
          >
            Following
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {posts.map((p) => (
          <FeedCard key={p.id} post={p} />
        ))}
      </div>

      <div className="pt-2">
        <button className="w-full rounded-lg px-3 py-2 gold-outline gold-hover">
          Load more
        </button>
      </div>
    </section>
  );
}