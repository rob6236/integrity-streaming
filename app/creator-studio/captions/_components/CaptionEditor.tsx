"use client";
import { useMemo, useState } from "react";

export type CaptionItem = {
  id: string;
  start: number; // seconds
  end: number;   // seconds
  text: string;
};

type Props = {
  captions: CaptionItem[];
  onChange: (next: CaptionItem[]) => void;
  onJump: (time: number) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

function fmt(t: number) {
  if (!isFinite(t)) return "00:00.000";
  const ms = Math.floor((t % 1) * 1000);
  const s = Math.floor(t) % 60;
  const m = Math.floor(t / 60);
  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");
  return `${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

export default function CaptionEditor({
  captions,
  onChange,
  onJump,
  selectedId,
  setSelectedId,
}: Props) {
  const [newText, setNewText] = useState("");

  const selected = useMemo(
    () => captions.find((c) => c.id === selectedId) || null,
    [captions, selectedId]
  );

  const addCaption = () => {
    const id = crypto.randomUUID();
    const lastEnd = captions.length ? captions[captions.length - 1].end : 0;
    const next = [
      ...captions,
      { id, start: lastEnd, end: lastEnd + 2, text: newText || "New caption" },
    ];
    onChange(next);
    setSelectedId(id);
    setNewText("");
  };

  const update = (id: string, patch: Partial<CaptionItem>) => {
    onChange(captions.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const remove = (id: string) => {
    const idx = captions.findIndex((c) => c.id === id);
    const next = captions.filter((c) => c.id !== id);
    onChange(next);
    if (selectedId === id) {
      const fallback = next[Math.max(0, idx - 1)];
      setSelectedId(fallback?.id || null);
    }
  };

  return (
    <div>
      <div className="flex items-end gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm opacity-80 mb-1">Add caption</label>
          <input
            className="w-full rounded-lg px-3 py-2 text-black"
            placeholder="Write text for a new caption…"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>
        <button
          onClick={addCaption}
          className="rounded-lg px-4 py-2 border"
          style={{ borderColor: "#FFD700" }}
        >
          + Add
        </button>
      </div>

      <div className="text-sm opacity-80 mb-2">
        Tip: Select a row, play the video, then use “Set Start/End” under the timeline.
      </div>

      <div className="grid gap-2">
        {captions.map((c) => {
          const isActive = c.id === selectedId;
          return (
            <div
              key={c.id}
              className={`rounded-xl p-3 border transition-all ${
                isActive ? "ring-2" : ""
              }`}
              style={{
                borderColor: "#FFD700",
                boxShadow: isActive ? "0 0 0 1px rgba(255,215,0,0.6)" : undefined,
              }}
              onClick={() => setSelectedId(c.id)}
            >
              <div className="flex items-center gap-2 mb-2 text-sm">
                <button
                  className="rounded px-2 py-1 border"
                  style={{ borderColor: "#FFD700" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onJump(c.start);
                  }}
                >
                  ▶ Start {fmt(c.start)}
                </button>
                <button
                  className="rounded px-2 py-1 border"
                  style={{ borderColor: "#FFD700" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onJump(Math.max(c.end - 0.2, 0));
                  }}
                >
                  ▶ End {fmt(c.end)}
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    className="rounded px-2 py-1 border"
                    style={{ borderColor: "#FFD700" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(c.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  className="rounded px-2 py-1 text-black"
                  title="Start (seconds)"
                  value={c.start}
                  onChange={(e) => update(c.id, { start: Number(e.target.value) || 0 })}
                  type="number"
                  step="0.01"
                  min={0}
                />
                <input
                  className="rounded px-2 py-1 text-black"
                  title="End (seconds)"
                  value={c.end}
                  onChange={(e) => update(c.id, { end: Number(e.target.value) || 0 })}
                  type="number"
                  step="0.01"
                  min={0}
                />
                <input
                  className="rounded px-2 py-1 text-black col-span-3 md:col-span-1"
                  title="Text"
                  value={c.text}
                  onChange={(e) => update(c.id, { text: e.target.value })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
