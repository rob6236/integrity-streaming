// Time helpers
export function toSeconds(h: number, m: number, s: number, ms: number) {
  return h * 3600 + m * 60 + s + ms / 1000;
}

export function parseSRT(raw: string) {
  // Minimal SRT parser
  const blocks = raw.replace(/\r/g, "").trim().split(/\n\n+/);
  const items = [];
  for (const b of blocks) {
    const lines = b.split("\n");
    // First line may be index, ignore if numeric
    let i = 0;
    if (/^\d+$/.test(lines[0]?.trim() || "")) i = 1;
    const timing = lines[i++]?.trim() || "";
    const m = timing.match(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
    );
    if (!m) continue;
    const start = toSeconds(+m[1], +m[2], +m[3], +m[4]);
    const end = toSeconds(+m[5], +m[6], +m[7], +m[8]);
    const text = lines.slice(i).join("\n");
    items.push({ id: crypto.randomUUID(), start, end, text });
  }
  return items;
}

export function parseVTT(raw: string) {
  const cleaned = raw.replace(/\r/g, "");
  const lines = cleaned.split("\n");
  const items: { id: string; start: number; end: number; text: string }[] = [];
  let i = 0;

  // Skip WEBVTT header
  if (lines[i]?.toUpperCase().includes("WEBVTT")) i++;

  while (i < lines.length) {
    // Skip comments and blank lines
    while (i < lines.length && !lines[i].match(/\d{2}:\d{2}:\d{2}\.\d{3}/)) i++;
    if (i >= lines.length) break;

    const timing = lines[i++];
    const m = timing.match(
      /(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/
    );
    if (!m) continue;
    const start = toSeconds(+m[1], +m[2], +m[3], +m[4]);
    const end = toSeconds(+m[5], +m[6], +m[7], +m[8]);

    const textLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      textLines.push(lines[i++]);
    }
    // consume blank
    while (i < lines.length && lines[i].trim() === "") i++;

    items.push({ id: crypto.randomUUID(), start, end, text: textLines.join("\n") });
  }
  return items;
}
