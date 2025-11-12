// app/creator-studio/editor/_components/PreviewMonitor.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

type StylePatch = {
  zoom?: number;
  posX?: number;
  posY?: number;
  rot?: number;
  cropL?: number;
  cropR?: number;
  cropT?: number;
  cropB?: number;
};

export default function PreviewMonitor() {
  const { previewUrl, timeline, selected } = useTimelineStore();

  const lane = selected?.lane ?? null;
  const idx = selected?.index ?? -1;

  // Selected clip in the timeline (may be undefined)
  const clip = useMemo(() => {
    if (!lane || idx < 0) return undefined;
    const list = timeline.filter((c) => c.lane === lane);
    return list[idx];
  }, [timeline, lane, idx]);

  // Optional live overrides while dragging in Inspector (if it emits)
  const [override, setOverride] = useState<StylePatch | null>(null);

  useEffect(() => {
    const onStyle = (e: Event) => {
      const { lane: l, idx: i, ...rest } = (e as CustomEvent).detail || {};
      if (l === lane && i === idx) setOverride(rest as StylePatch);
    };
    window.addEventListener("viewer-style" as any, onStyle);
    return () => window.removeEventListener("viewer-style" as any, onStyle);
  }, [lane, idx]);

  // Clear override when selection changes
  useEffect(() => setOverride(null), [lane, idx]);

  // rAF watcher: force rerender when clip fields change in place
  const [, force] = useState(0);
  const sigRef = useRef<string>("");
  useEffect(() => {
    let active = true;
    const n = (v: any, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
    const p = (v: any) => {
      const x = Number(v);
      return Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 0;
    };

    const step = () => {
      if (!active) return;
      const sig = [
        n((clip as any)?.zoom, 1),
        n((clip as any)?.posX, 0),
        n((clip as any)?.posY, 0),
        n((clip as any)?.rot, 0),
        p((clip as any)?.cropL),
        p((clip as any)?.cropR),
        p((clip as any)?.cropT),
        p((clip as any)?.cropB),
        previewUrl || "",
      ].join("|");
      if (sig !== sigRef.current) {
        sigRef.current = sig;
        force((t) => t + 1);
      }
      requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => {
      active = false;
      cancelAnimationFrame(id);
    };
  }, [clip, previewUrl]);

  // Effective values (override while dragging > clip fields)
  const num = (v: any, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
  const pct = (v: any) => {
    const x = Number(v);
    return Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 0;
  };

  const zoom = num(override?.zoom ?? (clip as any)?.zoom, 1);
  const posX = num(override?.posX ?? (clip as any)?.posX, 0);
  const posY = num(override?.posY ?? (clip as any)?.posY, 0);
  const rot  = num(override?.rot  ?? (clip as any)?.rot,  0);

  const cropL = pct(override?.cropL ?? (clip as any)?.cropL);
  const cropR = pct(override?.cropR ?? (clip as any)?.cropR);
  const cropT = pct(override?.cropT ?? (clip as any)?.cropT);
  const cropB = pct(override?.cropB ?? (clip as any)?.cropB);

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    transformOrigin: "center center",
    transform: `translate(${posX}px, ${posY}px) scale(${zoom}) rotate(${rot}deg)`,
    clipPath: `inset(${cropT}% ${cropR}% ${cropB}% ${cropL}%)`,
    display: "grid",
    placeItems: "center",
  };

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  // Keep video currentTime synced with playhead scrubbing
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const onScrub = (e: Event) => {
      const detail = (e as CustomEvent).detail as { t?: number };
      if (videoRef.current && typeof detail?.t === "number" && isFinite(detail.t)) {
        try {
          videoRef.current.currentTime = detail.t;
        } catch {}
      }
    };
    window.addEventListener("timeline-scrub" as any, onScrub);
    return () => window.removeEventListener("timeline-scrub" as any, onScrub);
  }, []);

  return (
    <div
      style={{
        background: "#0b0b0b",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 12,
        height: 240,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {previewUrl ? (
        <div style={wrapperStyle}>
          {/\.(png|jpg|jpeg|gif|webp)$/i.test(previewUrl) ? (
            <img src={previewUrl} alt="preview" style={mediaStyle} />
          ) : (
            <video ref={videoRef} src={previewUrl} controls style={mediaStyle} />
          )}
        </div>
      ) : (
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>
          Drag from Media Pool into Timeline, or click <b>Preview</b>.
        </div>
      )}
    </div>
  );
}
