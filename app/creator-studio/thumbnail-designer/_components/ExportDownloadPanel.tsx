"use client";
export default function ExportDownloadPanel() {
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
