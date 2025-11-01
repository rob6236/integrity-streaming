"use client";
import { parseSRT, parseVTT } from "./utils";
import type { CaptionItem } from "./CaptionEditor";

type Props = {
  onLoaded: (captions: CaptionItem[]) => void;
};

export default function UploadSubtitleFile({ onLoaded }: Props) {
  const onFile = async (file: File) => {
    const text = await file.text();
    let items: CaptionItem[] = [];
    if (file.name.toLowerCase().endsWith(".srt")) {
      items = parseSRT(text);
    } else if (file.name.toLowerCase().endsWith(".vtt")) {
      items = parseVTT(text);
    } else {
      alert("Please upload a .srt or .vtt file.");
      return;
    }
    onLoaded(items);
  };

  return (
    <label className="cursor-pointer rounded-lg px-3 py-2 border"
           style={{ borderColor: "#FFD700" }}>
      Upload .srt/.vtt
      <input
        type="file"
        accept=".srt,.vtt"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
}
