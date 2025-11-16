"use client";

import React, { useState } from "react";

type AIThumbnailPromptProps = {
  onGenerate: (args: {
    prompt: string;
    stylePreset: string;
    useBrandFrame: boolean;
  }) => void;
};

const STYLE_PRESETS = [
  "Cinematic / High-Contrast",
  "Soft Pastel",
  "Bold Comic",
  "Minimal Clean",
];

export default function AIThumbnailPrompt({ onGenerate }: AIThumbnailPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [stylePreset, setStylePreset] = useState(STYLE_PRESETS[0]);
  const [useBrandFrame, setUseBrandFrame] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setIsGenerating(true);
    try {
      onGenerate({
        prompt: trimmed,
        stylePreset,
        useBrandFrame,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="h-full flex flex-col">
      <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
        Step 1 · AI Instructions
      </h3>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <p className="text-xs text-white/75 mb-2">
          Describe your thumbnail in detail. The more specific you are (emotion,
          colors, subject, text), the better the AI can match your vision.
        </p>

        <label className="text-[11px] font-semibold text-[#FFD700] mb-1">
          AI Prompt
        </label>
        <textarea
          className="w-full flex-1 min-h-[120px] bg-black/60 border border-white/30 rounded-md text-sm text-white p-2 resize-vertical"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Example: "Create a bold thumbnail for a tutorial on building a video platform. Dark burgundy background, gold glow, large white text saying BUILD YOUR OWN PLATFORM, creator on the left looking surprised, cinematic lighting."`}
        />

        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#FFD700]">
              Style preset
            </span>
            <select
              className="flex-1 bg-black/60 border border-white/40 text-xs text-white rounded px-2 py-1"
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value)}
            >
              {STYLE_PRESETS.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-[11px] text-white/80">
            <input
              type="checkbox"
              className="accent-[#FFD700]"
              checked={useBrandFrame}
              onChange={(e) => setUseBrandFrame(e.target.checked)}
            />
            Use Integrity Streaming gold frame styling
          </label>

          <button
            type="submit"
            disabled={isGenerating}
            className="self-start mt-1 rounded-full border border-[#FFD700] bg-[#FFD700] text-[#7B0F24] text-xs font-semibold px-4 py-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating…" : "Generate AI Thumbnails"}
          </button>
        </div>
      </form>
    </section>
  );
}
