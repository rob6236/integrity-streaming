"use client";
import React, { PropsWithChildren } from "react";

const GOLD = "#FFD700";
const CARD_BG = "rgba(0,0,0,0.18)";

export default function StudioCard({
  span,
  minHeight = 200,
  title,
  children,
}: PropsWithChildren<{ span: number; minHeight?: number; title?: string }>) {
  return (
    <section
      style={{
        gridColumn: `span ${span} / span ${span}`,
        background: CARD_BG,
        border: `3px solid ${GOLD}`,
        borderRadius: 18,
        padding: 12,
        minHeight,
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
            paddingBottom: 6,
            borderBottom: `2px solid ${GOLD}`,
          }}
        >
          <h2 style={{ color: GOLD, fontSize: 16, fontWeight: 800, margin: 0 }}>{title}</h2>
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
