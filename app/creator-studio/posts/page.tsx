// app/creator-studio/posts/page.tsx
"use client";

import SocialFeed from "../../_components/social/SocialFeed";
import PostComposer from "../../_components/social/PostComposer";

export default function PostsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#7B0F24",
        color: "#FFF9F0",
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#FFD700",
          marginBottom: 16,
        }}
      >
        Posts (Social)
      </h1>

      <p style={{ marginBottom: 24, opacity: 0.85 }}>
        Create posts for your channel’s social feed. Your viewers will see these
        on your channel home page and in their Integrity Streaming feed.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 24,
        }}
      >
        {/* Left: Composer */}
        <PostComposer />

        {/* Right: Preview feed */}
        <SocialFeed variant="studio" />
      </div>
    </div>
  );
}
