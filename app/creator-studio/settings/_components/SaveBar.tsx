// app/creator-studio/settings/_components/SaveBar.tsx
"use client";

import { useEffect, useState } from "react";

const burgundy = "#7B0F24";
const gold = "#FFD700";

type Props = {
  dirty: boolean;
  saving: boolean;
  onSave: () => Promise<void> | void;
  onReset: () => void;
};

export default function SaveBar({ dirty, saving, onSave, onReset }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(dirty);
  }, [dirty]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-0 right-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="mx-auto max-w-6xl rounded-t-2xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between"
        style={{
          background: burgundy,
          borderTop: `2px solid ${gold}`,
          boxShadow:
            "0 -8px 32px rgba(0,0,0,0.35), 0 -1px 0 rgba(255,215,0,0.35) inset",
        }}
      >
        <span className="text-white/90 text-sm">
          {saving ? "Saving changes…" : "You have unsaved changes"}
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-xl text-sm"
            style={{
              background: "rgba(0,0,0,0.25)",
              color: "#FFF",
              border: `1px solid ${gold}`,
            }}
          >
            Discard
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave()}
            className="px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-70"
            style={{
              background: gold,
              color: burgundy,
              boxShadow:
                "0 0 0 1px rgba(123,15,36,0.45) inset, 0 6px 18px rgba(255,215,0,0.25)",
            }}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
