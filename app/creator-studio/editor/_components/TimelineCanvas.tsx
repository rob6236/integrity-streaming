// app/creator-studio/editor/_components/TimelineCanvas.tsx
"use client";

import React, { useMemo, useState, useRef, useLayoutEffect, useEffect } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";

const PX_PER_SEC_BY_ZOOM = [20, 40, 60, 90, 140];
const LEFT_PAD = 64;

/** ------ CHANGED: set editor/frame display to 24 fps ------ */
const FPS = 24;
function formatTimecode(seconds: number, fps = FPS) {
  const totalFrames = Math.max(0, Math.round(seconds * fps));
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalFrames / (fps * 3600));
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
}

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

type Clip = {
  id: string;
  name: string;
  url?: string;
  kind?: "image" | "video" | "other";
  in: number;
  out: number;
  lane: "V1" | "V2" | "O1" | "A1";
  start?: number;
  // inspector fields may be attached dynamically (zoom, posX, posY, rot, cropL, cropR, cropT, cropB, soft)
};

type Tool = "select" | "trim" | "blade";

/* Theme */
const GOLD = "#FFD700";
const BLACK = "#000";

/** Inspector keys supported by timeline-undo watcher */
const INSPECTOR_KEYS = [
  "zoom",
  "posX",
  "posY",
  "rot",
  "cropL",
  "cropR",
  "cropT",
  "cropB",
  "soft",
] as const;

export default function TimelineCanvas() {
  const {
    timeline,
    addToTimelineById: addRaw,
    removeFromTimeline: removeRaw,
    setSelected: setSelectedRaw,
    selected,
    updateClip: updateRaw,
    zoom,
    setZoom: setZoomRaw,
    setPreviewUrl,
  } = useTimelineStore();

  /** ---------------- Local undo stack ---------------- */
  const undoStackRef = useRef<(() => void)[]>([]);
  const pushEnabledRef = useRef(true);

  /** Guard for local vs external (Inspector) edits */
  const localEditRef = useRef<number>(0);
  const markLocalEdit = () => {
    localEditRef.current = performance.now();
  };

  const getLaneClips = (lane: "V1" | "V2" | "O1" | "A1") =>
    ((useTimelineStore as any).getState?.().timeline as Clip[]).filter((c) => c.lane === lane);

  const addToTimelineById = (id: string, lane: "V1" | "V2" | "O1" | "A1") => {
    markLocalEdit();
    const idxBefore = getLaneClips(lane).length;
    addRaw(id, lane);
    if (pushEnabledRef.current) {
      undoStackRef.current.push(() => {
        removeRaw(lane, idxBefore);
      });
    }
  };

  const removeFromTimeline = (lane: "V1" | "V2" | "O1" | "A1", index: number) => {
    markLocalEdit();
    const beforeClips = getLaneClips(lane);
    const clip = beforeClips[index];
    if (!clip) {
      removeRaw(lane, index);
      return;
    }
    removeRaw(lane, index);
    if (pushEnabledRef.current) {
      undoStackRef.current.push(() => {
        const idxNow = getLaneClips(lane).length;
        addRaw(clip.id, lane);
        updateRaw(lane, idxNow, {
          in: clip.in,
          out: clip.out,
          start: clip.start ?? 0,
          url: clip.url,
          name: clip.name,
          kind: clip.kind,
          zoom: (clip as any).zoom,
          posX: (clip as any).posX,
          posY: (clip as any).posY,
          rot: (clip as any).rot,
          cropL: (clip as any).cropL,
          cropR: (clip as any).cropR,
          cropT: (clip as any).cropT,
          cropB: (clip as any).cropB,
          soft: (clip as any).soft,
        } as any);
      });
    }
  };

  const updateClip = (
    lane: "V1" | "V2" | "O1" | "A1",
    index: number,
    patch: Partial<Pick<Clip, "in" | "out" | "start" | "url" | "name" | "kind">> & Record<string, any>
  ) => {
    markLocalEdit();
    const before = getLaneClips(lane)[index];
    updateRaw(lane, index, patch);
    if (pushEnabledRef.current && before) {
      const revert: Record<string, any> = {};
      if ("in" in patch) revert.in = before.in;
      if ("out" in patch) revert.out = before.out;
      if ("start" in patch) revert.start = before.start ?? 0;
      if ("url" in patch) revert.url = before.url;
      if ("name" in patch) revert.name = before.name;
      if ("kind" in patch) revert.kind = before.kind;
      INSPECTOR_KEYS.forEach((k) => {
        if (k in patch) (revert as any)[k] = (before as any)[k];
      });
      undoStackRef.current.push(() => updateRaw(lane, index, revert));
    }
  };

  const setSelected = (v: any) => setSelectedRaw(v);
  const setZoom = (v: number) => setZoomRaw(v);

  /** External (Inspector) watcher -> push inverse changes to Undo */
  const prevTimelineRef = useRef<Clip[]>(useTimelineStore.getState().timeline as any);
  useEffect(() => {
    const prev = prevTimelineRef.current;
    const curr = (timeline as Clip[]) || [];

    if (performance.now() - localEditRef.current < 40) {
      prevTimelineRef.current = curr;
      return;
    }

    if (pushEnabledRef.current) {
      const key = (c: Clip) => `${c.lane}:${c.id}`;
      const prevMap = new Map(prev.map((c) => [key(c), c]));
      for (const c of curr) {
        const p = prevMap.get(key(c));
        if (!p) continue;
        const changed: Record<string, any> = {};
        INSPECTOR_KEYS.forEach((k) => {
          if ((p as any)[k] !== (c as any)[k]) changed[k] = (p as any)[k];
        });
        if (Object.keys(changed).length > 0) {
          const lane = c.lane as "V1" | "V2" | "O1" | "A1";
          const laneList = (timeline as Clip[]).filter((x) => x.lane === lane);
          const idx = laneList.findIndex((x) => x.id === c.id);
          if (idx >= 0) undoStackRef.current.push(() => updateRaw(lane, idx, changed));
          break;
        }
      }
    }

    prevTimelineRef.current = curr;
  }, [timeline, updateRaw]);

  /** ------------------------------------------------------------------ */

  const v1 = timeline.filter((c) => c.lane === "V1");
  const v2 = timeline.filter((c) => c.lane === "V2");
  const o1 = timeline.filter((c) => c.lane === "O1");
  const a1 = timeline.filter((c) => c.lane === "A1");

  const pxPerSec = PX_PER_SEC_BY_ZOOM[Math.max(1, Math.min(5, zoom)) - 1];

  const laneMaxEnd = (arr: Clip[]) =>
    arr.reduce((mx, c) => {
      const st = typeof c.start === "number" ? c.start : 0;
      const dur = Math.max(0.1, c.out - c.in);
      return Math.max(mx, st + dur);
    }, 0);

  const maxDuration = useMemo(() => {
    const m = Math.max(
      laneMaxEnd(v1 as any),
      laneMaxEnd(v2 as any),
      laneMaxEnd(o1 as any),
      laneMaxEnd(a1 as any)
    );
    return Math.max(m, 60);
  }, [v1, v2, o1, a1]);

  const [playhead, setPlayhead] = useState(0);
  const clampPlayhead = (t: number) => Math.max(0, Math.min(t, maxDuration));

  const [linkedVA, setLinkedVA] = useState(true);
  const [tool, setTool] = useState<Tool>("select");
  const [toolsEnabled, setToolsEnabled] = useState(true);

  const urlUnderPlayhead = (t: number): string => {
    const lanes: ("V1" | "V2" | "O1" | "A1")[] = ["V1", "V2", "O1", "A1"];
    for (const lane of lanes) {
      const c = (timeline as Clip[]).find((clip) => {
        if (clip.lane !== lane) return false;
        const st = clip.start ?? 0;
        const end = st + Math.max(0.1, clip.out - clip.in);
        return t >= st && t <= end;
      });
      if (c?.url) return c.url;
    }
    return "";
  };

  useEffect(() => {
    setPreviewUrl(urlUnderPlayhead(playhead));
  }, [timeline, playhead]); // eslint-disable-line react-hooks/exhaustive-deps

  const syncScroll = () => {
    setPreviewUrl(urlUnderPlayhead(playhead));
    window.dispatchEvent(new CustomEvent("timeline-scrub", { detail: { t: playhead } }));
  };

  useLayoutEffect(() => {}, [pxPerSec]);

  const dispatchScrub = (t: number) => {
    const tt = clampPlayhead(t);
    setPlayhead(tt);
    setPreviewUrl(urlUnderPlayhead(tt));
    window.dispatchEvent(new CustomEvent("timeline-scrub", { detail: { t: tt } }));
  };

  const liveResyncViewer = () => {
    setPreviewUrl(urlUnderPlayhead(playhead));
    window.dispatchEvent(new CustomEvent("timeline-scrub", { detail: { t: playhead } }));
  };

  const syncLinkedPairMove = (movedLane: "V1" | "A1", movedIdx: number, newStart: number) => {
    if (!linkedVA) return;
    const movedClip = (timeline as Clip[]).filter((c) => c.lane === movedLane)[movedIdx];
    if (!movedClip) return;
    const pairLane: "V1" | "A1" = movedLane === "V1" ? "A1" : "V1";
    const pairIdx = (timeline as Clip[])
      .filter((c) => c.lane === pairLane)
      .findIndex((c) => c.id === movedClip.id);
    if (pairIdx >= 0) updateClip(pairLane, pairIdx, { start: newStart });
  };

  const mirrorLeftTrimToPair = (
    sourceLane: "V1" | "A1",
    sourceIdx: number,
    _newInForSource: number,
    deltaIn: number
  ) => {
    if (!linkedVA) return;
    if (sourceLane !== "V1" && sourceLane !== "A1") return;

    const srcClip = (timeline as Clip[]).filter((c) => c.lane === sourceLane)[sourceIdx];
    if (!srcClip) return;

    const pairLane: "V1" | "A1" = sourceLane === "V1" ? "A1" : "V1";
    const pairList = (timeline as Clip[]).filter((c) => c.lane === pairLane);
    const pairIdx = pairList.findIndex((c) => c.id === srcClip.id);
    if (pairIdx < 0) return;

    const pair = pairList[pairIdx];
    const clampedIn = Math.max(0, Math.min(pair.out - 0.1, pair.in + deltaIn));
    const clampedStart = Math.max(0, (pair.start ?? 0) + deltaIn);

    updateClip(pairLane, pairIdx, { in: clampedIn, start: clampedStart });
  };

  const mirrorRightTrimToPair = (
    sourceLane: "V1" | "A1",
    sourceIdx: number,
    _newOutForSource: number,
    deltaOut: number
  ) => {
    if (!linkedVA) return;
    if (sourceLane !== "V1" && sourceLane !== "A1") return;

    const srcClip = (timeline as Clip[]).filter((c) => c.lane === sourceLane)[sourceIdx];
    if (!srcClip) return;

    const pairLane: "V1" | "A1" = sourceLane === "V1" ? "A1" : "V1";
    const pairList = (timeline as Clip[]).filter((c) => c.lane === pairLane);
    const pairIdx = pairList.findIndex((c) => c.id === srcClip.id);
    if (pairIdx < 0) return;

    const pair = pairList[pairIdx];
    const clampedOut = Math.max(pair.in + 0.1, pair.out + deltaOut);

    updateClip(pairLane, pairIdx, { out: clampedOut });
  };

  const deleteSelected = () => {
    if (!selected) return;
    removeFromTimeline(selected.lane, selected.index);
    liveResyncViewer();
  };

  const bladeCut = (laneKey: "V1" | "V2" | "O1" | "A1", clipIdx: number, tAbs: number) => {
    const laneClipsNow = (timeline as Clip[]).filter((c) => c.lane === laneKey);
    const clip = laneClipsNow[clipIdx];
    if (!clip) return;

    const st = clip.start ?? 0;
    the: {
      const rel = clip.in + (tAbs - st);
      const safeRel = Math.max(clip.in + 0.05, Math.min(clip.out - 0.05, rel));
      if (safeRel <= clip.in + 0.05 || safeRel >= clip.out - 0.05) break the;

      const oldOut = clip.out;

      pushEnabledRef.current = false;
      markLocalEdit();
      updateRaw(laneKey, clipIdx, { out: safeRel });
      const preLen = getLaneClips(laneKey).length;
      addRaw(clip.id, laneKey);
      updateRaw(laneKey, preLen, { in: safeRel, out: oldOut, start: tAbs });
      pushEnabledRef.current = true;

      undoStackRef.current.push(() => {
        removeRaw(laneKey, preLen);
        updateRaw(laneKey, clipIdx, { out: oldOut });
      });

      setSelectedRaw({ lane: laneKey, index: preLen });
      liveResyncViewer();
    }
  };

  const IconPointer = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M2 2l8 3-3 1 3 6-2 1-3-6-3 1z" />
    </svg>
  );
  const IconTrim = () => (
    <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
      <path fill="currentColor" d="M2 8l3-3v2h8V5l3 3-3 3v-2H5v2z" />
    </svg>
  );
  const IconBlade = () => (
    <svg width="20" height="16" viewBox="0 0 20 16" aria-hidden="true">
      <rect x="2" y="3" width="16" height="10" rx="2" ry="2" fill="currentColor" opacity="0.25" />
      <path fill="currentColor" d="M6 8h2l1-2 2 4 1-2h2l2 2H4z" />
    </svg>
  );

  const toolBtnStyle = (active?: boolean): React.CSSProperties => ({
    display: "grid",
    placeItems: "center",
    width: 36,
    height: 28,
    borderRadius: 8,
    border: `1px solid ${GOLD}`,
    background: active ? "#FFFFFF" : GOLD,
    color: BLACK,
    cursor: "pointer",
  });

  const handleUndo = () => {
    const undo = undoStackRef.current.pop();
    if (undo) {
      undo();
      queueMicrotask(() => {
        setPreviewUrl(urlUnderPlayhead(playhead));
        window.dispatchEvent(new CustomEvent("timeline-scrub", { detail: { t: playhead } }));
      });
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 40,
          borderBottom: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.05)",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          fontSize: 12,
          color: "rgba(255,255,255,.85)",
          gap: 10,
        }}
      >
        <span style={{ marginRight: 6 }}>{formatTimecode(playhead)}</span>

        <button
          title={toolsEnabled ? "Safety: ON (tools allowed)" : "Safety: OFF (tools locked)"}
          style={toolBtnStyle(toolsEnabled)}
          onClick={() => {
            setToolsEnabled((on) => {
              if (on) setTool("select");
              return !on;
            });
          }}
        >
          <IconPointer />
        </button>

        <button
          title="Trim"
          style={toolBtnStyle(tool === "trim")}
          onClick={() => {
            if (!toolsEnabled) return;
            setTool(tool === "trim" ? "select" : "trim");
          }}
        >
          <IconTrim />
        </button>

        <button
          title="Blade (splice)"
          style={toolBtnStyle(tool === "blade")}
          onClick={() => {
            if (!toolsEnabled) return;
            setTool(tool === "blade" ? "select" : "blade");
          }}
        >
          <IconBlade />
        </button>

        <button
          type="button"
          onClick={() => setLinkedVA((v) => !v)}
          title={linkedVA ? "Unlink Video 1 and Audio 1" : "Link Video 1 and Audio 1"}
          style={{
            marginLeft: 8,
            padding: "6px 10px",
            borderRadius: 10,
            border: `1px solid ${GOLD}`,
            background: GOLD,
            color: BLACK,
            cursor: "pointer",
          }}
        >
          {linkedVA ? "Linked" : "Unlinked"}
        </button>

        <button
          type="button"
          onClick={deleteSelected}
          title="Delete Selected Clip"
          style={{
            padding: "6px 10px",
            borderRadius: 10,
            border: `1px solid ${GOLD}`,
            background: GOLD,
            color: BLACK,
            cursor: "pointer",
          }}
        >
          Delete Selected
        </button>

        <button
          type="button"
          onClick={handleUndo}
          title="Undo last action"
          style={{
            padding: "6px 10px",
            borderRadius: 10,
            border: `1px solid ${GOLD}`,
            background: GOLD,
            color: BLACK,
            cursor: "pointer",
          }}
        >
          Undo
        </button>

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

      <div style={{ flex: 1, padding: 12, display: "grid", gap: 10 }}>
        <LaneRow
          index={0}
          title="Video 1"
          width={maxDuration * pxPerSec}
          laneKey="V1"
          onDropId={(id) => {
            addToTimelineById(id, "V1");
            addToTimelineById(id, "A1");
            liveResyncViewer();
          }}
          timeline={timeline as Clip[]}
          pxPerSec={pxPerSec}
          selected={selected}
          setSelected={setSelected}
          setPreviewUrl={setPreviewUrl}
          removeFromTimeline={removeFromTimeline}
          updateClip={updateClip}
          playhead={playhead}
          onScrub={dispatchScrub}
          onLaneScroll={syncScroll}
          onDidMoveClipEnd={liveResyncViewer}
          onDidMoveClipLive={liveResyncViewer}
          onLinkedMove={syncLinkedPairMove}
          tool={tool}
          onBladeCut={bladeCut}
          onLinkedLeftTrim={mirrorLeftTrimToPair}
          onLinkedRightTrim={mirrorRightTrimToPair}
        />

        <LaneRow
          index={1}
          title="Audio 1"
          width={maxDuration * pxPerSec}
          laneKey="A1"
          onDropId={(id) => {
            addToTimelineById(id, "A1");
            liveResyncViewer();
          }}
          timeline={timeline as Clip[]}
          pxPerSec={pxPerSec}
          selected={selected}
          setSelected={setSelected}
          setPreviewUrl={setPreviewUrl}
          removeFromTimeline={removeFromTimeline}
          updateClip={updateClip}
          playhead={playhead}
          onScrub={dispatchScrub}
          onLaneScroll={syncScroll}
          onDidMoveClipEnd={liveResyncViewer}
          onDidMoveClipLive={liveResyncViewer}
          onLinkedMove={syncLinkedPairMove}
          tool={tool}
          onBladeCut={bladeCut}
          onLinkedLeftTrim={mirrorLeftTrimToPair}
          onLinkedRightTrim={mirrorRightTrimToPair}
        />

        <LaneRow
          index={2}
          title="Overlay"
          width={maxDuration * pxPerSec}
          laneKey="O1"
          onDropId={(id) => {
            addToTimelineById(id, "O1");
            liveResyncViewer();
          }}
          timeline={timeline as Clip[]}
          pxPerSec={pxPerSec}
          selected={selected}
          setSelected={setSelected}
          setPreviewUrl={setPreviewUrl}
          removeFromTimeline={removeFromTimeline}
          updateClip={updateClip}
          playhead={playhead}
          onScrub={dispatchScrub}
          onLaneScroll={syncScroll}
          onDidMoveClipEnd={liveResyncViewer}
          onDidMoveClipLive={liveResyncViewer}
          tool={tool}
          onBladeCut={bladeCut}
          onLinkedLeftTrim={undefined}
          onLinkedRightTrim={undefined}
        />

        <LaneRow
          index={3}
          title="Overlay"
          width={maxDuration * pxPerSec}
          laneKey="V2"
          onDropId={(id) => {
            addToTimelineById(id, "V2");
            liveResyncViewer();
          }}
          timeline={timeline as Clip[]}
          pxPerSec={pxPerSec}
          selected={selected}
          setSelected={setSelected}
          setPreviewUrl={setPreviewUrl}
          removeFromTimeline={removeFromTimeline}
          updateClip={updateClip}
          playhead={playhead}
          onScrub={dispatchScrub}
          onLaneScroll={syncScroll}
          onDidMoveClipEnd={liveResyncViewer}
          onDidMoveClipLive={liveResyncViewer}
          tool={tool}
          onBladeCut={bladeCut}
          onLinkedLeftTrim={undefined}
          onLinkedRightTrim={undefined}
        />
      </div>
    </div>
  );
}

type LaneRowProps = {
  index: number;
  title: string;
  width: number;
  laneKey: "V1" | "V2" | "O1" | "A1";
  onDropId: (id: string) => void;
  timeline: Clip[];
  pxPerSec: number;
  selected: any;
  setSelected: any;
  setPreviewUrl: any;
  removeFromTimeline: any;
  updateClip: any;
  playhead: number;
  onScrub: (t: number) => void;
  onLaneScroll: (fromIndex: number, value: number) => void;
  onDidMoveClipEnd: () => void;
  onDidMoveClipLive: () => void;
  onLinkedMove?: (movedLane: "V1" | "A1", movedIdx: number, newStart: number) => void;
  tool: Tool;
  onBladeCut: (laneKey: "V1" | "V2" | "O1" | "A1", clipIdx: number, tAbs: number) => void;
  onLinkedLeftTrim?: (
    sourceLane: "V1" | "A1",
    sourceIdx: number,
    newInForSource: number,
    deltaIn: number
  ) => void;
  onLinkedRightTrim?: (
    sourceLane: "V1" | "A1",
    sourceIdx: number,
    newOutForSource: number,
    deltaOut: number
  ) => void;
};

const LaneRow = React.forwardRef<HTMLDivElement, LaneRowProps>(function LaneRow(
  {
    index,
    title,
    width,
    laneKey,
    onDropId,
    timeline,
    pxPerSec,
    selected,
    setSelected,
    setPreviewUrl,
    removeFromTimeline,
    updateClip,
    playhead,
    onScrub,
    onLaneScroll,
    onDidMoveClipEnd,
    onDidMoveClipLive,
    onLinkedMove,
    tool,
    onBladeCut,
    onLinkedLeftTrim,
    onLinkedRightTrim,
  },
  ref
) {
  const selfRef = useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => selfRef.current as HTMLDivElement);

  const clips = timeline.filter((c) => c.lane === laneKey);

  const scrubFromEvent = (e: MouseEvent | React.MouseEvent) => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    const sc = selfRef.current.scrollLeft;
    const clientX = "clientX" in e ? e.clientX : 0;
    const x = clientX - rect.left + sc - LEFT_PAD;
    onScrub(x / pxPerSec);
  };

  const onHandleDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrubFromEvent(e);
    const move = (ev: MouseEvent) => scrubFromEvent(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div
      ref={selfRef}
      style={laneRowStyle}
      onScroll={(e) => onLaneScroll(index, (e.currentTarget as HTMLDivElement).scrollLeft)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropId(id);
      }}
    >
      <div style={laneTitleStyle}>{title}</div>

      <div
        style={{
          width,
          height: "100%",
          position: "relative",
          display: "block",
          paddingLeft: LEFT_PAD,
        }}
      >
        {/* Playhead */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: LEFT_PAD + playhead * pxPerSec,
            bottom: 0,
            width: 2,
            background: "rgba(255,60,60,.95)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
        <div
          onMouseDown={onHandleDown}
          title="Drag to scrub"
          style={{
            position: "absolute",
            top: 0,
            left: LEFT_PAD + playhead * pxPerSec - 6,
            bottom: 0,
            width: 12,
            cursor: "ew-resize",
            zIndex: 6,
            background: "transparent",
          }}
        />

        {clips.map((clip, idx) => {
          const st = typeof clip.start === "number" ? clip.start : 0;
          const left = LEFT_PAD + st * pxPerSec;

          return (
            <ClipBar
              key={`${clip.id}-${laneKey}-${idx}`}
              clip={clip}
              pxPerSec={pxPerSec}
              left={left}
              selected={selected?.lane === laneKey && selected.index === idx}
              onSelect={() => {
                setSelected({ lane: laneKey, index: idx });
                if (clip.url) setPreviewUrl(clip.url);
              }}
              onRemove={() => removeFromTimeline(laneKey, idx)}
              onTrimStart={(val: number) => updateClip(laneKey, idx, { in: val })}
              onTrimEnd={(val: number) => updateClip(laneKey, idx, { out: val })}
              onDragMove={(newLeftPx: number) => {
                const newStart = Math.max(0, (newLeftPx - LEFT_PAD) / pxPerSec);
                updateClip(laneKey, idx, { start: newStart });
                if (onLinkedMove && (laneKey === "V1" || laneKey === "A1"))
                  onLinkedMove(laneKey, idx, newStart);
                onDidMoveClipLive();
              }}
              onDragEnd={onDidMoveClipEnd}
              isAudio={laneKey === "A1"}
              tool={tool}
              onBladeClick={(tAbs) => onBladeCut(laneKey, idx, tAbs)}
              onLeftTrimLive={(newIn, deltaIn) => {
                if (onLinkedLeftTrim && (laneKey === "V1" || laneKey === "A1")) {
                  onLinkedLeftTrim(laneKey, idx, newIn, deltaIn);
                }
              }}
              onRightTrimLive={(newOut, deltaOut) => {
                if (onLinkedRightTrim && (laneKey === "V1" || laneKey === "A1")) {
                  onLinkedRightTrim(laneKey, idx, newOut, deltaOut);
                }
              }}
            />
          );
        })}
      </div>

      {/* t=0 marker */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: LEFT_PAD,
          bottom: 0,
          width: 2,
          background: "rgba(255,215,0,.9)",
          boxShadow: "0 0 0 1px rgba(0,0,0,.6)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
});

/* ------------------------ Filmstrip generator (video) ------------------------ */
function useFilmstripDense(
  url?: string,
  kind?: "image" | "video" | "other",
  start = 0,
  end = 0,
  barPixelWidth = 300,
  tilePixelWidth = 20
) {
  const [strip, setStrip] = useState<string[]>([]);
  React.useEffect(() => {
    let cancelled = false;
    if (!url || kind !== "video" || barPixelWidth <= 0) {
      setStrip([]);
      return;
    }
    const tiles = Math.max(1, Math.floor(barPixelWidth / Math.max(8, tilePixelWidth)));
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "metadata";
    video.src = url;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const run = async () => {
      await new Promise<void>((res) => {
        if (Number.isFinite(video.duration) && video.videoWidth) return res();
        video.addEventListener("loadedmetadata", () => res(), { once: true });
      });

      const duration = video.duration || 0;
      const clipStart = Math.max(0, start);
      const clipEnd = Math.min(duration || end || 0, end || duration || 0);
      const span = Math.max(0.1, (clipEnd || duration) - clipStart);

      const targetH = 72;
      const aspect = video.videoWidth > 0 ? video.videoWidth / video.videoHeight : 16 / 9;
      const canvasH = targetH;
      const canvasW = Math.round(targetH * aspect);
      canvas.height = canvasH;
      canvas.width = canvasW;

      const images: string[] = [];
      for (let i = 0; i < tiles; i++) {
        if (cancelled) break;
        const t = clipStart + ((i + 0.5) / tiles) * span;

        await new Promise<void>((res) => {
          const onSeeked = () => {
            try {
              ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
              images.push(canvas.toDataURL("image/jpeg", 0.7));
            } catch {}
            res();
          };
          video.currentTime = Math.min(Math.max(0, t), duration || t);
          video.addEventListener("seeked", onSeeked, { once: true });
        });
      }

      if (!cancelled) setStrip(images);
      video.src = "";
      video.load();
    };

    run();
    return () => {
      cancelled = true;
      video.src = "";
      video.load();
    };
  }, [url, kind, start, end, barPixelWidth, tilePixelWidth]);

  return strip;
}

/* ------------------------ Waveform generator (audio) ------------------------ */
/** Draws a Resolve-style filled green waveform for Audio 1 lane. */
function useAudioWaveform(
  url?: string,
  clipInSec: number = 0,
  clipOutSec: number = 0,
  widthPx: number = 300,
  heightPx: number = 94
) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!url || widthPx <= 0 || heightPx <= 0) {
      setDataUrl(null);
      return;
    }

    const draw = async () => {
      try {
        const resp = await fetch(url, { mode: "cors" });
        const buf = await resp.arrayBuffer();

        // Use OfflineAudioContext for decoding
        const audioCtx = new (window.OfflineAudioContext ||
          (window as any).webkitOfflineAudioContext)(1, 44100 * 1, 44100);
        const audioBuffer = await audioCtx.decodeAudioData(buf.slice(0)); // clone for Safari

        const duration = audioBuffer.duration;
        const start = Math.max(0, clipInSec);
        const end = Math.max(start + 0.1, clipOutSec || duration);
        const span = Math.min(duration, end) - start;

        // Sample into N buckets across width
        const buckets = Math.max(100, Math.floor(widthPx / 2));
        const channel = audioBuffer.getChannelData(0);
        const sampleRate = audioBuffer.sampleRate;

        const values = new Float32Array(buckets);
        for (let i = 0; i < buckets; i++) {
          const t0 = start + (i / buckets) * span;
          const t1 = start + ((i + 1) / buckets) * span;
          const s0 = Math.floor(t0 * sampleRate);
          const s1 = Math.min(channel.length, Math.floor(t1 * sampleRate));
          let peak = 0;
          for (let s = s0; s < s1; s++) {
            const v = Math.abs(channel[s]);
            if (v > peak) peak = v;
          }
          values[i] = peak;
        }

        const canvas = document.createElement("canvas");
        canvas.width = widthPx;
        canvas.height = Math.max(60, Math.floor(heightPx - 34)); // below the controls row
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#0b0b0b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw baseline and filled waveform
        const mid = Math.floor(canvas.height / 2);
        ctx.beginPath();
        ctx.moveTo(0, mid);
        for (let i = 0; i < values.length; i++) {
          const x = (i / (values.length - 1)) * canvas.width;
          const amp = values[i];
          const y = mid - amp * (canvas.height * 0.9) * 0.5;
          ctx.lineTo(x, y);
        }
        for (let i = values.length - 1; i >= 0; i--) {
          const x = (i / (values.length - 1)) * canvas.width;
          const amp = values[i];
          const y = mid + amp * (canvas.height * 0.9) * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(0,180,90,0.95)"; // Resolve-like green
        ctx.fill();

        // subtle top gloss
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "rgba(255,255,255,0.08)");
        grad.addColorStop(1, "rgba(255,255,255,0.00)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!cancelled) setDataUrl(canvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) setDataUrl(null);
      }
    };

    draw();
    return () => {
      cancelled = true;
    };
  }, [url, clipInSec, clipOutSec, widthPx, heightPx]);

  return dataUrl;
}

/* --------------------------- Clip component -------------------------- */
function ClipBar({
  clip,
  pxPerSec,
  left,
  selected,
  onSelect,
  onRemove,
  onTrimStart,
  onTrimEnd,
  onDragMove,
  onDragEnd,
  isAudio,
  tool,
  onBladeClick,
  onLeftTrimLive,
  onRightTrimLive,
}: {
  clip: Clip;
  pxPerSec: number;
  left: number;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onTrimStart: (v: number) => void;
  onTrimEnd: (v: number) => void;
  onDragMove: (newLeftPx: number) => void;
  onDragEnd: () => void;
  isAudio?: boolean;
  tool: Tool;
  onBladeClick: (tAbs: number) => void;
  onLeftTrimLive?: (newIn: number, deltaIn: number) => void;
  onRightTrimLive?: (newOut: number, deltaOut: number) => void;
}) {
  const EDGE_GRAB_PX = 12;
  const duration = Math.max(1, clip.out - clip.in);
  const width = Math.max(140, duration * pxPerSec);

  const strip = useFilmstripDense(clip.url, clip.kind as any, clip.in, clip.out, width, 20);

  /** ------ NEW: high-quality waveform for Audio 1 ------ */
  const waveform = useAudioWaveform(
    clip.url,
    clip.in,
    clip.out,
    Math.floor(width),
    94 // matches lane height; hook internally subtracts header
  );

  const dragState = useRef<{ startX: number; startLeft: number } | null>(null);
  const trimState = useRef<null | {
    edge: "left" | "right";
    startX: number;
    startIn: number;
    startOut: number;
    startStart: number;
  }>(null);

  const tryStartTrimFromMouseDown = (e: React.MouseEvent): boolean => {
    if (tool !== "trim") return false;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;

    let edge: "left" | "right" | null = null;
    if (x <= EDGE_GRAB_PX) edge = "left";
    else if (rect.width - x <= EDGE_GRAB_PX) edge = "right";

    if (!edge) return false;

    e.preventDefault();
    e.stopPropagation();

    trimState.current = {
      edge,
      startX: e.clientX,
      startIn: clip.in,
      startOut: clip.out,
      startStart: clip.start ?? 0,
    };

    const move = (ev: MouseEvent) => {
      if (!trimState.current) return;
      const dx = ev.clientX - trimState.current.startX;
      const dSec = dx / pxPerSec;

      if (trimState.current.edge === "left") {
        const proposedIn = trimState.current.startIn + dSec;
        const newIn = Math.max(0, Math.min(trimState.current.startOut - 0.1, proposedIn));
        const delta = newIn - trimState.current.startIn;
        const newStartSec = Math.max(0, trimState.current.startStart + delta);
        const newLeftPx = LEFT_PAD + newStartSec * pxPerSec;

        onTrimStart(newIn);
        onDragMove(newLeftPx);
        onLeftTrimLive && onLeftTrimLive(newIn, delta);
      } else {
        const proposedOut = trimState.current.startOut + dSec;
        const newOut = Math.max(trimState.current.startIn + 0.1, proposedOut);
        const delta = newOut - trimState.current.startOut;

        onTrimEnd(newOut);
        onRightTrimLive && onRightTrimLive(newOut, delta);
      }
    };
    const up = () => {
      trimState.current = null;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      onDragEnd();
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return true;
  };

  const onMouseDownClip = (e: React.MouseEvent) => {
    if (tryStartTrimFromMouseDown(e)) return;

    if (tool === "blade") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const tAbs = (left + x - LEFT_PAD) / pxPerSec;
      onBladeClick(tAbs);
      return;
    }

    if (tool === "select") {
      const target = e.target as HTMLElement;
      if (target.closest("[data-clip-controls]")) return;
      dragState.current = { startX: e.clientX, startLeft: left };
      window.addEventListener("mousemove", onDragMoveHandler);
      window.addEventListener("mouseup", onDragEndHandler);
    }
  };

  const onDragMoveHandler = (ev: MouseEvent) => {
    if (!dragState.current) return;
    const dx = ev.clientX - dragState.current.startX;
    const newLeftPx = Math.max(LEFT_PAD, dragState.current.startLeft + dx);
    onDragMove(newLeftPx);
  };

  const onDragEndHandler = () => {
    dragState.current = null;
    window.removeEventListener("mousemove", onDragMoveHandler);
    window.removeEventListener("mouseup", onDragEndHandler);
    onDragEnd();
  };

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      title={clip.name}
      onMouseDown={onMouseDownClip}
      style={{
        position: "absolute",
        left,
        top: 8,
        width,
        height: 94,
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
        userSelect: "none",
        cursor: tool === "select" ? "grab" : "crosshair",
      }}
    >
      {/* controls row */}
      <div
        data-clip-controls
        style={{
          padding: "6px 8px",
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: "rgba(255,255,255,.04)",
          borderBottom: "1px solid rgba(255,255,255,.12)",
          cursor: "default",
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

      {/* visual body */}
      <div style={{ position: "relative", flex: 1, background: "#000" }}>
        {isAudio ? (
          waveform ? (
            <img
              src={waveform}
              alt=""
              draggable={false}
              style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.98 }}
            />
          ) : (
            // Fallback (if decoding blocked)
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(90deg, rgba(0,255,180,.85) 0 2px, transparent 2px 6px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.9) 30%, rgba(0,0,0,.9) 70%, transparent 100%)",
                opacity: 0.9,
              }}
            />
          )
        ) : strip.length > 0 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: `repeat(${strip.length}, 1fr)`,
            }}
          >
            {strip.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ))}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(0,0,0,.15))",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
