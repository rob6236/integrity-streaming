// app/onboarding/profile-photo/page.tsx
"use client";

import React from "react";

export default function ProfilePhotoPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#7B0F24",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 16,
          border: "2px solid #FFD700",
          padding: 24,
          background: "rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>
          Profile Photo Setup
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85 }}>
          This profile photo step is a placeholder for now. 
          The onboarding flow will continue to work while we 
          finish wiring this page.
        </p>
      </div>
    </div>
  );
}
