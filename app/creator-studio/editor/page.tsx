// app/creator-studio/editor/page.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

/* ---- Force links/placeholders to white on this page ---- */
function WhiteTextFix() {
  return (
    <style jsx global>{`
      a { color: #fff !important; }
      a:hover { opacity: 0.85; }
      input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
    `}</style>
  );
}

/* -----------------------------------------------------------
   Editor Context (shared state across grids)
------------------------------------------------------------*/
type CaptionItem = { start: number; end: number; text: string };
type EditorAction =
  | { type: "set-source"; url: string }
  | { type: "set-title"; title: string }
  | { type: "set-trim"; start: number; end: number }
  | { type: "add-caption"; item: CaptionItem }
  | { type: "delete-caption"; index: number }
  | { type: "set-thumb"; url: string }
  | { type: "note"; text: string };

type EditorState = {
  title: string;
  sourceUrl: string;
  thumbnailUrl: string | null;
  trimStart: number;
  trimEnd: number;
  captions: CaptionItem[];
  history: { ts: number; message: string }[];
};

const EditorContext = createContext<{
  state: EditorState;
  dispatch: (a: EditorAction) => void;
} | null>(null);

function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside <EditorProvider/>");
  return ctx;
}

function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EditorState>({
    title: "",
    sourceUrl: "",
    thumbnailUrl: null,
    trimStart: 0,
    trimEnd: 0,
    captions: [],
    history: [],
  });

  const dispatch = (a: EditorAction) => {
    setState((s) => {
      const next = { ...s };
      const stamp = (msg: string) =>
        (next.history = [...next.history, { ts: Date.now(), message: msg }]);

      switch (a.type) {
        case "set-source":
          next.sourceUrl = a.url.trim();
          stamp(`Source set to ${a.url}`);
          break;
        case "set-title":
          next.title = a.title;
          stamp(`Title set to “${a.title || "Untitled"}”`);
          break;
        case "set-trim":
          next.trimStart = Math.max(0, Math.min(a.start, a.end));
          next.trimEnd = Math.max(a.start, a.end);
          stamp(`Trim updated: ${next.trimStart}s → ${next.trimEnd}s`);
          break;
        case "add-caption":
          next.captions = [...next.captions, a.item];
          stamp(`Caption added: [${a.item.start}s–${a.item.end}s] "${a.item.text}"`);
          break;
        case "delete-caption":
          next.captions = next.captions.filter((_, i) => i !== a.index);
          stamp(`Caption #${a.index + 1} deleted`);
          break;
        case "set-thumb":
          next.thumbnailUrl = a.url;
          stamp(`Thumbnail set`);
          break;
        case "note":
          stamp(a.text);
          break;
      }
      return next;
    });
  };

  return (
    <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>
  );
}

/* -----------------------------------------------------------
   Auth Gate
------------------------------------------------------------*/
function useAuthGate() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUserEmail(u.email ?? null);
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  return { checking, userEmail };
}

/* -----------------------------------------------------------
   UI shell card
------------------------------------------------------------*/
function Card({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--gold,#FFD700)]/70 bg-black/15 p-0 shadow-[0_0_0_1px_rgba(255,215,0,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--gold,#FFD700)]/30 px-4 py-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* -----------------------------------------------------------
   Workspace 1: Source & Trim
------------------------------------------------------------*/
function TrimWorkspace() {
  const { state, dispatch } = useEditor();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      setDuration(v.duration || 0);
      if (!state.trimEnd || state.trimEnd > v.duration) {
        dispatch({ type: "set-trim", start: 0, end: Math.floor(v.duration || 0) });
      }
    };
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sourceUrl]);

  return (
    <Card
      title="Source & Trim"
      actions={
        <Link
          href="/creator-studio/library"
          className="rounded-md border border-white/25 bg-black/40 px-3 py-1.5 text-xs text-white hover:bg-black/55"
        >
          Back to Library
        </Link>
      }
    >
      <label className="mb-2 block text-xs text-white/70">Source URL (Firebase Storage URL)</label>
      <input
        value={state.sourceUrl}
        onChange={(e) => dispatch({ type: "set-source", url: e.target.value })}
        placeholder="https://firebasestorage.googleapis.com/..."
        className="mb-3 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
      />

      <label className="mb-2 block text-xs text-white/70">Title</label>
      <input
        value={state.title}
        onChange={(e) => dispatch({ type: "set-title", title: e.target.value })}
        placeholder="Untitled"
        className="mb-4 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
      />

      <div className="mb-3 text-xs text-white/70">
        Duration: {duration ? `${Math.round(duration)}s` : "—"}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <video
            ref={videoRef}
            src={state.sourceUrl || undefined}
            controls
            className="h-48 w-full rounded-lg border border-white/15 bg-black object-contain"
          />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-white/70">Trim Start (s)</label>
              <input
                type="number"
                min={0}
                value={state.trimStart}
                onChange={(e) =>
                  dispatch({
                    type: "set-trim",
                    start: Number(e.target.value || 0),
                    end: state.trimEnd || 0,
                  })
                }
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/70">Trim End (s)</label>
              <input
                type="number"
                min={0}
                value={state.trimEnd}
                onChange={(e) =>
                  dispatch({
                    type: "set-trim",
                    start: state.trimStart || 0,
                    end: Number(e.target.value || 0),
                  })
                }
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
              />
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-[var(--gold,#FFD700)]/40 bg-black/30 p-3 text-xs text-white/80">
            Export range: <b>{state.trimStart}s → {state.trimEnd}s</b>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* -----------------------------------------------------------
   Workspace 2: Thumbnail Designer (placeholder)
------------------------------------------------------------*/
function ThumbnailWorkspace() {
  const { state, dispatch } = useEditor();
  const [time, setTime] = useState<number>(Math.max(0, state.trimStart));

  function fakeGenerate() {
    const url = `https://dummyimage.com/640x360/000/ffffff&text=${encodeURIComponent(
      (state.title || "Thumbnail") + "@" + time + "s"
    )}`;
    dispatch({ type: "set-thumb", url });
  }

  return (
    <Card
      title="Thumbnail Designer"
      actions={
        <button
          onClick={fakeGenerate}
          className="rounded-md border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-3 py-1.5 text-xs font-semibold text-[#7B0F24] hover:brightness-95"
        >
          Generate Placeholder
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-[1fr,1fr]">
        <div className="rounded-lg border border-white/15 bg-black/30 p-3">
          <label className="mb-2 block text-xs text-white/70">Capture Time (s)</label>
          <input
            type="number"
            min={0}
            value={time}
            onChange={(e) => setTime(Number(e.target.value || 0))}
            className="mb-3 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
          />
          <div className="text-xs text-white/60">
            Demo only. We’ll wire real frame capture or Workers AI later.
          </div>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-white/15 bg-black/30 p-3">
          {state.thumbnailUrl ? (
            <img
              src={state.thumbnailUrl}
              alt="Thumbnail"
              className="max-h-40 rounded-md border border-white/10 object-contain"
            />
          ) : (
            <div className="text-sm text-white/60">No thumbnail yet.</div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* -----------------------------------------------------------
   Workspace 3: Captions
------------------------------------------------------------*/
function CaptionsWorkspace() {
  const { state, dispatch } = useEditor();
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(2);
  const [text, setText] = useState<string>("");

  function addCaption() {
    if (!text.trim()) return;
    if (end <= start) return;
    dispatch({ type: "add-caption", item: { start, end, text: text.trim() } });
    setText("");
    setStart(end);
    setEnd(end + 2);
  }

  return (
    <Card
      title="Captions"
      actions={
        <button
          onClick={addCaption}
          className="rounded-md border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-3 py-1.5 text-xs font-semibold text-[#7B0F24] disabled:opacity-50"
          disabled={!text.trim() || end <= start}
        >
          Add Caption
        </button>
      }
    >
      <div className="grid gap-3 md:grid-cols-[1fr,1fr]">
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-white/70">Start (s)</label>
              <input
                type="number"
                min={0}
                value={start}
                onChange={(e) => setStart(Number(e.target.value || 0))}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/70">End (s)</label>
              <input
                type="number"
                min={0}
                value={end}
                onChange={(e) => setEnd(Number(e.target.value || 0))}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[var(--gold,#FFD700)]/70"
              />
            </div>
          </div>

          <label className="mt-3 mb-1 block text-xs text-white/70">Text</label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type caption text…"
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--gold,#FFD700)]/70"
          />
        </div>

        <div className="rounded-lg border border-white/15 bg-black/30 p-3">
          <div className="mb-2 text-xs font-semibold text-white/80">Current Captions</div>
          {state.captions.length === 0 ? (
            <div className="text-sm text-white/60">No captions yet.</div>
          ) : (
            <ul className="space-y-2">
              {state.captions.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between rounded-md border border-white/10 bg-black/40 px-3 py-2"
                >
                  <div className="text-sm text-white/90">
                    <span className="mr-2 rounded bg-white/10 px-1.5 py-[1px] text-xs text-white">
                      {c.start}s–{c.end}s
                    </span>
                    {c.text}
                  </div>
                  <button
                    onClick={() => dispatch({ type: "delete-caption", index: i })}
                    className="ml-3 rounded-md border border-white/20 bg-black/40 px-2 py-1 text-xs text-white hover:bg-black/55"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

/* -----------------------------------------------------------
   Workspace 4: History
------------------------------------------------------------*/
function HistoryPanel() {
  const { state } = useEditor();
  const items = useMemo(() => [...state.history].reverse(), [state.history]);

  return (
    <Card title="Edit History">
      {items.length === 0 ? (
        <div className="text-sm text-white/60">No edits yet.</div>
      ) : (
        <ul className="space-y-2">
          {items.map((h, idx) => (
            <li
              key={idx}
              className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-sm text-white/90"
            >
              <span className="mr-2 text-white/50">{new Date(h.ts).toLocaleTimeString()}</span>
              {h.message}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/* -----------------------------------------------------------
   Page
------------------------------------------------------------*/
export default function EditorPage() {
  const { checking, userEmail } = useAuthGate();

  if (checking) return <div className="p-6 text-white/90">Checking your session…</div>;

  return (
    <EditorProvider>
      <WhiteTextFix />
      <div className="p-6">
        {/* Header */}
        <div className="mb-5 grid grid-cols-3 items-center">
          <div />
          <h1 className="text-center text-2xl font-semibold text-white">Editor</h1>
          <div className="text-right text-sm text-white/70">
            Signed in as {userEmail ?? "unknown"}
          </div>
        </div>

        {/* Grid workspace: 2x2 */}
        <div className="grid gap-5 md:grid-cols-2">
          <TrimWorkspace />
          <ThumbnailWorkspace />
          <CaptionsWorkspace />
          <HistoryPanel />
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/creator-studio/library"
            className="rounded-md border border-white/25 bg-black/40 px-4 py-2 text-sm text-white hover:bg-black/55"
          >
            Back to Library
          </Link>
          <button
            className="rounded-md border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-5 py-2 text-sm font-semibold text-[#7B0F24]"
            onClick={() =>
              alert("Export pipeline will go here (transcode + mux captions + set thumb).")
            }
          >
            Export (placeholder)
          </button>
        </div>
      </div>
    </EditorProvider>
  );
}
