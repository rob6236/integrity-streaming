// app/creator-studio/upload/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, storage, db } from "@/lib/firebase";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

/** ---- Config (tweak if you want) ---- */
const MAX_SIZE_BYTES = 1_000 * 1024 * 1024; // ~1 GB
const ACCEPTED_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"];

export default function UploadPage() {
  const router = useRouter();

  // Auth gate
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // UI state
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const taskRef = useRef<ReturnType<typeof uploadBytesResumable> | null>(null);

  /** ---- Auth check ---- */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUid(u.uid);
      setUserEmail(u.email ?? null);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, [router]);

  /** ---- Helpers ---- */
  function fail(msg: string) {
    setError(msg);
    setUploading(false);
    setProgress(0);
    taskRef.current = null;
  }

  function validate(selected: File) {
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      throw new Error("Unsupported file type. Please upload MP4, WebM, MOV, or MKV.");
    }
    if (selected.size > MAX_SIZE_BYTES) {
      throw new Error("File is too large. The limit is ~1 GB for this uploader.");
    }
  }

  function handleChoose() {
    inputRef.current?.click();
  }

  function onFilesPicked(f: File | null) {
    setError("");
    setDownloadURL(null);
    setProgress(0);
    setFile(f);
    if (f && !title) {
      setTitle(f.name.replace(/\.[^.]+$/, "")); // default title from filename
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) onFilesPicked(f);
  }

  async function startUpload() {
    try {
      if (!uid) return;
      if (!file) throw new Error("Please choose a video to upload.");
      validate(file);

      setUploading(true);
      setError("");

      const path = `users/${uid}/uploads/${Date.now()}-${file.name}`;
      const ref = storageRef(storage, path);

      const task = uploadBytesResumable(ref, file, { contentType: file.type });
      taskRef.current = task;

      task.on(
        "state_changed",
        (snap) => {
          const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(pct);
        },
        (err) => {
          console.error(err);
          fail(err.message || "Upload failed.");
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            setDownloadURL(url);

            await addDoc(collection(db, "videos"), {
              uid,
              email: userEmail ?? null,
              title: title || file.name,
              description: description || "",
              status: "uploaded", // future: processing, ready, etc.
              storagePath: path,
              downloadURL: url,
              size: file.size,
              contentType: file.type,
              createdAt: serverTimestamp(),
            });

            setUploading(false);
            setProgress(100);
          } catch (e: any) {
            fail(e?.message ?? "Could not save metadata.");
          }
        }
      );
    } catch (e: any) {
      fail(e?.message ?? "Upload aborted.");
    }
  }

  function cancelUpload() {
    try {
      taskRef.current?.cancel();
      fail("Upload canceled.");
    } catch {
      // ignore
    }
  }

  if (checkingAuth) {
    return <div className="p-6 text-white/90">Checking your session…</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-5 grid grid-cols-3 items-center">
        <div />
        <h1 className="text-center text-2xl font-semibold text-white">Upload</h1>
        <div className="text-right text-sm text-white/70">Signed in as {userEmail ?? "unknown"}</div>
      </div>

      <div className="rounded-2xl border border-[var(--gold,#FFD700)]/80 bg-black/15 p-0 shadow-[0_0_0_1px_rgba(255,215,0,0.4)]">
        <div className="grid gap-6 p-5 md:grid-cols-[1.2fr,1fr] md:p-6">
          {/* Left: Dropzone */}
          <div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--gold,#FFD700)]/70 bg-black/20 px-6 py-10 text-center hover:bg-black/25"
              onClick={handleChoose}
              role="button"
              aria-label="Choose video file"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? handleChoose() : undefined)}
            >
              <div className="text-lg font-semibold text-white">Drag & Drop your video</div>
              <div className="mt-1 text-sm text-white/70">or click to browse</div>
              <div className="mt-3 text-[12px] text-white/60">
                Accepted: MP4, WebM, MOV, MKV • Max ~1 GB
              </div>

              {file && (
                <div className="mt-5 max-w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-left text-sm text-white/90">
                  <div className="truncate font-medium">{file.name}</div>
                  <div className="text-white/70">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB • {file.type || "video"}
                  </div>
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => onFilesPicked(e.target.files?.[0] ?? null)}
            />

            {/* Progress */}
            {uploading && (
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                  <span>Uploading…</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-[var(--gold,#FFD700)]/60 bg-black/30">
                  <div
                    className="h-full bg-[var(--gold,#FFD700)] transition-[width]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={cancelUpload}
                    className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Success */}
            {downloadURL && !uploading && (
              <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                Upload complete.{" "}
                <Link
                  href="/creator-studio/content-library"
                  className="underline decoration-[var(--gold,#FFD700)] underline-offset-2 hover:opacity-90"
                >
                  Go to Content Library
                </Link>
              </div>
            )}
          </div>

          {/* Right: Metadata form */}
          <div className="rounded-xl border border-[var(--gold,#FFD700)]/60 bg-black/20 p-4">
            <div className="mb-3 text-sm font-semibold text-white">Details</div>

            <label className="mb-2 block text-xs text-white/70">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title"
              className="mb-4 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
            />

            <label className="mb-2 block text-xs text-white/70">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about your video"
              rows={6}
              className="mb-4 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
            />

            <div className="flex items-center gap-2">
              <button
                disabled={!file || uploading}
                onClick={startUpload}
                className="rounded-md border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-4 py-2 text-sm font-semibold text-[#7B0F24] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? "Uploading…" : "Upload Video"}
              </button>

              <Link
                href="/creator-studio/content-library"
                className="rounded-md border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/50"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-4 text-center text-xs text-white/50">
        After upload, processing (thumbnails, transcodes, captions) can run in the background.
      </div>
    </div>
  );
}
