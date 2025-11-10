"use client";
import React from "react";

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <button className="rounded-lg border border-yellow-500/40 bg-black/30 px-3 py-1 text-sm">
        Cut
      </button>
      <button className="rounded-lg border border-yellow-500/40 bg-black/30 px-3 py-1 text-sm">
        Trim
      </button>
      <button className="rounded-lg border border-yellow-500/40 bg-black/30 px-3 py-1 text-sm">
        Ripple
      </button>

      <div className="ml-auto flex items-center gap-2 text-xs opacity-80">
        <span>Snap</span>
        <input type="checkbox" defaultChecked />
        <span>Magnet</span>
        <input type="checkbox" />
      </div>
    </div>
  );
}
