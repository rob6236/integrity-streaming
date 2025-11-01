"use client";

import { useMemo, useState } from "react";
import ThreadsList, { CommentThread } from "./_components/ThreadsList";
import ConversationView from "./_components/ConversationView";
import ReplyBox from "./_components/ReplyBox";
import ModerationActions from "./_components/ModerationActions";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

export default function CommentsInboxPage() {
  const [threads, setThreads] = useState<CommentThread[]>([
    {
      id: "t1",
      videoTitle: "How to color-grade in 10 minutes",
      videoId: "v_abc",
      unread: 2,
      pinned: true,
      hidden: false,
      blockedUser: false,
      lastActivity: Date.now() - 1000 * 60 * 5,
      participants: [{ id: "u1", name: "Jenna", handle: "@jennafilm" }],
      messages: [
        { id: "m1", authorId: "u1", authorName: "Jenna", at: Date.now() - 1000 * 60 * 30, text: "This helped so much!" },
        { id: "m2", authorId: "creator", authorName: "You", at: Date.now() - 1000 * 60 * 22, text: "Glad it helped 🙌" },
        { id: "m3", authorId: "u1", authorName: "Jenna", at: Date.now() - 1000 * 60 * 5, text: "What LUT do you recommend?" },
      ],
    },
    {
      id: "t2",
      videoTitle: "Street photography tips",
      videoId: "v_def",
      unread: 0,
      pinned: false,
      hidden: false,
      blockedUser: false,
      lastActivity: Date.now() - 1000 * 60 * 60 * 3,
      participants: [{ id: "u2", name: "Milan", handle: "@milanshoots" }],
      messages: [
        { id: "m1", authorId: "u2", authorName: "Milan", at: Date.now() - 1000 * 60 * 60 * 4, text: "What lens were you using?" },
      ],
    },
  ]);
  const [activeId, setActiveId] = useState<string>(threads[0]?.id || "");
  const active = useMemo(() => threads.find((t) => t.id === activeId) || null, [threads, activeId]);

  const updateThread = (id: string, change: Partial<CommentThread>) =>
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, ...change } : t)));

  const addReply = (text: string) => {
    if (!active) return;
    const reply = { id: crypto.randomUUID(), authorId: "creator", authorName: "You", at: Date.now(), text };
    updateThread(active.id, { messages: [...active.messages, reply], lastActivity: reply.at, unread: 0 });
  };

  const applyModeration = (id: string, action: { type: "pin" | "hide" | "delete" | "block"; value?: boolean }) => {
    const t = threads.find((x) => x.id === id);
    if (!t) return;
    if (action.type === "delete") {
      setThreads((prev) => prev.filter((x) => x.id !== id));
      if (id === activeId) setActiveId(threads.find((x) => x.id !== id)?.id || "");
      return;
    }
    if (action.type === "pin") updateThread(id, { pinned: !!action.value });
    if (action.type === "hide") updateThread(id, { hidden: !!action.value });
    if (action.type === "block") updateThread(id, { blockedUser: !!action.value });
  };

  return (
    <main className="min-h-screen w-full" style={{ background: burgundy, color: white }}>
      <h1 className="sr-only">Integrity Streaming — Comments Inbox</h1>

      <header className="w-full border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: gold }}>
        <div className="text-lg font-semibold">
          Creator Studio / <span style={{ color: gold }}>Comments Inbox</span>
        </div>
        <div className="text-sm opacity-80">Reply to comments, triage, and moderate your community.</div>
      </header>

      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "320px 1fr 360px" }}>
        <section className="rounded-2xl p-3 border overflow-hidden" style={{ borderColor: gold }}>
          <ThreadsList threads={threads} activeId={activeId} onSelect={setActiveId} />
        </section>

        <section className="rounded-2xl p-3 border flex flex-col min-h-[70vh]" style={{ borderColor: gold }}>
          {active ? (
            <>
              <ConversationView thread={active} />
              <div className="mt-3"><ReplyBox onSend={addReply} /></div>
            </>
          ) : (
            <div className="opacity-80">No thread selected.</div>
          )}
        </section>

        <section className="rounded-2xl p-3 border" style={{ borderColor: gold }}>
          {active ? (
            <ModerationActions thread={active} onAction={(a) => applyModeration(active.id, a)} />
          ) : (
            <div className="opacity-80">Select a thread to see actions.</div>
          )}
        </section>
      </div>
    </main>
  );
}
