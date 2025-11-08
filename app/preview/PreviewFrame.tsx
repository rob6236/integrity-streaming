// app/preview/PreviewFrame.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INTEGRITY_COLORS } from "@/lib/preview/devices";

type Props = {
  title: string;
  path: string;        // e.g. "/creator-studio"
  width: number;       // device width (css px)
  height: number;      // device height (css px)
  autoFit: boolean;    // if true, auto-fit to the card width
  scalePct: number;    // manual % when autoFit=false
  showScaleBadge?: boolean;
  frameId?: string;

  // NEW: when provided, we’ll report location changes back up
  onLocationChange?: (newPath: string) => void;
  watchLocation?: boolean; // enable/disable the watcher
};

export default function PreviewFrame({
  title,
  path,
  width,
  height,
  autoFit,
  scalePct,
  showScaleBadge = true,
  frameId,
  onLocationChange,
  watchLocation = false,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Observe card width to compute auto-fit scaling
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = entry.contentRect.width;
        setContainerWidth(cw);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const safePath = useMemo(() => {
    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
  }, [path]);

  // Compute scale
  const targetScale = useMemo(() => {
    if (autoFit) {
      const usable = Math.max(0, containerWidth - 24);
      if (width <= 0) return 1;
      const s = Math.min(1, usable / width);
      return isFinite(s) && s > 0 ? s : 1;
    }
    return Math.max(0.1, Math.min(3, scalePct / 100));
  }, [autoFit, containerWidth, width, scalePct]);

  const scaledWidth = width * targetScale;
  const scaledHeight = height * targetScale;

  // NEW: watch the iframe’s URL (same-origin only)
  useEffect(() => {
    if (!watchLocation) return;
    const id = setInterval(() => {
      const w = iframeRef.current?.contentWindow;
      if (!w) return;
      try {
        const { pathname, search, hash } = w.location;
        const combined = `${pathname}${search}${hash}`;
        if (combined && onLocationChange) onLocationChange(combined);
      } catch {
        // If cross-origin ever happens, ignore.
      }
    }, 500);
    return () => clearInterval(id);
  }, [watchLocation, onLocationChange]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-3"
      style={{
        background: INTEGRITY_COLORS.burgundy,
        border: `1px solid ${INTEGRITY_COLORS.gold}`,
        boxShadow: `0 0 0 1px rgba(255,215,0,0.35), 0 8px 28px rgba(0,0,0,0.35)`,
      }}
    >
      <div
        className="flex items-center justify-between gap-3 mb-3"
        style={{ color: INTEGRITY_COLORS.gold }}
      >
        <div className="text-sm font-semibold tracking-wide">
          Integrity Streaming — {title}
        </div>
        {showScaleBadge && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: `1px solid ${INTEGRITY_COLORS.gold}`,
              color: INTEGRITY_COLORS.ivory,
            }}
          >
            {Math.round(targetScale * 100)}%
          </span>
        )}
      </div>

      <div
        className="mx-auto"
        style={{
          width: scaledWidth,
          height: scaledHeight + 36,
          background: INTEGRITY_COLORS.dark,
          border: `1px solid ${INTEGRITY_COLORS.gold}`,
          borderRadius: 22,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="w-full flex items-center justify-center text-xs"
          style={{
            height: 36,
            background:
              "linear-gradient(180deg, rgba(255,215,0,0.18), rgba(255,215,0,0.06))",
            color: INTEGRITY_COLORS.ivory,
            borderBottom: `1px solid ${INTEGRITY_COLORS.gold}`,
            letterSpacing: 0.4,
          }}
        >
          {title} — {width}×{height}
        </div>

        <div
          style={{
            width,
            height,
            transform: `scale(${targetScale})`,
            transformOrigin: "top left",
            background: "#ffffff",
          }}
        >
          <iframe
            ref={iframeRef}
            id={frameId}
            title={title}
            src={`${origin}${safePath}`}
            style={{
              width,
              height,
              border: "0",
              background: "#ffffff",
            }}
          />
        </div>
      </div>
    </div>
  );
}
