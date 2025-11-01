// app/creator-studio/thumbnail-designer/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import { ref as storageRef, uploadString } from "firebase/storage";

import ThumbnailCanvas from "./_components/ThumbnailCanvas";
import TextOverlayControls from "./_components/TextOverlayControls";
import ImageAssetsPanel from "./_components/ImageAssetsPanel";
import ExportDownloadPanel from "./_components/ExportDownloadPanel";
import AIThumbnailPrompt from "./_components/AIThumbnailPrompt";

/* Force link/placeholder colors to white on this page */
function WhiteTextFix() {
  return (
    <style jsx global>{`
      a { color: #fff !important; }
      a:hover { opacity: 0.88; }
      input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.45); }
      select { color: #fff; background: rgba(0,0,0,0.4); }
      option { color: #000; }
    `}</style>
  );
}

export type Aspect = "16:9" | "9:16";

export default function ThumbnailDesignerPage() {
  const router = useRouter();

  // Auth gate
  const [checking, setChecking] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        setUid(u.uid);
        setUserEmail(u.email ?? null);
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  // Designer state
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [timeSec, setTimeSec] = useState<number>(0);
  const [aspect, setAspect] = useState<Aspect>("16:9");

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [titleSize, setTitleSize] = useState<number>(64);
  const [subtitleSize, setSubtitleSize] = useState<number>(36);
  const [stroke, setStroke] = useState<boolean>(true);

  const [logoUrl, setLogoUrl] = useState<string>(""); // optional overlay image

  const [captureDataUrl, setCaptureDataUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedPath, setSavedPath] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const canvasSize = useMemo(
    () => (aspect === "16:9" ? { w: 1280, h: 720 } : { w: 1080, h: 1920 }),
    [aspect]
  );

  function fail(msg: string) {
    setError(msg);
  }

  async function handleSaveToStorage() {
    if (!uid) return;
    if (!captureDataUrl) return fail("Capture a thumbnail first.");
    try {
      setSaving(true);
      setSavedPath(null);
      const path = `users/${uid}/thumbnails/${Date.now()}.png`;
      const ref = storageRef(storage, path);
      await uploadString(ref, captureDataUrl, "data_url");
      setSavedPath(path);
    } catch (e: any) {
      fail(e?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleDownloadPng() {
    if (!captureDataUrl) return;
    const a = document.createElement("a");
    a.href = captureDataUrl;
    a.download = `thumbnail-${aspect.replace(":", "x")}.png`;
    a.click();
  }

  if (checking) return <div className="p-6 text-white/90">Checking your session…</div>;

  return (
    <>
      <WhiteTextFix />
      <div className="p-6">
        {/* Header */}
        <div className="mb-5 grid grid-cols-3 items-center">
          <div />
          <h1 className="text-center text-2xl font-semibold text-white">Thumbnail Designer</h1>
          <div className="text-right text-sm text-white/70">Signed in as {userEmail ?? "unknown"}</div>
        </div>

        <div className="rounded-2xl border border-[var(--gold,#FFD700)]/80 bg-black/15 p-0 shadow-[0_0_0_1px_rgba(255,215,0,0.4)]">
          <div className="grid gap-6 p-5 md:grid-cols-[1.2fr,1fr] md:p-6">
            {/* Left: Canvas + export */}
            <div>
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-white/70">Aspect</label>
                  <select
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value as Aspect)}
                    className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-2 text-sm outline-none focus:border-[var(--gold,#FFD700)]/70"
                  >
                    <option value="16:9">16:9 (1280×720)</option>
                    <option value="9:16">9:16 (1080×1920)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/70">Time (seconds)</label>
                  <input
                    type="number"
                    min={0}
                    value={timeSec}
                    onChange={(e) => setTimeSec(Number(e.target.value || 0))}
                    className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
                  />
                </div>
              </div>

              <label className="mb-1 block text-xs text-white/70">Video URL (Firebase Storage)</label>
              <input
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://firebasestorage.googleapis.com/..."
                className="mb-3 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
              />

              <ThumbnailCanvas
                size={canvasSize}
                aspect={aspect}
                sourceUrl={sourceUrl}
                timeSec={timeSec}
                title={title}
                subtitle={subtitle}
                titleSize={titleSize}
                subtitleSize={subtitleSize}
                stroke={stroke}
                logoUrl={logoUrl}
                onCaptured={(url) => {
                  setError("");
                  setSavedPath(null);
                  setCaptureDataUrl(url);
                }}
                onError={fail}
              />

              <ExportDownloadPanel
                dataUrl={captureDataUrl}
                saving={saving}
                onDownload={handleDownloadPng}
                onSave={handleSaveToStorage}
                onOpenEditorHref="/creator-studio/editor"
              />

              {error && (
                <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}
              {savedPath && (
                <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  Saved to: <span className="font-mono">{savedPath}</span>
                </div>
              )}
            </div>

            {/* Right: Controls */}
            <div className="space-y-4">
              <TextOverlayControls
                title={title}
                subtitle={subtitle}
                titleSize={titleSize}
                subtitleSize={subtitleSize}
                stroke={stroke}
                onChange={({ title, subtitle, titleSize, subtitleSize, stroke }) => {
                  if (title !== undefined) setTitle(title);
                  if (subtitle !== undefined) setSubtitle(subtitle);
                  if (titleSize !== undefined) setTitleSize(titleSize);
                  if (subtitleSize !== undefined) setSubtitleSize(subtitleSize);
                  if (stroke !== undefined) setStroke(stroke);
                }}
              />

              <ImageAssetsPanel
                logoUrl={logoUrl}
                onLogoUrl={(u) => setLogoUrl(u)}
              />

              <AIThumbnailPrompt
                onApplySuggestion={(suggestion) => {
                  // Simple apply: fill title/subtitle from AI suggestion
                  if (suggestion.title) setTitle(suggestion.title);
                  if (suggestion.subtitle) setSubtitle(suggestion.subtitle);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-white/50">
          Tip: Use high contrast and large faces. YouTube recommends 1280×720 for 16:9.
        </div>
      </div>
    </>
  );
}
