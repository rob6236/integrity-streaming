"use client";

import React from "react";
import {
  CaptionSegment,
  formatTime,
  parseTime,
  useCaptions,
} from "./utils";

export default function CaptionEditor() {
  const {
    captions,
    updateCaption,
    addCaptionAfter,
    deleteCaption,
    selectedCaptionId,
    selectCaption,
  } = useCaptions();

  const handleTimeChange = (
    segment: CaptionSegment,
    field: "start" | "end",
    value: string
  ) => {
    const seconds = parseTime(value);
    updateCaption(segment.id, { [field]: seconds });
  };

  if (!captions.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-yellow-100 text-sm">
        No captions yet. Upload a subtitle file or use AI to generate them.
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto pr-1 space-y-2">
      {captions.map((segment, idx) => {
        const isActive = segment.id === selectedCaptionId;
        return (
          <div
            key={segment.id}
            onClick={() => selectCaption(segment.id)}
            className={`rounded-xl p-2 border text-xs cursor-pointer bg-[#7B0F24] ${
              isActive
                ? "border-[#FFD700] shadow-md"
                : "border-[rgba(255,215,0,0.3)]"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FFD700] text-[#7B0F24] text-[10px] font-bold">
                {idx + 1}
              </span>
              <input
                className="flex-1 rounded-full px-2 py-0.5 bg-[#4f0613] border border-[#FFD700] text-[11px] text-yellow-100 outline-none"
                value={formatTime(segment.start)}
                onChange={(e) =>
                  handleTimeChange(segment, "start", e.target.value)
                }
              />
              <span className="text-[10px] text-yellow-200">→</span>
              <input
                className="flex-1 rounded-full px-2 py-0.5 bg-[#4f0613] border border-[#FFD700] text-[11px] text-yellow-100 outline-none"
                value={formatTime(segment.end)}
                onChange={(e) =>
                  handleTimeChange(segment, "end", e.target.value)
                }
              />
              <button
                type="button"
                className="px-2 py-0.5 rounded-full bg-[#FFD700] text-[#7B0F24] text-[10px] font-semibold hover:brightness-110"
                onClick={(e) => {
                  e.stopPropagation();
                  addCaptionAfter(segment.id);
                }}
              >
                + Split
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded-full bg-[#7B0F24] border border-[#FFD700] text-[#FFD700] text-[10px] font-semibold hover:bg-[#4f0613]"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCaption(segment.id);
                }}
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full rounded-xl bg-[#4f0613] border border-[#FFD700] text-[11px] text-yellow-50 p-2 resize-vertical min-h-[50px] outline-none"
              value={segment.text}
              onChange={(e) =>
                updateCaption(segment.id, { text: e.target.value })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
