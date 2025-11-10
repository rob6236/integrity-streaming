// app/creator-studio/editor/_components/Inspector.tsx
"use client";

import React, { useMemo } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

const row: React.CSSProperties = { display: "grid", gridTemplateColumns: "100px 1fr 70px", gap: 8, alignItems: "center" };
const label: React.CSSProperties = { fontSize: 12, color: "rgba(255,255,255,.85)" };
const numberBox: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,.06)", color: "#fff", borderRadius: 6, border: "1px solid rgba(255,255,255,.12)", padding: "6px 8px" };
const sliderRow: React.CSSProperties = { display: "flex", gap: 10, alignItems: "center" };

export default function Inspector() {
  const { timeline, selected, updateClip } = useTimelineStore();

  // --- Always compute these with hooks at top level (no early-returns before hooks)
  const lane = selected?.lane ?? null;
  const idx = selected?.index ?? -1;

  const clip = useMemo(() => {
    if (!lane || idx < 0) return undefined;
    const list = timeline.filter((c) => c.lane === lane);
    return list[idx];
  }, [timeline, lane, idx]);

  // `clip` can be undefined; we still rendered hooks above, so order is stable.
  if (!clip) {
    return (
      <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>
        No clip selected.
      </div>
    );
  }

  const safeNum = (v: any, fallback = 0) => (Number.isFinite(Number(v)) ? Number(v) : fallback);

  const zoom = safeNum((clip as any).zoom, 1);
  const posX = safeNum((clip as any).posX, 0);
  const posY = safeNum((clip as any).posY, 0);
  const rot  = safeNum((clip as any).rot, 0);

  const cropL = safeNum((clip as any).cropL, 0);
  const cropR = safeNum((clip as any).cropR, 0);
  const cropT = safeNum((clip as any).cropT, 0);
  const cropB = safeNum((clip as any).cropB, 0);
  const soft  = safeNum((clip as any).soft, 0);

  const on = (patch: Record<string, any>) => updateClip(lane as any, idx, patch);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Transform */}
      <div style={{ fontWeight: 800, color: "#fff" }}>Transform</div>
      <div style={row}>
        <div style={label}>Zoom</div>
        <div style={sliderRow}>
          <input type="range" min={0.1} max={5} step={0.01} value={zoom} onChange={(e) => on({ zoom: Number(e.target.value) })} />
        </div>
        <input style={numberBox} type="number" step={0.01} value={zoom} onChange={(e) => on({ zoom: Number(e.target.value) })} />
      </div>

      <div style={row}>
        <div style={label}>Position</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input style={numberBox} type="number" step={1} value={posX} onChange={(e) => on({ posX: Number(e.target.value) })} />
          <input style={numberBox} type="number" step={1} value={posY} onChange={(e) => on({ posY: Number(e.target.value) })} />
        </div>
        <div />
      </div>

      <div style={row}>
        <div style={label}>Rotation</div>
        <div style={sliderRow}>
          <input type="range" min={-180} max={180} step={0.1} value={rot} onChange={(e) => on({ rot: Number(e.target.value) })} />
        </div>
        <input style={numberBox} type="number" step={0.1} value={rot} onChange={(e) => on({ rot: Number(e.target.value) })} />
      </div>

      {/* Cropping */}
      <div style={{ fontWeight: 800, color: "#fff", marginTop: 6 }}>Cropping</div>

      {[
        ["Crop Left", "cropL", cropL],
        ["Crop Right", "cropR", cropR],
        ["Crop Top", "cropT", cropT],
        ["Crop Bottom", "cropB", cropB],
        ["Softness", "soft", soft],
      ].map(([lbl, key, val]) => (
        <div key={key as string} style={row}>
          <div style={label}>{lbl}</div>
          <div style={sliderRow}>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={val as number}
              onChange={(e) => on({ [key as string]: Number(e.target.value) })}
            />
          </div>
          <input
            style={numberBox}
            type="number"
            min={0}
            max={100}
            step={1}
            value={val as number}
            onChange={(e) => on({ [key as string]: Number(e.target.value) })}
          />
        </div>
      ))}
    </div>
  );
}
