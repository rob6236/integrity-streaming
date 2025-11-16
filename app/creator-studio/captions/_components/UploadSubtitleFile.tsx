"use client";

import React, { useState } from "react";
import { parseSrtOrVtt, useCaptions } from "./utils";

export default function UploadSubtitleFile() {
  const { setCaptions } = useCaptions();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    const segments = parseSrtOrVtt(text);

    if (!segments.length) {
      alert("Could not parse captions from that file.");
      return;
    }

    setCaptions(segments);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-yellow-300">
        Upload .srt / .vtt
      </span>
      <label className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FFD700] text-[#7B0F24] text-sm font-semibold cursor-pointer hover:brightness-110">
        <span>Choose file</span>
        <input
          type="file"
          accept=".srt,.vtt"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {fileName && (
        <span className="text-xs text-yellow-200 truncate max-w-[220px]">
          {fileName}
        </span>
      )}
    </div>
  );
}
