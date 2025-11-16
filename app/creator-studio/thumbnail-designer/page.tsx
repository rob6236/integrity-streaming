"use client";

import React, { useState } from "react";
import AIThumbnailPrompt from "./_components/AIThumbnailPrompt";
import ImageAssetsPanel from "./_components/ImageAssetsPanel";

export type ThumbnailKind = "video" | "short";

export type ThumbnailVariant = {
  id: string;
  kind: ThumbnailKind;
  label: string; // text shown inside the fake thumbnail
  promptSummary: string;
  createdAt: Date;
  source: "prompt" | "video";
};

type AspectMode = "16-9" | "9-16";

function createShortLabel(prompt: string): string {
  const firstSentence = prompt.split(/[.!?]/)[0] || prompt;
  const trimmed = firstSentence.trim();
  if (!trimmed) return "AI Thumbnail";

  const shortened =
    trimmed.length > 40 ? trimmed.slice(0, 37).trimEnd() + "…" : trimmed;

  return shortened.replace(/\s+/g, " ");
}

export default function ThumbnailDesignerPage() {
  const [thumbnails, setThumbnails] = useState<ThumbnailVariant[]>([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(
    null
  );
  const [aspect, setAspect] = useState<AspectMode>("16-9");

  const selectedThumbnail =
    thumbnails.find((t) => t.id === selectedThumbnailId) ?? null;

  // Generate 3 video + 3 short fake thumbnails using the prompt
  const handleGenerateThumbnails = ({
    prompt,
    stylePreset,
    useBrandFrame,
  }: {
    prompt: string;
    stylePreset: string;
    useBrandFrame: boolean;
  }) => {
    const createdAt = new Date();
    const baseLabel = createShortLabel(prompt);
    const baseSummary = `Prompt: "${prompt}" | Style: ${stylePreset} | BrandFrame: ${
      useBrandFrame ? "Yes" : "No"
    }`;

    const makeVideo = (index: number): ThumbnailVariant => ({
      id: `video-${createdAt.getTime()}-${index}`,
      kind: "video",
      label: `${baseLabel} · V${index + 1}`,
      promptSummary: baseSummary,
      createdAt,
      source: "prompt",
    });

    const makeShort = (index: number): ThumbnailVariant => ({
      id: `short-${createdAt.getTime()}-${index}`,
      kind: "short",
      label: `${baseLabel} · S${index + 1}`,
      promptSummary: baseSummary,
      createdAt,
      source: "prompt",
    });

    const generated: ThumbnailVariant[] = [
      makeVideo(0),
      makeVideo(1),
      makeVideo(2),
      makeShort(0),
      makeShort(1),
      makeShort(2),
    ];

    setThumbnails(generated);
    setSelectedThumbnailId(generated[0].id); // first video selected
    setAspect("16-9");
  };

  const handleSelectThumbnail = (id: string) => {
    setSelectedThumbnailId(id);
  };

  const handleDiscardThumbnail = (id: string) => {
    setThumbnails((prev) => prev.filter((t) => t.id !== id));
    setSelectedThumbnailId((prev) => (prev === id ? null : prev));
  };

  return (
    <div className="w-full h-full text-white px-4 pb-6 pt-2">
      {/* HEADER */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[#FFD700]">
          Thumbnail Designer
        </h1>
        <p className="text-sm mt-2 max-w-3xl">
          Use AI to create eye-catching thumbnails that match your content and
          Integrity Streaming&apos;s brand. Thumbnails created here are saved
          for later and can be attached to your final rendered video when you
          upload it to your channel.
        </p>
        <div className="mt-3 text-xs">
          <p className="font-semibold mb-1 text-[#FFD700]">
            Workflow reminder:
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Edit &amp; render video in Editor.</li>
            <li>Design thumbnail here in Thumbnail Designer.</li>
            <li>Upload video to channel &amp; choose thumbnail.</li>
          </ol>
        </div>
      </header>

      {/* LIVE VIEWER – ALWAYS VISIBLE */}
      <section className="border border-[#FFD700] rounded-lg mb-4 p-3 bg-[#7B0F24]">
        <div className="flex items-center justify-between mb-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold text-[#FFD700]">
              Live Thumbnail Viewer
            </h2>
            <p className="text-xs text-white/75 max-w-xl">
              This viewer updates automatically as you generate and choose
              thumbnails in the grid below. Use the buttons on the right to
              switch between regular video (16:9) and Shorts (9:16) layouts.
            </p>
          </div>

          {/* Aspect toggle – BIGGER VERSION */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-white/70">Aspect:</span>
            <div className="inline-flex rounded-full border border-[#FFD700] bg-black/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setAspect("16-9")}
                className={`px-4 py-1.5 whitespace-nowrap transition-colors ${
                  aspect === "16-9"
                    ? "bg-[#FFD700] text-[#7B0F24] font-semibold"
                    : "bg-transparent text-[#FFD700] hover:bg-[#FFD700]/15"
                }`}
              >
                Video · 16:9
              </button>
              <button
                type="button"
                onClick={() => setAspect("9-16")}
                className={`px-4 py-1.5 whitespace-nowrap transition-colors ${
                  aspect === "9-16"
                    ? "bg-[#FFD700] text-[#7B0F24] font-semibold"
                    : "bg-transparent text-[#FFD700] hover:bg-[#FFD700]/15"
                }`}
              >
                Short · 9:16
              </button>
            </div>
          </div>
        </div>

        {/* Viewer box with fixed height so it never collapses */}
        <div className="bg-black/90 border border-[#FFD700] rounded-md flex items-center justify-center py-3">
          <div
            className="w-full max-w-4xl"
            style={{
              height: aspect === "16-9" ? 260 : 360, // taller for Shorts
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B0F24] via-black to-[#FFD700]/40 rounded-sm px-4">
              <span className="text-center text-sm md:text-lg font-semibold text-[#FFD700] leading-snug">
                {selectedThumbnail
                  ? selectedThumbnail.label
                  : "No thumbnail selected yet. Generate thumbnails in Step 1, then click one in the grid below to see it here."}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-white/60 mt-1">
          Toggle the aspect ratio to preview how the selected thumbnail will
          look on Integrity Streaming as a regular video vs. a Short.
        </p>
      </section>

      {/* GRID: STEP 1–4 */}
      <section className="border border-[#FFD700] rounded-lg p-3 bg-[#7B0F24]">
        <div className="grid grid-cols-2 gap-4">
          {/* STEP 1 – AI INSTRUCTIONS */}
          <div className="border border-white/25 rounded-xl bg-black/40 p-3">
            <AIThumbnailPrompt onGenerate={handleGenerateThumbnails} />
          </div>

          {/* STEP 2 – GENERATED THUMBNAILS */}
          <div className="border border-white/25 rounded-xl bg-black/40 p-3">
            <ImageAssetsPanel
              thumbnails={thumbnails}
              selectedThumbnailId={selectedThumbnailId}
              onSelect={handleSelectThumbnail}
              onDiscard={handleDiscardThumbnail}
            />
          </div>

          {/* STEP 3 – FUTURE TEXT / OVERLAY EDITOR */}
          <div className="border border-white/25 rounded-xl bg-black/40 p-3 text-sm text-white/80">
            <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
              Step 3 · Text &amp; Overlay (Future)
            </h3>
            <p className="text-xs mb-2">
              In the future, this panel will let you add or tweak text overlays,
              positioning, and effects on top of your AI thumbnail (similar to a
              mini-editor just for thumbnails). For now, you can review the
              AI&apos;s concept summary below so you remember what this
              thumbnail represents.
            </p>
            <p className="text-[10px] text-white/60">
              Select a thumbnail from the gallery to see its concept summary
              here.
            </p>
          </div>

          {/* STEP 4 – SAVE FOR CHANNEL UPLOAD */}
          <div className="border border-white/25 rounded-xl bg-black/40 p-3 text-sm text-white/80">
            <h3 className="text-xs font-semibold text-[#FFD700] mb-2 uppercase tracking-wide">
              Step 4 · Save for Channel Upload
            </h3>
            <p className="text-xs mb-3">
              When you&apos;re happy with a thumbnail, this step will save it
              under your account so that when you upload a final rendered video
              to your channel, you can choose from your AI thumbnails instead of
              uploading from scratch.
            </p>
            <button className="rounded-full border border-[#FFD700] bg-[#FFD700] text-[#7B0F24] font-semibold text-[11px] px-4 py-1.5 hover:bg-[#ffe866] hover:border-[#ffe866]">
              Select a thumbnail to mark it as ready
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
