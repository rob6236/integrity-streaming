"use client";

import React, { useMemo } from "react";
import { useCaptions } from "./utils";

export default function SyncTimeline() {
  const {
    captions,
    currentTime,
    setCurrentTime,
    selectedCaptionId,
    selectCaption,
    nudgeCaption,
  } = useCaptions();

  const totalDuration = useMemo(() => {
    if (!captions.length) return 30;
    return Math.max(10, captions[captions.length - 1].end + 2);
  }, [captions]);

  if (!captions.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-yellow-100 text-sm">
        Timeline: captions will appear here once generated or uploaded.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* timeline bar */}
      <div className="relative w-full h-20 rounded-2xl bg-[#4f0613] border border-[#FFD700] overflow-hidden px-4 py-3">
        {/* playhead */}
        <div className="absolute inset-y-2">
          <div
            className="w-px bg-[#FFD700] h-full"
            style={{
              left: `${(currentTime / totalDuration) * 100}%`,
            }}
          />
        </div>

        {/* caption blocks */}
        <div className="relative w-full h-full flex items-center">
          {captions.map((c) => {
            const left = (c.start / totalDuration) * 100;
            const width = ((c.end - c.start) / totalDuration) * 100;
            const isActive = c.id === selectedCaptionId;

            return (
              <div
                key={c.id}
                className={`absolute top-3 bottom-3 rounded-xl text-[10px] flex items-center justify-center px-2 overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-[#FFD700] text-[#7B0F24]"
                    : "bg-[rgba(255,215,0,0.6)] text-[#4f0613]"
                }`}
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => {
                  selectCaption(c.id);
                  setCurrentTime(c.start + (c.end - c.start) / 2);
                }}
                title={c.text}
              >
                <span className="truncate w-full text-center">
                  {c.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* scrubber + nudge controls */}
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={totalDuration}
          step={0.05}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="flex-1"
        />
        <div className="flex items-center gap-2 text-[11px]">
          <button
            type="button"
            disabled={!selectedCaptionId}
            className="px-2 py-1 rounded-full bg-[#7B0F24] border border-[#FFD700] text-[#FFD700] disabled:opacity-50"
            onClick={() =>
              selectedCaptionId && nudgeCaption(selectedCaptionId, -0.1)
            }
          >
            ◀︎ 0.1s
          </button>
          <button
            type="button"
            disabled={!selectedCaptionId}
            className="px-2 py-1 rounded-full bg-[#7B0F24] border border-[#FFD700] text-[#FFD700] disabled:opacity-50"
            onClick={() =>
              selectedCaptionId && nudgeCaption(selectedCaptionId, 0.1)
            }
          >
            0.1s ▶︎
          </button>
        </div>
      </div>
    </div>
  );
}
