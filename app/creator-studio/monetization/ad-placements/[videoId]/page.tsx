"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

type AdBreak = { id: string; time: number; type: "midroll" | "preroll" | "postroll" };

export default function AdPlacementsEditorPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [src, setSrc] = useState("/sample-video.mp4"); // TODO: fetch real source by videoId
  const [breaks, setBreaks] = useState<AdBreak[]>([
    // Example seed
    { id: crypto.randomUUID(), time: 120, type: "midroll" },
  ]);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const t = () => setCur(v.currentTime || 0);
    const m = () => setDur(v.duration || 0);
    v.addEventListener("timeupdate", t);
    v.addEventListener("loadedmetadata", m);
    m();
    return () => { v.removeEventListener("timeupdate", t); v.removeEventListener("loadedmetadata", m); };
  }, []);

  const addMidrollAtCurrent = () =>
    setBreaks((b) => [...b, { id: crypto.randomUUID(), time: cur, type: "midroll" }].sort((a, c) => a.time - c.time));

  const removeBreak = (id: string) => setBreaks((b) => b.filter((x) => x.id !== id));

  const scrub = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = val;
    setCur(val);
  };

  const save = async () => {
    // TODO: save to Firestore at videos/{videoId}/adBreaks
    alert(`Saved ${breaks.length} ad break(s) for ${videoId}`);
    router.push("/creator-studio/monetization");
  };

  return (
    <main className="min-h-screen w-full" style={{ background: burgundy, color: white }}>
      <h1 className="sr-only">Integrity Streaming — Ad Placements Editor</h1>

      <header className="w-full border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: gold }}>
        <div className="text-lg font-semibold">
          Monetization / Ad Placements / <span style={{ color: gold }}>{videoId}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={save} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>Save</button>
        </div>
      </header>

      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        <section className="rounded-2xl p-4 border" style={{ borderColor: gold }}>
          <div className="rounded-xl overflow-hidden bg-black">
            <video ref={videoRef} src={src} controls className="w-full h-[420px] object-contain bg-black" />
          </div>

          <div className="mt-4 text-sm opacity-80">{format(cur)} / {format(dur)}</div>
          <input type="range" min={0} max={dur || 0} step="0.01" value={cur} onChange={(e) => scrub(Number(e.target.value))} className="w-full"/>
          <div className="flex gap-2 mt-3">
            <button onClick={addMidrollAtCurrent} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
              + Mid-roll at current time
            </button>
          </div>
        </section>

        <section className="rounded-2xl p-4 border" style={{ borderColor: gold }}>
          <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Ad Breaks</h2>
          <div className="grid gap-2">
            {breaks.map((b) => (
              <div key={b.id} className="rounded-xl p-3 border flex items-center justify-between" style={{ borderColor: gold }}>
                <div className="text-sm">
                  <div className="font-medium">{b.type.toUpperCase()}</div>
                  <div className="opacity-80">{format(b.time)}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded px-3 py-2 border"
                    style={{ borderColor: gold }}
                    onClick={() => scrub(b.time)}
                  >
                    Jump
                  </button>
                  <button className="rounded px-3 py-2 border" style={{ borderColor: gold }} onClick={() => removeBreak(b.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {breaks.length === 0 && <div className="text-sm opacity-80">No ad breaks yet.</div>}
          </div>
          <div className="text-sm opacity-80 mt-3">
            Tip: Aim for ad breaks at natural pauses. Avoid placing within the first 60–90 seconds.
          </div>
        </section>
      </div>
    </main>
  );
}

function format(t: number) {
  if (!isFinite(t)) return "00:00";
  const s = Math.floor(t % 60);
  const m = Math.floor(t / 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(m)}:${pad(s)}`;
}
