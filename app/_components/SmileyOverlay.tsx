"use client";

import { useEffect, useState } from "react";
import DancingSmiley from "../creator-studio/_components/DancingSmiley";

// Make TypeScript aware of our global flag
declare global {
  interface Window {
    __integritySmileyMounted?: boolean;
  }
}

/**
 * Global singleton overlay: exactly one pair of smileys.
 * Fixed to the viewport edges (same spot on every page).
 */
export default function SmileyOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // if another instance is already active, don't render this one
    if (typeof window !== "undefined") {
      if (window.__integritySmileyMounted) {
        setActive(false);
        return;
      }
      window.__integritySmileyMounted = true;
      setActive(true);

      // cleanup on hot-reload / route changes
      return () => {
        window.__integritySmileyMounted = false;
      };
    }
  }, []);

  if (!active) return null;

  const size = 56;   // adjust size if you like
  const top = 10;    // px from top
  const margin = 8;  // px from the left/right edges

  return (
    <>
      {/* Left */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-[9999]"
        style={{ top, left: margin }}
      >
        <DancingSmiley size={size} side="left" />
      </div>

      {/* Right */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-[9999]"
        style={{ top, right: margin }}
      >
        <DancingSmiley size={size} side="right" />
      </div>
    </>
  );
}
