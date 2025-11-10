// app/creator-studio/editor/_components/MediaDrawer.tsx
"use client";

import React, { useRef } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";
import { auth, storage } from "@/lib/firebase";
import { ref as storageRef, listAll, getDownloadURL, getMetadata } from "firebase/storage";

type Kind = "image" | "video" | "other";

/**
 * Media Pool:
 * - From Uploads: lists Storage objects under uploads/published/{uid}/ and adds to pool
 * - From Device: adds a local file via blob URL
 * - Items render thumbs and can be dragged to timeline
 */
export default function MediaDrawer() {
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    mediaPool,
    setPreviewUrl,
    addMedia,
    setMediaPool, // used to replace the list with uploaded items
    addToTimelineById,
  } = useTimelineStore();

  /* ---------------- From Uploads (Firebase Storage) ---------------- */
  const handleFromUploads = async () => {
    try {
      setPreviewUrl(undefined);
      const user = auth.currentUser;
      if (!user?.uid) {
        alert("You must be logged in to load uploads.");
        return;
      }

      const base = storageRef(storage, `uploads/published/${user.uid}`);
      const listing = await listAll(base);

      // Build media items with URLs & inferred kind
      const items = await Promise.all(
        listing.items.map(async (obj, i) => {
          const [url, meta] = await Promise.all([getDownloadURL(obj), getMetadata(obj)]);
          const name = obj.name || `item-${i}`;
          const contentType = meta?.contentType || "";
          const kind: Kind = contentType.startsWith("image/")
            ? "image"
            : contentType.startsWith("video/")
            ? "video"
            : inferKindFromName(name);

          return {
            id: `${name}@${i}`,
            name,
            url,
            kind,
            from: "uploads" as const,
          };
        })
      );

      // Newest first
      items.reverse();
      setMediaPool(items);
    } catch (err) {
      console.error(err);
      alert("Could not load uploads.");
    }
  };

  /* ---------------- From Device (local file) ---------------- */
  const handleFromDevice = () => {
    setPreviewUrl(undefined);
    fileRef.current?.click();
  };

  const onPickLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const url = URL.createObjectURL(f);

    let kind: Kind = "other";
    if (f.type.startsWith("image/")) kind = "image";
    else if (f.type.startsWith("video/")) kind = "video";

    addMedia({
      id: `${f.name}-${Date.now()}`,
      name: f.name,
      url,
      kind,
      from: "device",
    });

    // allow re-selecting same file later
    e.currentTarget.value = "";
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8, padding: 12 }}>
        {/* Both buttons gold with black letters */}
        <button onClick={handleFromUploads} style={btnGold}>From Uploads</button>
        <button onClick={handleFromDevice} style={btnGold}>From Device</button>
        <input ref={fileRef} type="file" hidden onChange={onPickLocal} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 12px 12px",
          display: "grid",
          gap: 10,
        }}
      >
        {(!mediaPool || mediaPool.length === 0) && (
          <div style={emptyNote}>
            Use <b>From Uploads</b> or <b>From Device</b> to add items here. Then drag to the timeline.
          </div>
        )}

        {mediaPool?.map((m, i) => (
          <div
            key={`${m.id}-${i}`}
            style={card}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(m.id))}
            title="Drag onto a timeline lane"
          >
            <div style={thumbWrap}>{renderThumb(m.url, m.kind)}</div>

            <div style={nameStyle} title={m.name}>
              {m.name}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setPreviewUrl(m.url)} style={btnDark}>
                Preview
              </button>
              <button
                onClick={() => addToTimelineById(String(m.id), "V1")}
                style={btnGold}
              >
                + Timeline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function renderThumb(url?: string, kind?: Kind) {
  if (kind === "image" && url) {
    return <img src={url} style={thumbImg} draggable={false} />;
  }
  if (kind === "video" && url) {
    return (
      <video
        src={url}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        style={thumbImg}
      />
    );
  }
  return <span style={{ fontSize: 10, color: "rgba(255,255,255,.7)" }}>FILE</span>;
}

function inferKindFromName(name: string): Kind {
  const n = name.toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp|avif)$/.test(n)) return "image";
  if (/\.(mp4|mov|mkv|webm|m4v|avi)$/.test(n)) return "video";
  return "other";
}

/* ---------- styles (brand-consistent) ---------- */
const btnGold: React.CSSProperties = {
  background: "#FFD700",
  color: "#000",
  padding: "6px 10px",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 13,
};
const btnDark: React.CSSProperties = {
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 8,
  fontSize: 13,
};
const emptyNote: React.CSSProperties = {
  color: "rgba(255,255,255,.75)",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 8,
  padding: 12,
  fontSize: 13,
};
const card: React.CSSProperties = {
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.10)",
  padding: 10,
  display: "grid",
  gridTemplateColumns: "64px 1fr auto",
  gap: 10,
  alignItems: "center",
  borderRadius: 8,
};
const thumbWrap: React.CSSProperties = {
  width: 64,
  height: 46,
  borderRadius: 6,
  overflow: "hidden",
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const thumbImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  background: "#000",
};
const nameStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
