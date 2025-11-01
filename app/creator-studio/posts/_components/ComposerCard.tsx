"use client";

import { useRef, useState } from "react";
import SchedulePicker from "./SchedulePicker";

export type DraftPost = {
  text: string;
  media?: { url: string; type: "image" | "video" } | null;
  scheduledFor?: number | null; // timestamp
};

export type Post = {
  id: string;
  text: string;
  media: DraftPost["media"] | null;
  createdAt: number;
  scheduledFor: number | null;
  stats: { likes: number; comments: number; reposts: number; impressions: number; clickThroughs: number };
};

const gold = "#FFD700";

export default function ComposerCard({ onSubmit }: { onSubmit: (draft: DraftPost) => void }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<DraftPost["media"]>(null);
  const [scheduledFor, setScheduledFor] = useState<number | null>(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const pickFile = () => fileRef.current?.click();
  const handleFile = async (file: File) => {
    // Placeholder: just create an object URL locally.
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";
    setMedia({ url, type });
  };

  const postNow = () => {
    if (!text.trim() && !media) return alert("Write something or add media.");
    onSubmit({ text, media, scheduledFor: null });
    setText(""); setMedia(null); setScheduledFor(null);
  };

  const schedule = () => {
    if (!text.trim() && !media) return alert("Write something or add media.");
    if (!scheduledFor) return setOpenSchedule(true);
    onSubmit({ text, media, scheduledFor });
    setText(""); setMedia(null); setScheduledFor(null);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Compose</h2>

      <textarea
        className="w-full rounded-xl p-3 text-black min-h-[110px]"
        placeholder="Share an update with your audience…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Media preview */}
      {media && (
        <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: gold }}>
          {media.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.url} alt="attached" className="w-full max-h-[320px] object-contain bg-black/50" />
          ) : (
            <video src={media.url} controls className="w-full max-h-[320px] object-contain bg-black/50" />
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <button onClick={pickFile} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
          Add Image/Video
        </button>

        <button onClick={() => setOpenSchedule(true)} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
          {scheduledFor ? `Scheduled: ${new Date(scheduledFor).toLocaleString()}` : "Schedule"}
        </button>

        <div className="ml-auto flex gap-2">
          <button onClick={postNow} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
            Post Now
          </button>
          <button onClick={schedule} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
            Save Schedule
          </button>
        </div>
      </div>

      {/* Schedule picker popover */}
      {openSchedule && (
        <SchedulePicker
          initialDate={scheduledFor || Date.now() + 60 * 60 * 1000}
          onClose={() => setOpenSchedule(false)}
          onSave={(ts) => { setScheduledFor(ts); setOpenSchedule(false); }}
        />
      )}

      <div className="text-sm opacity-80 mt-2">
        Tip: Scheduling stores the timestamp for later publishing (wire to a Cloud Function/Worker).
      </div>
    </div>
  );
}
