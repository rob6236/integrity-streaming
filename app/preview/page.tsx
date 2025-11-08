// app/preview/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import PreviewFrame from "./PreviewFrame";
import { DEVICE_PRESETS, INTEGRITY_COLORS } from "@/lib/preview/devices";

type DeviceState = {
  id: string;
  label: string;
  width: number;
  height: number;
  enabled: boolean;
};

export default function PreviewPage() {
  const [routePath, setRoutePath] = useState<string>("/");
  const [devices, setDevices] = useState<DeviceState[]>(
    DEVICE_PRESETS.map((d) => ({ ...d, enabled: true }))
  );
  const [customEnabled, setCustomEnabled] = useState<boolean>(false);
  const [customWidth, setCustomWidth] = useState<number>(414);
  const [customHeight, setCustomHeight] = useState<number>(896);
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [scalePct, setScalePct] = useState<number>(80);

  // NEW: follow navigation from the first active frame
  const [followActive, setFollowActive] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("path");
    if (p) setRoutePath(p);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("path", routePath || "/");
    window.history.replaceState(null, "", url.toString());
  }, [routePath]);

  const activeDevices = useMemo(() => {
    const base = devices.filter((d) => d.enabled);
    if (customEnabled && customWidth > 0 && customHeight > 0) {
      base.push({
        id: "custom",
        label: `Custom (${customWidth}×${customHeight})`,
        width: customWidth,
        height: customHeight,
        enabled: true,
      } as DeviceState);
    }
    return base;
  }, [devices, customEnabled, customWidth, customHeight]);

  function toggleDevice(id: string) {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d))
    );
  }

  function normalizePath(input: string) {
    if (!input) return "/";
    return input.startsWith("/") ? input : `/${input}`;
  }

  // We’ll send onLocationChange only to the first active device
  const firstActiveId = activeDevices[0]?.id;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #21050C 0%, #140207 40%, #0B0B0B 100%)",
      }}
    >
      {/* Controls bar */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: INTEGRITY_COLORS.burgundy,
          borderBottom: `1px solid ${INTEGRITY_COLORS.gold}`,
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <div
              className="w-8 h-8 rounded-md"
              style={{
                background: INTEGRITY_COLORS.burgundy,
                border: `2px solid ${INTEGRITY_COLORS.gold}`,
                boxShadow: "0 0 0 1px rgba(255,215,0,0.45)",
              }}
              title="Integrity Streaming"
            />
            <div
              className="text-sm font-bold tracking-wide"
              style={{ color: INTEGRITY_COLORS.gold }}
            >
              Integrity Streaming — Preview
            </div>
          </div>

          {/* Route input */}
          <div className="flex items-center gap-2">
            <label
              className="text-xs font-semibold"
              style={{ color: INTEGRITY_COLORS.ivory }}
            >
              Route
            </label>
            <input
              value={routePath}
              onChange={(e) => setRoutePath(normalizePath(e.target.value))}
              placeholder="/creator-studio"
              className="px-3 py-2 text-sm rounded-md w-64 outline-none"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: `1px solid ${INTEGRITY_COLORS.gold}`,
              }}
            />
          </div>

          {/* Devices */}
          <div className="flex items-center gap-3">
            {devices.map((d) => (
              <label key={d.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={() => toggleDevice(d.id)}
                />
                <span
                  className="text-xs"
                  style={{ color: INTEGRITY_COLORS.ivory }}
                >
                  {d.label}
                </span>
              </label>
            ))}

            {/* Custom size */}
            <label className="flex items-center gap-1 ml-2">
              <input
                type="checkbox"
                checked={customEnabled}
                onChange={() => setCustomEnabled((v) => !v)}
              />
              <span className="text-xs" style={{ color: INTEGRITY_COLORS.ivory }}>
                Custom
              </span>
            </label>
            <input
              type="number"
              min={200}
              value={customWidth}
              onChange={(e) => setCustomWidth(parseInt(e.target.value || "0", 10))}
              className="px-2 py-1 text-xs rounded-md w-20 outline-none"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: `1px solid ${INTEGRITY_COLORS.gold}`,
              }}
              placeholder="Width"
              title="Custom width (px)"
            />
            <input
              type="number"
              min={300}
              value={customHeight}
              onChange={(e) => setCustomHeight(parseInt(e.target.value || "0", 10))}
              className="px-2 py-1 text-xs rounded-md w-20 outline-none"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: `1px solid ${INTEGRITY_COLORS.gold}`,
              }}
              placeholder="Height"
              title="Custom height (px)"
            />
          </div>

          {/* Scaling + Follow */}
          <div className="flex items-center gap-3 ml-auto">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoFit}
                onChange={() => setAutoFit((v) => !v)}
              />
              <span className="text-xs" style={{ color: INTEGRITY_COLORS.ivory }}>
                Auto-fit
              </span>
            </label>

            {!autoFit && (
              <>
                <input
                  type="range"
                  min={25}
                  max={150}
                  step={5}
                  value={scalePct}
                  onChange={(e) => setScalePct(parseInt(e.target.value, 10))}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: INTEGRITY_COLORS.gold }}
                >
                  {scalePct}%
                </span>
              </>
            )}

            <label className="flex items-center gap-2 ml-3">
              <input
                type="checkbox"
                checked={followActive}
                onChange={() => setFollowActive((v) => !v)}
              />
              <span className="text-xs" style={{ color: INTEGRITY_COLORS.ivory }}>
                Follow active frame
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Frames */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {activeDevices.map((d, idx) => (
            <PreviewFrame
              key={`${d.id}-${idx}`}
              title={d.label}
              path={routePath}
              width={d.width}
              height={d.height}
              autoFit={autoFit}
              scalePct={scalePct}
              frameId={`frame-${d.id}-${idx}`}
              // Only the first active device reports location changes
              watchLocation={followActive && d.id === firstActiveId}
              onLocationChange={(p) => {
                // avoid loops: only update if it really changed
                if (p && p !== routePath) setRoutePath(p);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
