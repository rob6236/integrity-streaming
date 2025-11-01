"use client";

import { RefObject, useEffect, useState } from "react";

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
  onSetStart: () => void;
  onSetEnd: () => void;
  hasSelection: boolean;
};

export default function SyncTimeline({ videoRef, onSetStart, onSetEnd, hasSelection }: Props) {
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const time = () => setCur(v.currentTime || 0);
    const loaded = () => setDur(v.duration || 0);

    v.addEventListener("timeupdate", time);
    v.addEventListener("loadedmetadata", loaded);
    loaded();

    return () => {
      v.removeEventListener("timeupdate", time);
      v.removeEventListener("loadedmetadata", loaded);
    };
  }, [videoRef]);

  const scrub = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = val;
    setCur(val);
  };

  return (
    <div>
      <div className="mb-2 text-sm opacity-80">
        {format(cur)} / {format(dur)}
      </div>
      <input
        type="range"
        min={0}
        max={dur || 0}
        step="0.01"
        value={cur}
        onChange={(e) => scrub(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex gap-3 mt-3">
        <button
          disabled={!hasSelection}
          onClick={onSetStart}
          className="rounded px-3 py-2 border disabled:opacity-40"
          style={{ borderColor: "#FFD700" }}
          title="Set selected caption's start to current time"
        >
          Set Start
        </button>
        <button
          disabled={!hasSelection}
          onClick={onSetEnd}
          className="rounded px-3 py-2 border disabled:opacity-40"
          style={{ borderColor: "#FFD700" }}
          title="Set selected caption's end to current time"
        >
          Set End
        </button>
      </div>
    </div>
  );
}

function format(t: number) {
  if (!isFinite(t)) return "00:00.000";
  const ms = Math.floor((t % 1) * 1000);
  const s = Math.floor(t) % 60;
  const m = Math.floor(t / 60);
  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");
  return `${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}
