"use client";
import type { CaptionItem } from "./CaptionEditor";

/**
 * Stub generator: creates evenly spaced draft captions.
 * Later, replace with a call to your Cloudflare Workers AI pipeline.
 */
async function generateDraftsMock(durationSec = 30): Promise<CaptionItem[]> {
  const items: CaptionItem[] = [];
  const chunk = 3;
  let t = 0;
  while (t < durationSec) {
    const id = crypto.randomUUID();
    items.push({
      id,
      start: t,
      end: Math.min(t + chunk, durationSec),
      text: "Draft caption…",
    });
    t += chunk;
  }
  return new Promise((res) => setTimeout(() => res(items), 600));
}

type Props = {
  onDraft: (drafts: CaptionItem[]) => void;
};

export default function AICaptionGenerator({ onDraft }: Props) {
  const onClick = async () => {
    // TODO: replace with server action calling Workers AI
    const drafts = await generateDraftsMock(60);
    onDraft(drafts);
  };
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-3 py-2 border"
      style={{ borderColor: "#FFD700" }}
      title="Generate draft captions with AI (stub)"
    >
      AI Draft
    </button>
  );
}
