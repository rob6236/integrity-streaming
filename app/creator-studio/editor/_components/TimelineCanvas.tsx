// app/creator-studio/editor/_components/TimelineCanvas.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

const PX_PER_SEC_BY_ZOOM = [20, 40, 60, 90, 140];

const laneRowStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 8,
  padding: 8,
  position: "relative",
  height: 110,
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
};

const laneTitleStyle: React.CSSProperties = {
  position: "absolute",
  left: 8,
  top: 6,
  fontSize: 11,
  color: "rgba(255,255,255,.65)",
  fontWeight: 700,
  pointerEvents: "none",
};

export default function TimelineCanvas() {
  const {
    timeline,
    addToTimelineById,
    removeFromTimeline,
    setSelected,
    selected,
    updateClip,
    zoom,
    setZoom,
    setPreviewUrl,
  } = useTimelineStore();

  const v1 = timeline.filter((c) => c.lane === "V1");
  const v2 = timeline.filter((c) => c.lane === "V2");
  const o1 = timeline.filter((c) => c.lane === "O1");
  const a1 = timeline.filter((c) => c.lane === "A1");

  const pxPerSec = PX_PER_SEC_BY_ZOOM[Math.max(1, Math.min(5, zoom)) - 1];

  const maxDuration = useMemo(() => {
    const sumV1 = v1.reduce((acc, c) => acc + Math.max(1, c.out - c.in), 0);
    const sumV2 = v2.reduce((acc, c) => acc + Math.max(1, c.out - c.in), 0);
    const sumO1 = o1.reduce((acc, c) => acc + Math.max(1, c.out - c.in), 0);
    return Math.max(sumV1, sumV2, sumO1, 60);
  }, [v1, v2, o1]);

  return (
    <div
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (id) addToTimelineById(id, "V1");
      }}
    >
      {/* ruler */}
      <div
        style={{
          height: 32,
          borderBottom: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.05)",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          fontSize: 12,
          color: "rgba(255,255,255,.75)",
          gap: 12,
        }}
      >
        01:00:00:00
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span>Zoom</span>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
      </div>

      {/* lanes */}
      <div style={{ flex: 1, padding: 12, display: "grid", gap: 10 }}>
        <LaneRow title="Video 1" width={maxDuration * pxPerSec} onDropId={(id) => addToTimelineById(id, "V1")}>
          {v1.map((clip, idx) => (
            <ClipBar
              key={`${clip.id}-V1-${idx}`}
              clip={clip}
              pxPerSec={pxPerSec}
              selected={selected?.lane === "V1" && selected.index === idx}
              onSelect={() => {
                setSelected({ lane: "V1", index: idx });
                if (clip.url) setPreviewUrl(clip.url);
              }}
              onRemove={() => removeFromTimeline("V1", idx)}
              onTrimStart={(val) => updateClip("V1", idx, { in: val })}
              onTrimEnd={(val) => updateClip("V1", idx, { out: val })}
            />
          ))}
        </LaneRow>

        <LaneRow title="Video 2" width={maxDuration * pxPerSec} onDropId={(id) => addToTimelineById(id, "V2")}>
          {v2.map((clip, idx) => (
            <ClipBar
              key={`${clip.id}-V2-${idx}`}
              clip={clip}
              pxPerSec={pxPerSec}
              selected={selected?.lane === "V2" && selected.index === idx}
              onSelect={() => {
                setSelected({ lane: "V2", index: idx });
                if (clip.url) setPreviewUrl(clip.url);
              }}
              onRemove={() => removeFromTimeline("V2", idx)}
              onTrimStart={(val) => updateClip("V2", idx, { in: val })}
              onTrimEnd={(val) => updateClip("V2", idx, { out: val })}
            />
          ))}
        </LaneRow>

        <LaneRow title="Overlay" width={maxDuration * pxPerSec} onDropId={(id) => addToTimelineById(id, "O1")}>
          {o1.map((clip, idx) => (
            <ClipBar
              key={`${clip.id}-O1-${idx}`}
              clip={clip}
              pxPerSec={pxPerSec}
              selected={selected?.lane === "O1" && selected.index === idx}
              onSelect={() => {
                setSelected({ lane: "O1", index: idx });
                if (clip.url) setPreviewUrl(clip.url);
              }}
              onRemove={() => removeFromTimeline("O1", idx)}
              onTrimStart={(val) => updateClip("O1", idx, { in: val })}
              onTrimEnd={(val) => updateClip("O1", idx, { out: val })}
            />
          ))}
        </LaneRow>

        <LaneRow title="Audio 1" width={maxDuration * pxPerSec} onDropId={(id) => addToTimelineById(id, "A1")}>
          {a1.map((clip, idx) => (
            <ClipBar
              key={`${clip.id}-A1-${idx}`}
              clip={clip}
              pxPerSec={pxPerSec}
              selected={selected?.lane === "A1" && selected.index === idx}
              onSelect={() => {
                setSelected({ lane: "A1", index: idx });
                if (clip.url) setPreviewUrl(clip.url);
              }}
              onRemove={() => removeFromTimeline("A1", idx)}
              onTrimStart={(val) => updateClip("A1", idx, { in: val })}
              onTrimEnd={(val) => updateClip("A1", idx, { out: val })}
            />
          ))}
        </LaneRow>
      </div>
    </div>
  );
}

function LaneRow({
  title,
  width,
  children,
  onDropId,
}: React.PropsWithChildren<{ title: string; width: number; onDropId: (id: string) => void }>) {
  return (
    <div
      style={laneRowStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropId(id);
      }}
    >
      <div style={laneTitleStyle}>{title}</div>
      <div style={{ width, height: "100%", display: "inline-flex", alignItems: "center", gap: 8, paddingLeft: 64 }}>
        {children}
      </div>
      {/* playhead (t=0) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 64,
          bottom: 0,
          width: 2,
          background: "rgba(255,215,0,.9)",
          boxShadow: "0 0 0 1px rgba(0,0,0,.6)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

type Clip = {
  id: string;
  name: string;
  url?: string;
  kind?: "image" | "video" | "other";
  in: number;
  out: number;
  lane: "V1" | "V2" | "O1" | "A1";
};

function ClipBar({
  clip,
  pxPerSec,
  selected,
  onSelect,
  onRemove,
  onTrimStart,
  onTrimEnd,
}: {
  clip: Clip;
  pxPerSec: number;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onTrimStart: (v: number) => void;
  onTrimEnd: (v: number) => void;
}) {
  const duration = Math.max(1, clip.out - clip.in);
  const width = Math.max(140, duration * pxPerSec);

  // Context menu state (per clip)
  const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({
    open: false,
    x: 0,
    y: 0,
  });

  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // position within the clip
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenu({
      open: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const closeMenu = () => setMenu({ open: false, x: 0, y: 0 });

  return (
    <div
      onClick={() => {
        closeMenu();
        onSelect();
      }}
      onContextMenu={openMenu}
      role="button"
      tabIndex={0}
      title={clip.name}
      style={{
        width,
        height: 100, // sliders above + media
        borderRadius: 8,
        border: `1px solid ${selected ? "rgba(255,215,0,.9)" : "rgba(255,255,255,.12)"}`,
        background: "rgba(0,0,0,.6)",
        color: "#fff",
        boxShadow: selected
          ? "0 0 0 1px rgba(0,0,0,.55) inset, 0 0 0 1px rgba(255,215,0,.25)"
          : "0 0 0 1px rgba(0,0,0,.55) inset",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseLeave={closeMenu}
    >
      {/* Sliders ABOVE media */}
      <div
        style={{
          padding: "6px 8px",
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: "rgba(255,255,255,.04)",
          borderBottom: "1px solid rgba(255,255,255,.12)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <label style={{ fontSize: 11, color: "rgba(255,255,255,.9)" }}>
          In
          <input
            type="range"
            min={0}
            max={Math.max(0.1, clip.out)}
            step={0.1}
            value={clip.in}
            onChange={(e) => onTrimStart(Number(e.target.value))}
            style={{ width: 120, marginLeft: 6 }}
          />
        </label>
        <label style={{ fontSize: 11, color: "rgba(255,255,255,.9)" }}>
          Out
          <input
            type="range"
            min={clip.in + 0.1}
            max={clip.out + 60}
            step={0.1}
            value={clip.out}
            onChange={(e) => onTrimEnd(Number(e.target.value))}
            style={{ width: 120, marginLeft: 6 }}
          />
        </label>
      </div>

      {/* Media BELOW sliders (no title or remove button) */}
      <div style={{ position: "relative", flex: 1 }}>
        {clip.kind === "image" && clip.url && (
          <img
            src={clip.url}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
            }}
            draggable={false}
          />
        )}
        {clip.kind === "video" && clip.url && (
          <video
            src={clip.url}
            muted
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#000",
              opacity: 0.9,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(0,0,0,.15))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Right-click menu */}
      {menu.open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            left: menu.x,
            top: menu.y,
            zIndex: 10,
            background: "rgba(20,20,20,.98)",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: 8,
            boxShadow: "0 10px 24px rgba(0,0,0,.45)",
            minWidth: 120,
            padding: 6,
          }}
        >
          <MenuItem
            label="Delete"
            onClick={() => {
              onRemove();
              closeMenu();
            }}
          />
          <MenuItem
            label="Cut"
            onClick={() => {
              // TODO: wire clipboard; for now behaves like Delete
              onRemove();
              closeMenu();
            }}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "6px 10px",
        background: "transparent",
        color: "#fff",
        borderRadius: 6,
        fontSize: 13,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      {label}
    </button>
  );
}
