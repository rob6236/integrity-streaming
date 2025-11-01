"use client";

import { useMemo, useState } from "react";
import type { Post } from "./ComposerCard";

const gold = "#FFD700";

export default function FeedItem({ post, onDelete }: { post: Post; onDelete: () => void }) {
  const [liked, setLiked] = useState(false);
  const createdLabel = useMemo(() => {
    const d = new Date(post.createdAt);
    return d.toLocaleString();
  }, [post.createdAt]);

  const like = () => setLiked((v) => !v);

  return (
    <article className="rounded-xl p-3 border" style={{ borderColor: gold }}>
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-80">{createdLabel}{post.scheduledFor ? " • scheduled" : ""}</div>
        <button className="rounded px-3 py-1 border" style={{ borderColor: gold }} onClick={onDelete}>
          Delete
        </button>
      </div>

      <div className="mt-2 whitespace-pre-wrap">{post.text}</div>

      {post.media && (
        <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: gold }}>
          {post.media.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.media.url} alt="post media" className="w-full max-h-[420px] object-contain bg-black/50" />
          ) : (
            <video src={post.media.url} controls className="w-full max-h-[420px] object-contain bg-black/50" />
          )}
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 text-sm">
        <button onClick={like} className="rounded px-3 py-1 border" style={{ borderColor: gold }}>
          {liked ? "♥ Liked" : "♡ Like"}
        </button>
        <span className="opacity-80">Comments {post.stats.comments}</span>
        <span className="opacity-80">Reposts {post.stats.reposts}</span>
        <span className="opacity-80 ml-auto">Impressions {post.stats.impressions}</span>
      </div>
    </article>
  );
}
