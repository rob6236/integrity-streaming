// app/creator-studio/thumbnail-designer/_components/ImageAssetsPanel.tsx
"use client";

type Props = {
  logoUrl: string;
  onLogoUrl: (url: string) => void;
};

export default function ImageAssetsPanel({ logoUrl, onLogoUrl }: Props) {
  return (
    <div className="rounded-xl border border-[var(--gold,#FFD700)]/60 bg-black/20 p-4">
      <div className="mb-3 text-sm font-semibold text-white">Image Assets</div>

      <label className="mb-1 block text-xs text-white/70">Logo / Watermark (optional)</label>
      <input
        value={logoUrl}
        onChange={(e) => onLogoUrl(e.target.value)}
        placeholder="https://…/logo.png"
        className="mb-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
      />
      <div className="text-xs text-white/60">
        The image will be placed in the bottom-left corner and scaled automatically.
      </div>
    </div>
  );
}
