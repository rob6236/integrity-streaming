// app/creator-studio/thumbnail-designer/_components/ExportDownloadPanel.tsx
"use client";

import Link from "next/link";

type Props = {
  dataUrl: string | null;
  saving: boolean;
  onDownload: () => void;
  onSave: () => void;
  onOpenEditorHref: string;
};

export default function ExportDownloadPanel({
  dataUrl,
  saving,
  onDownload,
  onSave,
  onOpenEditorHref,
}: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        onClick={onDownload}
        disabled={!dataUrl}
        className="rounded-md border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Download PNG
      </button>
      <button
        onClick={onSave}
        disabled={!dataUrl || saving}
        className="rounded-md border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save to Storage"}
      </button>
      <Link
        href={onOpenEditorHref}
        className="rounded-md border border-white/20 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/55"
      >
        Open Editor
      </Link>
    </div>
  );
}
