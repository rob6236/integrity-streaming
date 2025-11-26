"use client";

import React, { useState, FormEvent } from "react";

type GenerateArgs = {
  prompt: string;
  stylePreset: string;
  useBrandFrame: boolean;
};

type AIThumbnailPromptProps = {
  onGenerate: (args: GenerateArgs) => void;
};

const stylePresets = [
  "Bold, high-contrast YouTube style",
  "Cinematic, film-look",
  "Minimal, clean text",
  "Playful, colorful",
];

export default function AIThumbnailPrompt({ onGenerate }: AIThumbnailPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [stylePreset, setStylePreset] = useState(stylePresets[0]);
  const [useBrandFrame, setUseBrandFrame] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      onGenerate({
        prompt: prompt.trim(),
        stylePreset,
        useBrandFrame,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <h2 className="text-base font-extrabold text-[#FFD700] tracking-wide mb-1">
        STEP 1 · DESCRIBE YOUR THUMBNAIL
      </h2>

      <p className="text-[11px] text-white/80 mb-1">
        Write exactly what you want your thumbnail to look like and say. Include colors,
        emotions, text, camera angle, subject, and any other details.
      </p>

      {/* TALLER WHITE TEXT AREA */}
      <textarea
        id="thumbnail-prompt-box"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={8}
        className="
          w-full
          rounded-sm
          border-2
          border-[#FFD700]
          bg-white
          text-black
          text-sm
          px-3
          py-2
          leading-relaxed
          resize-vertical
        "
        placeholder="Write exactly what you want your thumbnail to look like and say. Include colors, emotions, text, camera angle, subject, and any other details…"
      />

      {/* STYLE + BRAND FRAME ROW */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <label
            htmlFor="thumbnail-style-preset"
            className="block text-[11px] font-semibold text-[#FFD700] mb-1 uppercase tracking-wide"
          >
            Style preset
          </label>
          <select
            id="thumbnail-style-preset"
            value={stylePreset}
            onChange={(e) => setStylePreset(e.target.value)}
            className="w-full rounded-full border border-[#FFD700] bg-[#7B0F24] text-xs px-3 py-1.5 text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
            style={{ color: "#FFFFFF", fontWeight: 700 }}
          >
            {stylePresets.map((preset) => (
              <option key={preset} value={preset}>
                {preset}
              </option>
            ))}
          </select>
        </div>

        <label className="mt-1 md:mt-5 flex items-center gap-2 text-[11px] cursor-pointer">
          <input
            type="checkbox"
            checked={useBrandFrame}
            onChange={(e) => setUseBrandFrame(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-[#FFD700] text-[#FFD700] focus:ring-[#FFD700]"
          />
          <span className="text-white/80">
            Use Integrity Streaming brand frame
          </span>
        </label>
      </div>

      {/* GENERATE BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className={`
            rounded-full border border-[#FFD700]
            px-4 py-1.5 text-xs font-semibold
            transition-colors
            ${
              !prompt.trim() || isGenerating
                ? "bg-[#FFD700]/40 text-white/70 cursor-not-allowed"
                : "bg-[#FFD700] text-white hover:bg-[#ffe866] hover:border-[#ffe866]"
            }
          `}
          style={{ color: "#FFFFFF", fontWeight: 700 }}
        >
          {isGenerating ? "Generating…" : "Generate 4 thumbnail concepts"}
        </button>
      </div>
    </form>
  );
}


