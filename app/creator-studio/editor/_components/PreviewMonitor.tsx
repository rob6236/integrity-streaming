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
    const list = (timeline as any[]).filter((c) => c.lane === lane);
    return list[idx];
  }, [timeline, lane, idx]);

  // --------- Live overrides from Inspector (for selected clip only) ----------
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

  const num = (v: any, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
  const pct = (v: any) => {
    const x = Number(v);
    return Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 0;
  };

  // ----------------- Pick base clip (Video 1) -----------------
  const baseClip = useMemo(() => {
    const v1 = (timeline as any[]).filter((c) => c.lane === "V1");
    if (!v1.length) return undefined;
    if (!previewUrl) return v1[0];
    const match = v1.find((c) => c.url === previewUrl);
    return match || v1[0];
  }, [timeline, previewUrl]);

  // ----------------- Pick overlay clip (Overlay 1 -> Overlay 2) -------------
  const overlayClip = useMemo(() => {
    const o1 = (timeline as any[]).filter((c) => c.lane === "O1");
    if (o1.length) return o1[0];
    const v2 = (timeline as any[]).filter((c) => c.lane === "V2");
    if (v2.length) return v2[0];
    return undefined;
  }, [timeline]);

  const baseSrc = baseClip?.url;
  const overlaySrc = overlayClip?.url;

  const isImageUrl = (url?: string) =>
    !!url && /\.(png|jpg|jpeg|gif|webp)$/i.test(url.split("?")[0]);

  // ------------- Helper: per-clip transform + crop -----------------
  function getClipValues(targetClip: any | undefined) {
    let zoom = num(targetClip?.zoom, 1);
    let posX = num(targetClip?.posX, 0);
    let posY = num(targetClip?.posY, 0);
    let rot = num(targetClip?.rot, 0);

    let cropL = pct(targetClip?.cropL);
    let cropR = pct(targetClip?.cropR);
    let cropT = pct(targetClip?.cropT);
    let cropB = pct(targetClip?.cropB);

    // Apply live override ONLY if this is the selected clip
    if (targetClip && clip && targetClip === clip && override) {
      if (override.zoom !== undefined) zoom = num(override.zoom, zoom);
      if (override.posX !== undefined) posX = num(override.posX, posX);
      if (override.posY !== undefined) posY = num(override.posY, posY);
      if (override.rot !== undefined) rot = num(override.rot, rot);

      if (override.cropL !== undefined) cropL = pct(override.cropL);
      if (override.cropR !== undefined) cropR = pct(override.cropR);
      if (override.cropT !== undefined) cropT = pct(override.cropT);
      if (override.cropB !== undefined) cropB = pct(override.cropB);
    }

    return { zoom, posX, posY, rot, cropL, cropR, cropT, cropB };
  }

  const baseVals = getClipValues(baseClip);
  const overlayVals = getClipValues(overlayClip);

  // ----------------- Video scrub sync ---------------------------
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

  const baseWrapperStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    transformOrigin: "center center",
    transform: `translate(${baseVals.posX}px, ${baseVals.posY}px) scale(${baseVals.zoom}) rotate(${baseVals.rot}deg)`,
    clipPath: `inset(${baseVals.cropT}% ${baseVals.cropR}% ${baseVals.cropB}% ${baseVals.cropL}%)`,
    display: "grid",
    placeItems: "center",
  };

  const overlayWrapperStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transformOrigin: "center center",
    transform: `translate(${overlayVals.posX}px, ${overlayVals.posY}px) scale(${overlayVals.zoom}) rotate(${overlayVals.rot}deg)`,
    clipPath: `inset(${overlayVals.cropT}% ${overlayVals.cropR}% ${overlayVals.cropB}% ${overlayVals.cropL}%)`,
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
  };

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  // ------------------------- RENDER -------------------------------
  const hasAnySource = previewUrl || baseSrc || overlaySrc;

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
      {hasAnySource ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* BASE LAYER: prefers Video 1 clip; falls back to previewUrl if no V1 */}
          <div style={baseWrapperStyle}>
            {baseSrc ? (
              isImageUrl(baseSrc) ? (
                <img src={baseSrc} alt="base" style={mediaStyle} />
              ) : (
                <video ref={videoRef} src={baseSrc} controls style={mediaStyle} />
              )
            ) : previewUrl ? (
              isImageUrl(previewUrl) ? (
                <img src={previewUrl} alt="preview" style={mediaStyle} />
              ) : (
                <video ref={videoRef} src={previewUrl} controls style={mediaStyle} />
              )
            ) : null}
          </div>

          {/* OVERLAY LAYER: only if we actually have an overlay clip
              AND its URL is different from the base so it doesn't appear twice */}
          {overlaySrc && overlaySrc !== baseSrc && (
            <div style={overlayWrapperStyle}>
              <img
                src={overlaySrc}
                alt="overlay"
                style={{
                  // key change: make sure overlay image always fits well inside viewer
                  width: "80%",
                  height: "auto",
                  maxWidth: "80%",
                  maxHeight: "80%",
                  objectFit: "contain",
                }}
              />
            </div>
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
