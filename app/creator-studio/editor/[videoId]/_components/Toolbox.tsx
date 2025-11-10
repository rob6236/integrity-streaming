"use client";

export default function Toolbar() {
  return (
    <div className="w-full mb-2 flex flex-wrap items-center gap-2">
      <button className="px-3 py-1 rounded bg-white text-black">Blade (B)</button>
      <button className="px-3 py-1 rounded bg-white text-black">Ripple Delete</button>
      <button className="px-3 py-1 rounded bg-white text-black">Undo (Ctrl/Cmd+Z)</button>
      <button className="px-3 py-1 rounded bg-white text-black">Redo (Ctrl/Cmd+Y)</button>
      <div className="ml-auto flex items-center gap-2 text-sm opacity-80">
        <span>J/K/L</span>
        <span>I/O</span>
        <span>M</span>
      </div>
    </div>
  );
}
