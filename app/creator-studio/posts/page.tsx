// app/creator-studio/posts/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const ivory = "#FFF9F0";

export default function PostsSocialPage() {
  const router = useRouter();
  const [postText, setPostText] = useState("");
  const [activeTab, setActiveTab] = useState<"trending" | "following">(
    "trending"
  );

  // 1) From Posts page → Meme Creator
  const handleCreateMeme = () => {
    if (typeof window !== "undefined") {
      // save any text so the creator doesn’t lose their draft
      window.localStorage.setItem("draftSocialPostText", postText || "");
    }
    router.push("/creator-studio/memes");
  };

  // 2) Placeholder Post action
  const handlePost = () => {
    alert(
      "This is a placeholder. Later, this will publish to your channel’s social feed."
    );
  };

  const trendingPosts = [
    {
      author: "Tech Truths",
      handle: "@techtruths",
      time: "45 minutes ago",
      text: "AI-assisted editing workflows: my 3-step setup that cut post time by 60%.",
      stats: ["🔥 1,290", "💬 203", "📊 190 shares"],
    },
    {
      author: "Mira VFX",
      handle: "@miravfx",
      time: "5 hours ago",
      text: "New breakdown is live: how I used Integrity Streaming's creator tools to launch a mini-series in one weekend.",
      stats: ["⭐ 842", "💬 97", "📊 11 shares"],
    },
  ];

  const followingPosts = [
    {
      author: "Channel Insider",
      handle: "@channelinsider",
      time: "10 minutes ago",
      text: "Just scheduled 7 shorts this week using Integrity Streaming’s Creator Studio.",
      stats: ["👍 312", "💬 44", "📊 9 shares"],
    },
    {
      author: "Edit Lab",
      handle: "@editlab",
      time: "2 hours ago",
      text: "Poll: Long-form vs shorts — what’s driving more subs for you this month?",
      stats: ["🗳️ 2,103 votes", "💬 156", "📊 21 shares"],
    },
  ];

  const visiblePosts = activeTab === "trending" ? trendingPosts : followingPosts;

  return (
    <>
      <style jsx>{`
        .social-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 56px;
          color: ${ivory};
        }

        .social-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .social-column {
          flex: 1;
          border: 1px solid ${gold}66;
          border-radius: 18px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.18);
        }

        .social-title {
          margin-top: 0;
          margin-bottom: 12px;
          color: ${gold};
          font-weight: 800;
          font-size: 24px;
        }

        .social-body {
          margin-top: 0;
          margin-bottom: 10px;
          opacity: 0.95;
          font-size: 14px;
        }

        .social-textarea {
          width: 100%;
          min-height: 160px;
          border-radius: 18px;
          border: 1px solid ${gold}66;
          padding: 12px 14px;
          background: ${burgundy};
          color: ${ivory};
          resize: vertical;
          outline: none;
          font-size: 14px;
        }

        .social-counter {
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.85;
        }

        /* ACTION BUTTONS (row on desktop/tablet) */
        .social-actions {
          margin-top: 16px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: flex-start;
        }

        .btn-pill {
          padding: 10px 22px;
          border-radius: 999px;
          border: 2px solid ${gold};
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .btn-outline {
          background: transparent;
          color: ${ivory};
        }

        .btn-solid {
          background: ${gold};
          color: #40040d;
        }

        /* FEED TABS */
        .social-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .tab-btn {
          padding: 8px 18px;
          border-radius: 999px;
          border: 2px solid ${gold};
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .tab-primary {
          background: ${gold};
          color: #40040d;
        }

        .tab-secondary {
          background: ${burgundy};
          color: ${ivory};
        }

        .social-feed-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 420px;
          overflow-y: auto;
        }

        .feed-card {
          border-radius: 18px;
          border: 1px solid ${gold}33;
          padding: 14px;
          background: rgba(0, 0, 0, 0.16);
          font-size: 14px;
        }

        .feed-header {
          font-weight: 700;
          margin-bottom: 4px;
        }

        .feed-meta {
          opacity: 0.75;
          font-weight: 400;
        }

        .feed-stats {
          display: flex;
          gap: 12px;
          font-size: 12px;
          opacity: 0.9;
        }

        /* 📱 MOBILE: stack and keep everything inside the boxes */
        @media (max-width: 767px) {
          .social-main {
            max-width: 100%;
            padding: 12px 10px 32px;
            overflow-x: hidden;
          }

          .social-layout {
            flex-direction: column;
            gap: 16px;
          }

          .social-column {
            width: 100%;
            max-width: 100%;
            padding: 16px;
          }

          .social-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .btn-pill {
            width: 100%;
            max-width: 100%;
            text-align: center;
            font-size: 13px;
            padding: 8px 10px;
            white-space: normal;
          }

          .social-tabs {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .tab-btn {
            width: 100%;
            max-width: 100%;
            text-align: center;
            font-size: 13px;
            padding: 8px 10px;
            white-space: normal;
          }

          .social-feed-list {
            max-height: none;
          }
        }
      `}</style>

      <main className="social-main">
        <div className="social-layout">
          {/* LEFT: Create a social post */}
          <section className="social-column">
            <h2 className="social-title">Create a social post</h2>
            <p className="social-body">
              Share your thoughts, link an article, or introduce your latest
              video...
            </p>

            <textarea
              className="social-textarea"
              maxLength={1500}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your thoughts, link an article, or introduce your latest video..."
            />

            <div className="social-counter">
              {postText.length}/1500 characters
            </div>

            <div className="social-actions">
              <button
                type="button"
                className="btn-pill btn-outline"
                onClick={handleCreateMeme}
              >
                Create a meme
              </button>
              <button
                type="button"
                className="btn-pill btn-solid"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </section>

          {/* RIGHT: Social Feed Preview */}
          <section className="social-column">
            <h2 className="social-title">Social Feed Preview</h2>

            <div className="social-tabs">
              <button
                type="button"
                className={`tab-btn ${
                  activeTab === "trending" ? "tab-primary" : "tab-secondary"
                }`}
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </button>
              <button
                type="button"
                className={`tab-btn ${
                  activeTab === "following" ? "tab-primary" : "tab-secondary"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </div>

            <div className="social-feed-list">
              {visiblePosts.map((p) => (
                <article key={p.author + p.time} className="feed-card">
                  <div className="feed-header">
                    {p.author}{" "}
                    <span className="feed-meta">
                      {p.handle} · {p.time}
                    </span>
                  </div>
                  <p style={{ marginTop: 0, marginBottom: 8 }}>{p.text}</p>
                  <div className="feed-stats">
                    {p.stats.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
