// app/creator-studio/editor/_components/MediaDrawer.tsx
"use client";

import React, { useRef } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

/**
 * Media Pool:
 * - "From Uploads" / "From Device" populate POOL ONLY
 * - Viewer changes only on Preview or when selecting a timeline clip
 */
export default function MediaDrawer() {
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    mediaPool,
    setMediaPool,  // reserved if you later load server items
    addMedia,
    addToTimelineById,
    setPreviewUrl,
  } = useTimelineStore();

  const handleFromUploads = async () => {
    try {
      setPreviewUrl(undefined);
      // TODO: Replace this with your real published-assets loader.
      alert("From Uploads: wire this to your Firebase 'published' loader.");
    } catch (e) {
      console.error(e);
      alert("Could not load uploads.");
    }
  };

  const handleFromDevice = () => {
    setPreviewUrl(undefined);
    fileRef.current?.click();
  };

  /**
   * Important: capture the input element BEFORE any awaits
   * because React synthetic events are pooled and null after awaits.
   */
  const onPickLocal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget; // capture before any await

    const f = inputEl.files?.[0];
    if (!f) return;

    const url = URL.createObjectURL(f);

    let kind: "image" | "video" | "other" = "other";
    if (f.type.startsWith("image/")) kind = "image";
    else if (f.type.startsWith("video/")) kind = "video";

    // For videos, read true duration so timeline clip spans the full video
    let duration: number | undefined;
    if (kind === "video") {
      duration = await new Promise<number | undefined>((resolve) => {
        const v = document.createElement("video");
        v.preload = "metadata";
        v.src = url;
        v.muted = true;
        const done = () => {
          const d = Number.isFinite(v.duration) ? v.duration : undefined;
          // cleanup
          v.src = "";
          v.load();
          resolve(d);
        };
        v.addEventListener("loadedmetadata", done, { once: true });
        v.addEventListener("error", () => resolve(undefined), { once: true });
      });
    }

    addMedia({
      id: `${f.name}-${Date.now()}`,
      name: f.name,
      url,
      kind,
      duration,
      from: "device",
    });

    setPreviewUrl(undefined);

    // Clear the file input safely using the saved element reference
    inputEl.value = "";
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8, padding: 12 }}>
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
            <div style={thumbWrap}>
              {renderThumb(m.url, m.kind)}
            </div>

            <div style={nameStyle} title={m.name}>{m.name}</div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setPreviewUrl(m.url)} style={btnDark}>Preview</button>
              <button onClick={() => addToTimelineById(String(m.id), "V1")} style={btnGold}>+ Timeline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderThumb(url?: string, kind?: "image" | "video" | "other") {
  if (kind === "image" && url) {
    return <img src={url} style={thumbImg} draggable={false} />;
  }
  if (kind === "video" && url) {
    // muted+autoplay+loop creates a subtle animated thumbnail
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

/* styles */
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
