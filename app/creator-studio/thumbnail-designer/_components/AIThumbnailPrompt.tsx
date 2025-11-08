"use client";

import { useState } from "react";

export default function AIThumbnailPrompt() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">AI Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the thumbnail you want…"
        className="w-full h-24 rounded-xl bg-transparent border border-yellow-400 px-3 py-2 outline-none"
      />
      <button
        type="button"
        className="mt-2 px-4 py-2 rounded-xl border border-yellow-400"
        onClick={() => alert(`Pretend-generate: ${prompt || "(empty)"}`)}
      >
        Generate Idea
      </button>
    </div>
  );
}
