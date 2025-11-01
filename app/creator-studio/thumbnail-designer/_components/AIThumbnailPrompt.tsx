// app/creator-studio/thumbnail-designer/_components/AIThumbnailPrompt.tsx
"use client";

import { useState } from "react";

type Suggestion = { title?: string; subtitle?: string };
type Props = { onApplySuggestion: (s: Suggestion) => void };

export default function AIThumbnailPrompt({ onApplySuggestion }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  // Placeholder “AI” – for now we fabricate a clean suggestion from the prompt.
  function generate() {
    const t = prompt.trim() || "Attention-grabbing Title";
    const s = "High contrast • Bold • Clear subject";
    const sug = { title: t, subtitle: s };
    setSuggestion(sug);
  }

  return (
    <div className="rounded-xl border border-[var(--gold,#FFD700)]/60 bg-black/20 p-4">
      <div className="mb-3 text-sm font-semibold text-white">AI Thumbnail Suggestions (placeholder)</div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        placeholder="Describe the vibe, keywords, or hook…"
        className="mb-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
      />

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="rounded-md border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-3 py-2 text-sm font-semibold text-[#7B0F24]"
        >
          Suggest
        </button>
        <button
          onClick={() => suggestion && onApplySuggestion(suggestion)}
          disabled={!suggestion}
          className="rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>

      {suggestion && (
        <div className="mt-3 rounded-lg border border-white/15 bg-black/30 p-3 text-sm text-white/90">
          <div><span className="text-white/60">Title:</span> {suggestion.title}</div>
          <div><span className="text-white/60">Subtitle:</span> {suggestion.subtitle}</div>
        </div>
      )}
    </div>
  );
}
