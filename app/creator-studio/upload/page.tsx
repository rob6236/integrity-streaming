// app/creator-studio/upload/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type Visibility = "public" | "unlisted" | "private";

export default function UploadPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("General");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [thumbFile, setThumbFile] = useState<File | null>(null);

  // Video (stub)
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string>("");

  // UI state
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Auth gate
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUserEmail(u.email ?? null);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, [router]);

  const tagList = useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags]
  );

  function onPickThumb(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setThumbFile(file);
  }

  function onPickVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setVideoFile(file);
    setVideoName(file ? file.name : "");
  }

  function validate(): string[] {
    const errs: string[] = [];
    if (!title.trim()) errs.push("Title is required.");
    if (!description.trim()) errs.push("Description is required.");
    if (!videoFile) errs.push("Please select a video (stub for Cloudflare Stream).");
    return errs;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg("");
    const v = validate();
    setErrors(v);
    if (v.length) return;

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        tags: tagList,
        category,
        visibility,
        hasThumb: !!thumbFile,
        videoName,
        userEmail,
      };
      console.log("Upload draft payload:", payload);
      await new Promise((r) => setTimeout(r, 800));
      setSuccessMsg("Draft created locally (stub). We’ll wire Stream + Firestore next.");
    } catch {
      setErrors(["Unexpected error. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingAuth) return <div className="p-6 text-white/90">Checking your session…</div>;

  return (
    <div className="p-6">
      {/* Centered title row */}
      <div className="mb-5 grid grid-cols-3 items-center">
        <div />
        <h1 className="text-center text-2xl font-semibold text-white">Upload</h1>
        <div className="text-right text-sm text-white/70">Signed in as {userEmail ?? "unknown"}</div>
      </div>

      {/* Card */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-[var(--gold,#FFD700)]/80 bg-black/20 p-0 shadow-[0_0_0_1px_rgba(255,215,0,0.4)]"
      >
        <div className="p-5 md:p-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT: Video + Description */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white">Video</label>

              <div className="rounded-xl border border-[var(--gold,#FFD700)]/60 bg-black/30 p-4">
                {!videoFile ? (
                  <div className="flex flex-col items-center justify-center gap-6 py-10">
                    <div className="text-center text-white/80">
                      Select a video file to upload (Cloudflare Stream **placeholder**).
                    </div>

                    {/* Buttons row with bulletproof spacing */}
                    <div className="flex items-center">
                      <label
                        className="inline-flex cursor-pointer rounded-lg border border-[var(--gold,#FFD700)]/80 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                        style={{ marginRight: "24px" }}
                      >
                        Select Video
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={onPickVideo}
                        />
                      </label>
                      <span style={{ display: "inline-block", width: "12px" }} />
                      <button
                        type="button"
                        onClick={() => alert("Cloudflare Stream picker coming next phase.")}
                        className="rounded-lg border border-[var(--gold,#FFD700)]/40 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
                      >
                        Use Stream Picker (stub)
                      </button>
                    </div>

                    <p className="text-xs text-white/60">
                      In the next step, we’ll swap this for the Cloudflare Stream upload widget / API.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="truncate text-white/90">
                      Selected: <span className="font-medium">{videoName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoName("");
                      }}
                      className="rounded-md border border-red-400/70 px-3.5 py-1.5 text-sm text-red-100 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-7">
                <label className="mb-2 block text-sm font-medium text-white">Description</label>
                <div className="px-4">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Tell viewers what your video is about…"
                    className="w-full rounded-lg border border-[var(--gold,#FFD700)]/60 bg-white px-4 py-3 text-[#111] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold,#FFD700)]/60"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="space-y-6 px-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Title <span className="text-red-300">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video title"
                  className="w-full rounded-lg border border-[var(--gold,#FFD700)]/60 bg-white px-4 py-3 text-[#111] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold,#FFD700)]/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Tags (comma-separated)</label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="news, tech, tutorial"
                  className="w-full rounded-lg border border-[var(--gold,#FFD700)]/60 bg-white px-4 py-3 text-[#111] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold,#FFD700)]/60"
                />
                {tagList.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tagList.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--gold,#FFD700)]/50 px-2 py-0.5 text-xs text-white/80"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[var(--gold,#FFD700)]/60 bg-white px-4 py-3 text-[#111] focus:outline-none focus:ring-2 focus:ring-[var(--gold,#FFD700)]/60"
                >
                  <option className="bg-[#7B0F24] text-white">General</option>
                  <option className="bg-[#7B0F24] text-white">News</option>
                  <option className="bg-[#7B0F24] text-white">Education</option>
                  <option className="bg-[#7B0F24] text-white">Gaming</option>
                  <option className="bg-[#7B0F24] text-white">Lifestyle</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Visibility</label>
                <div className="rounded-lg border border-[var(--gold,#FFD700)]/60 bg-black/30 p-3 text-white/90">
                  {(["public", "unlisted", "private"] as Visibility[]).map((v) => (
                    <label key={v} className="flex items-center gap-2 py-1">
                      <input
                        type="radio"
                        name="visibility"
                        value={v}
                        checked={visibility === v}
                        onChange={() => setVisibility(v)}
                        className="accent-[var(--gold,#FFD700)]"
                      />
                      <span className="capitalize">{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Thumbnail (optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer rounded-lg border border-[var(--gold,#FFD700)]/80 px-4 py-2.5 text-sm text-white hover:bg-white/10">
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={onPickThumb} />
                  </label>
                  <span className="truncate text-white/80">
                    {thumbFile ? thumbFile.name : "No file selected"}
                  </span>
                </div>
              </div>

              {/* Centered, slightly larger, pill-shaped button raised from bottom */}
              <div className="mt-2 mb-8 flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center rounded-full border border-[var(--gold,#FFD700)] bg-[#FFD700] px-7 py-2.5 text-base font-semibold text-[#7B0F24] hover:brightness-95 disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Save Draft"}
                </button>
              </div>

              {errors.length > 0 && (
                <div className="space-y-2 rounded-lg border border-red-400/70 bg-red-500/10 p-3 text-sm text-red-100">
                  {errors.map((e, i) => (
                    <div key={i}>• {e}</div>
                  ))}
                </div>
              )}
              {successMsg && (
                <div className="rounded-lg border border-emerald-400/70 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                {successMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
