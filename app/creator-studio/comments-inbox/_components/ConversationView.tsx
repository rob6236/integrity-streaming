"use client";

import type { CommentThread } from "./ThreadsList";

const gold = "#FFD700";

export default function ConversationView({ thread }: { thread: CommentThread }) {
  return (
    <div className="flex-1 min-h-[50vh]">
      <header className="pb-3 mb-3 border-b" style={{ borderColor: gold }}>
        <div className="font-semibold">
          {thread.videoTitle}
        </div>
        <div className="text-sm opacity-80">
          Participants: {thread.participants.map((p) => `${p.name} (${p.handle})`).join(", ")}
        </div>
      </header>

      <div className="space-y-3">
        {thread.messages.map((m) => (
          <div key={m.id} className="rounded-xl p-3 border" style={{ borderColor: gold }}>
            <div className="text-sm opacity-80 mb-1">
              {m.authorName} • {new Date(m.at).toLocaleString()}
            </div>
            <div className="whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
