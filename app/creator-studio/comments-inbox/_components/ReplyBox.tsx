"use client";

import { useState } from "react";

const gold = "#FFD700";

export default function ReplyBox({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const send = () => {
    const v = text.trim();
    if (!v) return;
    onSend(v);
    setText("");
  };

  return (
    <div className="rounded-xl p-3 border" style={{ borderColor: gold }}>
      <textarea
        className="w-full rounded-lg p-3 text-black min-h-[80px]"
        placeholder="Write a reply…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-2 flex items-center gap-2 justify-end">
        <button onClick={send} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
          Send
        </button>
      </div>
    </div>
  );
}
