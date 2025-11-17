"use client";

import React, { useState } from "react";

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

type ReplyBoxProps = {
  onSend: (text: string) => void;
};

export default function ReplyBox({ onSend }: ReplyBoxProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${GOLD}`,
        backgroundColor: "rgba(0,0,0,.4)",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: GOLD,
        }}
      >
        Reply
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="Type your reply to this viewer..."
        style={{
          width: "100%",
          resize: "vertical",
          borderRadius: 12,
          border: `1px solid ${GOLD}`,
          padding: 8,
          backgroundColor: "#3f0912",
          color: "white",
          fontFamily: "inherit",
          fontSize: 13,
          outline: "none",
        }}
      />

      <button
        type="button"
        onClick={handleSend}
        style={{
          alignSelf: "flex-end",
          padding: "8px 18px",
          borderRadius: 999,
          border: `2px solid ${GOLD}`,
          backgroundColor: GOLD,
          color: BURGUNDY,
          fontWeight: 800,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: "0 0 8px rgba(0,0,0,.8)",
        }}
      >
        Send reply
      </button>
    </div>
  );
}
