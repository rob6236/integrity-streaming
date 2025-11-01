// app/creator-studio/thumbnail-designer/_components/TextOverlayControls.tsx
"use client";

type Props = {
  title: string;
  subtitle: string;
  titleSize: number;
  subtitleSize: number;
  stroke: boolean;
  onChange: (p: Partial<Props>) => void;
};

export default function TextOverlayControls({
  title,
  subtitle,
  titleSize,
  subtitleSize,
  stroke,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-[var(--gold,#FFD700)]/60 bg-black/20 p-4">
      <div className="mb-3 text-sm font-semibold text-white">Text Overlay</div>

      <label className="mb-1 block text-xs text-white/70">Title</label>
      <input
        value={title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="Amazing Video Title"
        className="mb-3 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
      />

      <label className="mb-1 block text-xs text-white/70">Subtitle</label>
      <input
        value={subtitle}
        onChange={(e) => onChange({ subtitle: e.target.value })}
        placeholder="Creator • Topic • Year"
        className="mb-3 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-white/70">Title Size</label>
          <input
            type="number"
            min={18}
            value={titleSize}
            onChange={(e) => onChange({ titleSize: Number(e.target.value || 18) })}
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/70">Subtitle Size</label>
          <input
            type="number"
            min={12}
            value={subtitleSize}
            onChange={(e) => onChange({ subtitleSize: Number(e.target.value || 12) })}
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
          />
        </div>
      </div>

      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-white/85">
        <input
          type="checkbox"
          checked={stroke}
          onChange={(e) => onChange({ stroke: e.target.checked })}
        />
        Add dark outline for readability
      </label>
    </div>
  );
}
