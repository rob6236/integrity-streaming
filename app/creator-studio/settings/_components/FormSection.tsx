// app/creator-studio/settings/_components/FormSection.tsx
"use client";

import React from "react";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type FormSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function FormSection({ title, subtitle, children }: FormSectionProps) {
  return (
    <section
      style={{
        border: `1px solid ${GOLD}`,
        borderRadius: 16,
        padding: "18px 22px",
        marginBottom: 20,
        background:
          "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(123,15,36,0.8))",
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.25), inset 0 0 20px rgba(0,0,0,0.35)",
      }}
    >
      <h3
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: GOLD,
          margin: 0,
          marginBottom: subtitle ? 4 : 10,
          letterSpacing: 0.6,
        }}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {subtitle}
        </p>
      )}

      <div>{children}</div>
    </section>
  );
}
