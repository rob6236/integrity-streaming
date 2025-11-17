"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThreadsList, { ThreadSummary } from "./_components/ThreadsList";
import ConversationView, { CommentMessage } from "./_components/ConversationView";
import ModerationActions from "./_components/ModerationActions";
import ReplyBox from "./_components/ReplyBox";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type CommentThread = {
  id: string;
  videoTitle: string;
  videoId: string;
  topCommentSnippet: string;
  lastUpdated: string;
  unreadCount: number;
  totalCount: number;
  messages: CommentMessage[];
};

const INITIAL_THREADS: CommentThread[] = [
  {
    id: "t1",
    videoTitle: "Welcome to Integrity Streaming",
    videoId: "VID-001",
    topCommentSnippet: "This intro video is amazing!",
    lastUpdated: "2 min ago",
    unreadCount: 3,
    totalCount: 7,
    messages: [
      {
        id: "m1",
        authorName: "Crystal",
        role: "viewer",
        text: "This intro video is amazing! Excited to start posting.",
        createdAt: "2 min ago",
      },
      {
        id: "m2",
        authorName: "James",
        role: "viewer",
        text: "Love the focus on integrity. Subscribed.",
        createdAt: "6 min ago",
      },
      {
        id: "m3",
        authorName: "You",
        role: "creator",
        text: "Thank you both for being here. More videos coming soon!",
        createdAt: "1 min ago",
      },
    ],
  },
  {
    id: "t2",
    videoTitle: "Behind the Scenes: Filming Day 1",
    videoId: "VID-002",
    topCommentSnippet: "What camera are you using?",
    lastUpdated: "1 hr ago",
    unreadCount: 1,
    totalCount: 3,
    messages: [
      {
        id: "m4",
        authorName: "Drew",
        role: "viewer",
        text: "What camera are you using? The quality is super clear.",
        createdAt: "1 hr ago",
      },
      {
        id: "m5",
        authorName: "You",
        role: "creator",
        text: "We’re using a mirrorless camera with a prime lens.",
        createdAt: "55 min ago",
      },
      {
        id: "m6",
        authorName: "Drew",
        role: "viewer",
        text: "Thanks! That really helps.",
        createdAt: "48 min ago",
      },
    ],
  },
  {
    id: "t3",
    videoTitle: "Short: Quick Integrity Tip #1",
    videoId: "VID-003",
    topCommentSnippet: "More shorts like this please!",
    lastUpdated: "Yesterday",
    unreadCount: 0,
    totalCount: 5,
    messages: [
      {
        id: "m7",
        authorName: "Lee",
        role: "viewer",
        text: "More shorts like this please, they’re easy to share.",
        createdAt: "Yesterday",
      },
      {
        id: "m8",
        authorName: "You",
        role: "creator",
        text: "Great to hear! More quick tips are on the way.",
        createdAt: "Yesterday",
      },
    ],
  },
];

export default function CommentsInboxPage() {
  const [threads, setThreads] = useState<CommentThread[]>(INITIAL_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(
    INITIAL_THREADS[0]?.id ?? ""
  );
  const [lastAction, setLastAction] = useState<string | null>(null);

  const selectedThread =
    threads.find((t) => t.id === selectedThreadId) ?? threads[0];

  const threadSummaries: ThreadSummary[] = threads.map((t) => ({
    id: t.id,
    videoTitle: t.videoTitle,
    topCommentSnippet: t.topCommentSnippet,
    lastUpdated: t.lastUpdated,
    unreadCount: t.unreadCount,
    totalCount: t.totalCount,
  }));

  const handleSendReply = (text: string) => {
    if (!text.trim() || !selectedThread) return;

    const newMessage: CommentMessage = {
      id: `reply-${Date.now()}`,
      authorName: "You",
      role: "creator",
      text: text.trim(),
      createdAt: "Just now",
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? {
              ...t,
              messages: [...t.messages, newMessage],
              totalCount: t.totalCount + 1,
              unreadCount: 0,
            }
          : t
      )
    );
  };

  const handleModerationAction = (action: string) => {
    setLastAction(action);
  };

  return (
    <div
      style={{
        padding: "24px 32px 40px",
        color: "white",
        fontFamily:
          '"Baloo 2", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Page title */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: GOLD,
          margin: 0,
          marginBottom: 6,
          textShadow: "0 0 12px rgba(0,0,0,.75)",
        }}
      >
        Comments / Inbox
      </h1>

      {/* Small breadcrumb / sub-nav */}
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 20,
          color: "#ffe8a1",
        }}
      >
        <Link
          href="/creator-studio"
          style={{ textDecoration: "none", color: "#ffe8a1" }}
        >
          Dashboard
        </Link>
        <Link
          href="/creator-studio/content-library"
          style={{ textDecoration: "none", color: "#ffe8a1" }}
        >
          Content Library
        </Link>
      </div>

      {/* Main card */}
      <section
        style={{
          border: `1px solid ${GOLD}`,
          borderRadius: 22,
          background: "linear-gradient(180deg,#6b0c1f 0%, #540816 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,215,0,.4), inset 0 0 22px rgba(0,0,0,.85)",
          padding: 18,
        }}
      >
        {threads.length === 0 || !selectedThread ? (
          <div
            style={{
              fontSize: 15,
              textAlign: "center",
              padding: 40,
              color: "#ffe8a1",
              fontWeight: 600,
            }}
          >
            Inbox placeholder. Unified comments, filters, and replies will appear
            here.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(220px, 260px) minmax(0, 2.1fr) minmax(260px, 1.1fr)",
              gap: 18,
              alignItems: "stretch",
            }}
          >
            {/* Column 1: Threads */}
            <ThreadsList
              threads={threadSummaries}
              selectedId={selectedThread.id}
              onSelect={setSelectedThreadId}
            />

            {/* Column 2: Conversation */}
            <ConversationView
              threadTitle={selectedThread.videoTitle}
              messages={selectedThread.messages}
            />

            {/* Column 3: Moderation + Reply */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <ModerationActions onAction={handleModerationAction} />
              <ReplyBox onSend={handleSendReply} />
              {lastAction && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#ffe8a1",
                    marginTop: 2,
                  }}
                >
                  Last action:{" "}
                  <span style={{ fontWeight: 800 }}>{lastAction}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
