"use client";

import React, { useState } from "react";

type AdToggle = {
  id: string;
  title: string;
  type: "Video" | "Short";
  adsEnabled: boolean;
  midRoll: boolean;
  overlay: boolean;
};

const mockVideos: AdToggle[] = [
  {
    id: "v1",
    title: "Full Tutorial: Integrity Streaming Editor",
    type: "Video",
    adsEnabled: true,
    midRoll: true,
    overlay: true,
  },
  {
    id: "v2",
    title: "Quick Tip: Timeline Zoom",
    type: "Video",
    adsEnabled: true,
    midRoll: false,
    overlay: true,
  },
  {
    id: "v3",
    title: "Short: Speed Up Your Edits",
    type: "Short",
    adsEnabled: true,
    midRoll: false,
    overlay: false,
  },
];

export default function AdPlacementsManager() {
  const [rows, setRows] = useState<AdToggle[]>(mockVideos);

  const handleToggle = (id: string, key: keyof AdToggle) => {
    if (key === "id" || key === "title" || key === "type") return;

    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [key]: !row[key] } : row
      )
    );
  };

  return (
    <div className="space-y-4 text-white">
      <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
        <p className="text-xs text-white/80">
          Use this manager to control which videos can show ads and what kinds
          of ads they can show. The switches below are only visual placeholders
          for now — later they&apos;ll sync with real ad settings for each
          video.
        </p>
      </div>

      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[#FFD700]">
            Per-video ad controls (example)
          </h3>
          <span className="text-[11px] text-white/70">
            Click the switches to see how ad configurations will feel.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FFD700]/30 text-[11px] uppercase tracking-wide text-white/70">
                <th className="py-2 pr-3">Video</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Ads Enabled</th>
                <th className="px-3 py-2">Mid-roll Ads</th>
                <th className="px-3 py-2">Overlay Ads</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-2 pr-3 text-[13px] font-semibold">
                    {row.title}
                  </td>
                  <td className="px-3 py-2 text-[13px]">{row.type}</td>
                  <td className="px-3 py-2">
                    <Toggle
                      checked={row.adsEnabled}
                      onClick={() => handleToggle(row.id, "adsEnabled")}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Toggle
                      checked={row.midRoll}
                      disabled={!row.adsEnabled}
                      onClick={() => handleToggle(row.id, "midRoll")}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Toggle
                      checked={row.overlay}
                      disabled={!row.adsEnabled}
                      onClick={() => handleToggle(row.id, "overlay")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[11px] text-white/70">
          In the future, clicking into an individual video from here will open
          the dedicated ad-placements editor where you can preview pre-roll,
          mid-roll, and post-roll positions on the timeline.
        </p>
      </div>
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function Toggle({ checked, disabled, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={`relative inline-flex h-5 w-9 items-center rounded-full border transition ${
        disabled
          ? "cursor-not-allowed border-white/20 bg-white/10"
          : checked
          ? "border-[#FFD700] bg-[#FFD700]/90"
          : "border-white/40 bg-black/60 hover:border-[#FFD700]/70"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-3.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
