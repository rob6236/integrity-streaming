"use client";
import { useState } from "react";

export default function TextOverlayControls() {
  const [text, setText] = useState("");
  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">Text Overlay</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your title text"
        className="w-full rounded-xl bg-transparent border border-yellow-400 px-3 py-2 outline-none"
      />
      <p className="text-xs opacity-70 mt-2">Preview text: {text || "—"}</p>
    </div>
  );
}
