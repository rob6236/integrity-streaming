"use client";

import React, { useState } from "react";
import AIThumbnailPrompt from "./_components/AIThumbnailPrompt";

export type ThumbnailKind = "video" | "short";

export type ThumbnailVariant = {
  id: string;
  kind: ThumbnailKind;
  label: string;
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
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(null);
  const [aspect, setAspect] = useState<AspectMode>("16-9");

  const selectedThumbnail =
    thumbnails.find((t) => t.id === selectedThumbnailId) ?? null;

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
    setSelectedThumbnailId(generated[0].id);
    setAspect("16-9");
  };

  const handleSelectThumbnail = (id: string) => {
    setSelectedThumbnailId(id);
  };

  const handleDiscardThumbnail = (id: string) => {
    setThumbnails((prev) => prev.filter((t) => t.id !== id));
    setSelectedThumbnailId((prev) => (prev === id ? null : prev));
  };

  const activeKind: ThumbnailKind = aspect === "16-9" ? "video" : "short";
  const activeThumbs = thumbnails.filter((t) => t.kind === activeKind).slice(0, 4);

  const viewerBoxStyle: React.CSSProperties =
    aspect === "16-9"
      ? {
          width: "100%",
          maxWidth: 640,
          aspectRatio: "16 / 9",
        }
      : {
          width: 220,
          maxHeight: 260,
          aspectRatio: "9 / 16",
        };

  return (
    <div className="w-full h-full text-white px-4 pb-6 pt-2">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[#FFD700]">Thumbnail Designer</h1>
        <p className="text-sm mt-2 max-w-3xl">
          Use AI to create eye-catching thumbnails that match your content and
          Integrity Streaming&apos;s brand. Thumbnails created here are saved for later.
        </p>
        <div className="mt-3 text-xs">
          <p className="font-semibold mb-1 text-[#FFD700]">Workflow reminder:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Edit &amp; render video in Editor.</li>
            <li>Design thumbnail here in Thumbnail Designer.</li>
            <li>Upload video to channel &amp; choose thumbnail.</li>
          </ol>
        </div>
      </header>

      {/* STEP 1 */}
      <section className="border border-[#FFD700] rounded-lg p-3 bg-[#7B0F24] mb-4">
        <AIThumbnailPrompt onGenerate={handleGenerateThumbnails} />
      </section>

      {/* STEP 2 */}
      <section className="border border-[#FFD700] rounded-lg p-3 bg-[#7B0F24] mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-[#FFD700]">
            STEP 2 · CHOOSE A THUMBNAIL
          </h2>

          {/* ONLY CHANGE → mr-6 */}
          <span className="text-[11px] text-right text-white/70 mr-6">
            Aspect currently set to{" "}
            <span className="font-semibold text-[#FFD700]">
              {aspect === "16-9" ? "16:9 (landscape)" : "9:16 (vertical)"}
            </span>
          </span>
        </div>

        <p className="text-xs text-white/80 mb-3">
          These four slots show concepts for the selected aspect. Click to preview below.
        </p>

        {/* TOGGLE */}
        <div className="flex items-center justify-center mb-3">
          <div className="inline-flex rounded-full border border-[#FFD700] bg-black/60 overflow-hidden text-xs">
            <button
              onClick={() => setAspect("16-9")}
              className={`px-4 py-1.5 ${
                aspect === "16-9"
                  ? "bg-[#FFD700] text-[#7B0F24] font-semibold"
                  : "bg-transparent text-[#FFD700]"
              }`}
            >
              Video · 16:9
            </button>
            <button
              onClick={() => setAspect("9-16")}
              className={`px-4 py-1.5 ${
                aspect === "9-16"
                  ? "bg-[#FFD700] text-[#7B0F24] font-semibold"
                  : "bg-transparent text-[#FFD700]"
              }`}
            >
              Short · 9:16
            </button>
          </div>
        </div>

        {/* PLACEHOLDERS */}
        <div className="flex flex-wrap gap-3 justify-between">
          {Array.from({ length: 4 }).map((_, i) => {
            const thumb = activeThumbs[i] ?? null;
            const isSelected = thumb && thumb.id === selectedThumbnailId;

            return (
              <button
                key={i}
                onClick={() => thumb && handleSelectThumbnail(thumb.id)}
                className={`flex-1 min-w-[140px] max-w-[220px] border-2 rounded-lg bg-[#7B0F24] px-2 py-2 text-left ${
                  isSelected
                    ? "border-[#FFD700] shadow-[0_0_0_2px_rgba(255,215,0,0.7)]"
                    : "border-[#FFD700]/70"
                }`}
              >
                <div
                  className={`w-full border-2 border-[#FFD700] bg-black/40 rounded-[2px] relative overflow-hidden ${
                    aspect === "16-9" ? "pt-[56.25%]" : "pt-[177.78%]"
                  }`}
                >
                  {thumb && (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#FFD700] px-2 text-center">
                      {thumb.label}
                    </div>
                  )}
                </div>

                {/* bottom text – white + bold */}
                <div
                  className="mt-2 text-[11px] font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  {thumb ? thumb.label : "Placeholder"}
                </div>

                <div
                  className="text-[10px] font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  {thumb
                    ? "Click to preview this concept in the viewer."
                    : "Empty slot · Generate in Step 1 to fill this."}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* VIEWER */}
      <section className="border border-[#FFD700] rounded-lg mb-4 p-3 bg-[#7B0F24]">
        <h2 className="text-sm font-semibold text-[#FFD700] mb-1">
          Live Thumbnail Viewer
        </h2>

        <div className="bg-black/90 border border-[#FFD700] rounded-md flex items-center justify-center py-2">
          <div className="flex justify-center w-full">
            <div
              className="w-full flex items-center justify-center bg-gradient-to-br from-[#7B0F24] via-black to-[#FFD700]/40 rounded-sm px-3"
              style={viewerBoxStyle}
            >
              <span className="text-center text-sm md:text-base font-semibold text-[#FFD700]">
                {selectedThumbnail
                  ? selectedThumbnail.label
                  : "No thumbnail selected yet. Generate one in Step 1 and select it above."}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-white/60 mt-1">
          A future update will allow sending thumbnails into the Editor’s media pool.
        </p>
      </section>
    </div>
  );
}
