// app/creator-studio/thumbnail-designer/_components/ThumbnailCanvas.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Aspect } from "../page";

type Props = {
  size: { w: number; h: number };
  aspect: Aspect;
  sourceUrl: string;
  timeSec: number;
  title: string;
  subtitle: string;
  titleSize: number;
  subtitleSize: number;
  stroke: boolean;
  logoUrl?: string;
  onCaptured: (dataUrl: string) => void;
  onError: (msg: string) => void;
};

export default function ThumbnailCanvas({
  size,
  aspect,
  sourceUrl,
  timeSec,
  title,
  subtitle,
  titleSize,
  subtitleSize,
  stroke,
  logoUrl,
  onCaptured,
  onError,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [duration, setDuration] = useState<number>(0);

  // Load metadata -> set duration
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 0);
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, [sourceUrl]);

  // Seek to requested time whenever timeSec changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = Math.max(0, Math.min(timeSec, duration || timeSec));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSec]);

  async function draw() {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;

    try {
      const ctx = c.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported.");

      c.width = size.w;
      c.height = size.h;

      const vw = v.videoWidth || 1280;
      const vh = v.videoHeight || 720;
      const targetRatio = size.w / size.h;
      const videoRatio = vw / vh;

      let sx = 0, sy = 0, sw = vw, sh = vh;
      if (videoRatio > targetRatio) {
        const newW = vh * targetRatio;
        sx = (vw - newW) / 2;
        sw = newW;
      } else if (videoRatio < targetRatio) {
        const newH = vw / targetRatio;
        sy = (vh - newH) / 2;
        sh = newH;
      }

      ctx.drawImage(v, sx, sy, sw, sh, 0, 0, size.w, size.h);

      // Overlay gradient for readability
      const gradH = Math.round(size.h * 0.42);
      const grad = ctx.createLinearGradient(0, size.h - gradH, 0, size.h);
      grad.addColorStop(0, "rgba(0,0,0,0.0)");
      grad.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, size.h - gradH, size.w, gradH);

      // Optional logo (bottom-left)
      if (logoUrl) {
        const img = await loadImage(logoUrl);
        const targetH = Math.round(size.h * 0.12);
        const scale = targetH / img.height;
        const lw = Math.round(img.width * scale);
        const lh = targetH;
        ctx.drawImage(img, 18, size.h - lh - 18, lw, lh);
      }

      // Text
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      if (title.trim()) {
        ctx.font = `bold ${titleSize}px ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial`;
        if (stroke) {
          ctx.lineWidth = Math.max(2, Math.floor(titleSize * 0.08));
          ctx.strokeStyle = "rgba(0,0,0,0.85)";
          ctx.strokeText(title, size.w / 2, size.h - 80);
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(title, size.w / 2, size.h - 80);
      }

      if (subtitle.trim()) {
        ctx.font = `600 ${subtitleSize}px ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial`;
        if (stroke) {
          ctx.lineWidth = Math.max(2, Math.floor(subtitleSize * 0.08));
          ctx.strokeStyle = "rgba(0,0,0,0.85)";
          ctx.strokeText(subtitle, size.w / 2, size.h - 28);
        }
        ctx.fillStyle = "#FFD700";
        ctx.fillText(subtitle, size.w / 2, size.h - 28);
      }

      onCaptured(c.toDataURL("image/png"));
    } catch (e: any) {
      onError(e?.message ?? "Capture failed.");
    }
  }

  // Draw whenever inputs change
  useEffect(() => {
    if (!sourceUrl) return;
    // draw after the current frame is seeked/painted
    const id = setTimeout(draw, 80);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceUrl, timeSec, aspect, title, subtitle, titleSize, subtitleSize, stroke, logoUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        crossOrigin="anonymous"
        src={sourceUrl || undefined}
        controls
        className="mb-3 h-60 w-full rounded-lg border border-white/15 bg-black object-contain"
      />
      <div className="rounded-md border border-white/15 bg-black/30 p-2">
        <canvas
          ref={canvasRef}
          width={size.w}
          height={size.h}
          className="h-auto w-full rounded"
        />
      </div>
      <div className="mt-2 text-right text-xs text-white/60">
        Canvas size: {size.w}×{size.h} ({aspect})
      </div>
    </div>
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}
