"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

/* Force white link/placeholder text (theme helper) */
function WhiteTextFix() {
  return (
    <style jsx global>{`
      a { color: #fff !important; }
      a:hover { opacity: 0.88; }
      input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
    `}</style>
  );
}

/* ---------- Inline, guaranteed-valid client components ---------- */

function TextOverlayControlsInline() {
  const [text, setText] = useState("");
  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">Text Overlay</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your title text"
        className="w-full rounded-xl bg-transparent border border-yellow-400 px-3 py-2 outline-none"
      />
      <p className="text-xs opacity-70 mt-2">Preview text: {text || "—"}</p>
    </div>
  );
}

function AIThumbnailPromptInline() {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">AI Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the thumbnail you want…"
        className="w-full h-24 rounded-xl bg-transparent border border-yellow-400 px-3 py-2 outline-none"
      />
      <button
        type="button"
        className="mt-2 px-4 py-2 rounded-xl border border-yellow-400"
        onClick={() => alert(`Pretend-generate: ${prompt || "(empty)"}`)}
      >
        Generate Idea
      </button>
    </div>
  );
}

function ThumbnailCanvasInline() {
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

function ImageAssetsPanelInline() {
  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">Image Assets</h2>
      <p className="opacity-80 text-sm">Upload/select images here (placeholder).</p>
    </div>
  );
}

function ExportDownloadPanelInline() {
  return (
    <div className="rounded-2xl border border-yellow-400 p-3">
      <h2 className="font-bold mb-2">Export</h2>
      <button
        type="button"
        className="px-4 py-2 rounded-xl border border-yellow-400"
        onClick={() => alert("Export placeholder")}
      >
        Download PNG
      </button>
    </div>
  );
}

/* ------------------------- Page ------------------------- */
export default function ThumbnailDesignerPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
      else setReady(true);
    });
    return () => unsub();
  }, [router]);

  if (!ready) {
    return (
      <>
        <WhiteTextFix />
        <div className="p-6 text-white">Loading…</div>
      </>
    );
  }

  return (
    <>
      <WhiteTextFix />
      <div className="p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Thumbnail Designer</h1>
          <div className="flex gap-3">
            <Link href="/creator-studio" className="px-4 py-2 rounded-xl border border-yellow-400">Back to Studio</Link>
            <Link href="/" className="px-4 py-2 rounded-xl border border-yellow-400">Home</Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 space-y-4">
            <TextOverlayControlsInline />
            <AIThumbnailPromptInline />
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="rounded-2xl border border-yellow-400 p-2">
              <ThumbnailCanvasInline />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 space-y-4">
            <ImageAssetsPanelInline />
            <ExportDownloadPanelInline />
          </div>
        </div>
      </div>
    </>
  );
}
