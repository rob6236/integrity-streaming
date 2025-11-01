"use client";

import { useMemo, useState } from "react";
import ComposerCard, { DraftPost, Post } from "./_components/ComposerCard";
import FeedItem from "./_components/FeedItem";
import PostInsightsPanel from "./_components/PostInsightsPanel";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

export default function PostsPage() {
  // In a later phase, load these from Firestore: posts/{uid}/items ordered by createdAt desc
  const [posts, setPosts] = useState<Post[]>([
    {
      id: crypto.randomUUID(),
      text: "Launching a new video tomorrow — color grading tricks you can do in 5 minutes.",
      media: null,
      createdAt: Date.now() - 1000 * 60 * 60 * 3,
      scheduledFor: null,
      stats: { likes: 42, comments: 9, reposts: 3, impressions: 2300, clickThroughs: 180 },
    },
    {
      id: crypto.randomUUID(),
      text: "What feature should I add to the Creator Studio next? 👀",
      media: null,
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      scheduledFor: null,
      stats: { likes: 76, comments: 25, reposts: 5, impressions: 6400, clickThroughs: 410 },
    },
  ]);

  const addPost = (draft: DraftPost) => {
    const p: Post = {
      id: crypto.randomUUID(),
      text: draft.text.trim(),
      media: draft.media || null,
      createdAt: draft.scheduledFor ? Date.now() : Date.now(), // now; schedule stored in scheduledFor
      scheduledFor: draft.scheduledFor || null,
      stats: { likes: 0, comments: 0, reposts: 0, impressions: 0, clickThroughs: 0 },
    };
    setPosts((prev) => [p, ...prev]);
  };

  const removePost = (id: string) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const totals = useMemo(() => {
    const imp = posts.reduce((a, p) => a + p.stats.impressions, 0);
    const likes = posts.reduce((a, p) => a + p.stats.likes, 0);
    const ctr =
      posts.reduce((a, p) => a + p.stats.clickThroughs, 0) /
      (imp || 1);
    return { impressions: imp, likes, ctr: ctr || 0 };
  }, [posts]);

  return (
    <main className="min-h-screen w-full" style={{ background: burgundy, color: white }}>
      <h1 className="sr-only">Integrity Streaming — Posts</h1>

      <header className="w-full border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: gold }}>
        <div className="text-lg font-semibold">
          Creator Studio / <span style={{ color: gold }}>Posts</span>
        </div>
        <div className="text-sm opacity-80">Write updates, schedule posts, and view performance.</div>
      </header>

      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Left column: Composer + Feed */}
        <section className="grid gap-5">
          <Card>
            <ComposerCard onSubmit={addPost} />
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Your Feed</h2>
            <div className="grid gap-3">
              {posts.length === 0 && <div className="text-sm opacity-80">No posts yet.</div>}
              {posts.map((p) => (
                <FeedItem key={p.id} post={p} onDelete={() => removePost(p.id)} />
              ))}
            </div>
          </Card>
        </section>

        {/* Right column: Insights */}
        <section>
          <Card>
            <PostInsightsPanel
              totalImpressions={totals.impressions}
              totalLikes={totals.likes}
              ctr={totals.ctr}
            />
          </Card>
        </section>
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ borderColor: gold }}>
      {children}
    </div>
  );
}
