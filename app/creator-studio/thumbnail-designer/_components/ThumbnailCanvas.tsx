"use client";
import { useRef, useEffect } from "react";

export default function ThumbnailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#7B0F24";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FFD700";
    ctx.font = "24px sans-serif";
    ctx.fillText("Thumbnail Canvas", 20, 40);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={960}
      height={540}
      className="w-full rounded-2xl border border-yellow-400"
    />
  );
}
