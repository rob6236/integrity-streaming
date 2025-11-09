// app/creator-studio/editor/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../lib/firebase";               // <-- fixed
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { markTempMediaUsed } from "../../lib/mediaQueue";    // <-- fixed

type TempItem = {
  id: string;
  uid: string;
  storagePath: string;
  kind: "image" | "video";
  durationSec?: number | null;
  shortOrVideo?: "short" | "video";
};

export default function EditorPage() {
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [items, setItems] = useState<TempItem[]>([]);
  const [usedTempMediaIds, setUsedTempMediaIds] = useState<string[]>([]);

  // Load the signed-in creator's temp media queue
  useEffect(() => {
    let alive = true;
    (async () => {
      const user = auth.currentUser;
      if (!user) return;
      setLoading(true);
      try {
        const q = query(collection(db, "tempMedia"), where("uid", "==", user.uid));
        const snap = await getDocs(q);
        if (!alive) return;
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as TempItem[];
        setItems(list);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Track which temp items are used in this edit
  function addTempMediaId(id: string) {
    if (!id) return;
    setUsedTempMediaIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }
  function removeTempMediaId(id: string) {
    setUsedTempMediaIds((prev) => prev.filter((x) => x !== id));
  }
  const selectedSet = useMemo(() => new Set(usedTempMediaIds), [usedTempMediaIds]);

  // Publish: run your save, then mark temp media as used (triggers purge function)
  async function handlePublish() {
    try {
      setPublishing(true);

      // 1) TODO: your existing save/publish logic here
      // await saveVideoOrPost(payload);

      // 2) Mark temp media used -> Cloud Function deletes file + doc
      await markTempMediaUsed(usedTempMediaIds.filter(Boolean));

      alert("Published. Temp media will be purged.");
    } catch (e) {
      console.error(e);
      alert("Publish failed. See console.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold mb-3">Editor — Media Queue Picker</h1>

      {/* Media queue list */}
      <div className="mb-4">
        {loading ? (
          <p>Loading media…</p>
        ) : items.length === 0 ? (
          <p>No temp media yet. Upload on /creator-studio/upload</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((it) => {
              const selected = selectedSet.has(it.id);
              return (
                <div
                  key={it.id}
                  className="rounded-2xl border border-white/20 p-3 bg-black/20"
                >
                  <div className="text-sm opacity-80 mb-2 break-all">
                    <div><span className="opacity-70">Kind:</span> {it.kind}</div>
                    {it.shortOrVideo && (
                      <div>
                        <span className="opacity-70">Type:</span> {it.shortOrVideo}
                      </div>
                    )}
                    {typeof it.durationSec === "number" && (
                      <div>
                        <span className="opacity-70">Duration:</span>{" "}
                        {Math.round(it.durationSec)}s
                      </div>
                    )}
                    <div className="truncate">
                      <span className="opacity-70">Path:</span> {it.storagePath}
                    </div>
                    <div className="opacity-60 text-[11px]">ID: {it.id}</div>
                  </div>

                  <div className="flex gap-2">
                    {!selected ? (
                      <button
                        className="px-3 py-1 rounded-lg bg-yellow-400 text-black font-medium"
                        onClick={() => addTempMediaId(it.id)}
                      >
                        Use in this edit
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-lg bg-white text-black font-medium"
                        onClick={() => removeTempMediaId(it.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected summary */}
      <div className="mb-4">
        <div className="text-sm opacity-80 mb-1">Selected media IDs:</div>
        {usedTempMediaIds.length === 0 ? (
          <div className="text-sm opacity-60">None selected yet.</div>
        ) : (
          <ul className="text-xs space-y-1">
            {usedTempMediaIds.map((id) => (
              <li key={id} className="break-all">{id}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Publish */}
      <button
        className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold"
        onClick={handlePublish}
        disabled={publishing}
      >
        {publishing ? "Publishing…" : "Publish"}
      </button>
    </div>
  );
}
