"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 18px",
  borderRadius: 999,
  border: "2px solid #FFD700", // gold
  background: "#7B0F24",       // burgundy
  color: "#FFFFFF",            // white text
  fontWeight: 800,
  fontSize: 14,
  lineHeight: 1,
  textDecoration: "none",
  boxShadow:
    "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
  cursor: "pointer",
};

export default function CreateButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/creator-studio")}
      style={pillStyle}
    >
      Create
    </button>
  );
}
