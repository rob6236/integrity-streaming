"use client";

import { useState } from "react";
import type { CommentThread } from "./ThreadsList";

const gold = "#FFD700";

export default function ModerationActions({
  thread,
  onAction,
}: {
  thread: CommentThread;
  onAction: (action: { type: "pin" | "hide" | "delete" | "block"; value?: boolean }) => void;
}) {
  const [pin, setPin] = useState(thread.pinned);
  const [hide, setHide] = useState(thread.hidden);
  const [block, setBlock] = useState(thread.blockedUser);

  const applyToggle = (type: "pin" | "hide" | "block", value: boolean) => {
    if (type === "pin") setPin(value);
    if (type === "hide") setHide(value);
    if (type === "block") setBlock(value);
    onAction({ type, value });
  };

  const del = () => {
    if (confirm("Delete this thread? This action cannot be undone.")) {
      onAction({ type: "delete" });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3" style={{ color: gold }}>Moderation</h3>

      <div className="grid gap-3">
        <Toggle label="Pin thread" checked={pin} onChange={(v) => applyToggle("pin", v)} />
        <Toggle label="Hide thread" checked={hide} onChange={(v) => applyToggle("hide", v)} />
        <Toggle label="Block user" checked={block} onChange={(v) => applyToggle("block", v)} />
      </div>

      <div className="mt-4">
        <button onClick={del} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
          Delete Thread
        </button>
      </div>

      <div className="text-sm opacity-80 mt-3">
        Next step: wire to Firestore security rules (e.g., hidden/blocked flags) and
        Cloud Function to auto-hide toxic comments.
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl p-3 border" style={{ borderColor: gold }}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
