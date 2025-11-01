"use client";

import { useMemo, useState } from "react";

export type Message = {
  id: string;
  authorId: string;
  authorName: string;
  at: number;
  text: string;
};

export type Participant = { id: string; name: string; handle: string };

export type CommentThread = {
  id: string;
  videoTitle: string;
  videoId: string;
  unread: number;
  pinned: boolean;
  hidden: boolean;
  blockedUser: boolean;
  lastActivity: number;
  participants: Participant[];
  messages: Message[];
};

const gold = "#FFD700";

export default function ThreadsList({
  threads,
  activeId,
  onSelect,
}: {
  threads: CommentThread[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [showHidden, setShowHidden] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(false);

  const items = useMemo(() => {
    let list = [...threads];
    if (!showHidden) list = list.filter((t) => !t.hidden);
    if (onlyUnread) list = list.filter((t) => t.unread > 0);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (t) =>
          t.videoTitle.toLowerCase().includes(s) ||
          t.participants.some((p) => p.name.toLowerCase().includes(s) || p.handle.toLowerCase().includes(s)) ||
          t.messages.some((m) => m.text.toLowerCase().includes(s))
      );
    }
    // pin first, then sort by lastActivity desc
    return list.sort((a, b) => (a.pinned === b.pinned ? b.lastActivity - a.lastActivity : a.pinned ? -1 : 1));
  }, [threads, q, showHidden, onlyUnread]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <input
          className="w-full rounded-lg px-3 py-2 text-black"
          placeholder="Search comments…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="flex items-center gap-3 mt-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={onlyUnread} onChange={(e) => setOnlyUnread(e.target.checked)} />
            Only unread
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />
            Show hidden
          </label>
        </div>
      </div>

      <div className="overflow-auto mt-2">
        {items.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className="w-full text-left px-3 py-2 border-t first:border-t-0"
              style={{
                borderColor: gold,
                background: active ? "rgba(255,215,0,0.12)" : "transparent",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">
                  <div className="font-medium truncate">
                    {t.videoTitle} {t.pinned ? "📌" : ""} {t.hidden ? "🙈" : ""}
                  </div>
                  <div className="text-sm opacity-80 truncate">
                    {t.participants.map((p) => p.name).join(", ")} • {new Date(t.lastActivity).toLocaleString()}
                  </div>
                </div>
                {t.unread > 0 && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: gold, color: "#7B0F24" }}>
                    {t.unread}
                  </span>
                )}
              </div>
              <div className="text-sm opacity-80 truncate mt-1">
                {t.messages[t.messages.length - 1]?.text || ""}
              </div>
            </button>
          );
        })}
        {items.length === 0 && <div className="px-3 py-6 opacity-80">No threads.</div>}
      </div>
    </div>
  );
}
