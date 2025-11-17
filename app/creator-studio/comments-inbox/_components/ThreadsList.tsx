"use client";

import React from "react";

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

export type ThreadSummary = {
  id: string;
  videoTitle: string;
  topCommentSnippet: string;
  lastUpdated: string;
  unreadCount: number;
  totalCount: number;
};

type ThreadsListProps = {
  threads: ThreadSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function ThreadsList({
  threads,
  selectedId,
  onSelect,
}: ThreadsListProps) {
  if (threads.length === 0) {
    return (
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#ffe8a1",
        }}
      >
        No comment threads yet.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 8,
          color: GOLD,
        }}
      >
        Threads
      </div>

      <div
        style={{
          borderRadius: 16,
          border: `1px solid ${GOLD}`,
          backgroundColor: "rgba(0,0,0,.4)",
          padding: 8,
          maxHeight: 430,
          overflowY: "auto",
        }}
      >
        {threads.map((t) => {
          const isSelected = t.id === selectedId;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              style={{
                width: "100%",
                textAlign: "left",
                marginBottom: 8,
                padding: "8px 10px",
                borderRadius: 12,
                border: isSelected ? `2px solid ${GOLD}` : "1px solid #aa7a00",
                backgroundColor: isSelected
                  ? GOLD
                  : "rgba(0,0,0,.7)",
                color: isSelected ? BURGUNDY : "white",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: isSelected
                  ? "0 0 10px rgba(0,0,0,.9)"
                  : "0 0 4px rgba(0,0,0,.75)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  marginBottom: 2,
                }}
              >
                {t.videoTitle}
              </div>
              <div
                style={{
                  fontSize: 12,
                  opacity: 0.95,
                  marginBottom: 4,
                }}
              >
                {t.topCommentSnippet}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  fontWeight: 600,
                  opacity: 0.9,
                }}
              >
                <span>{t.totalCount} comments</span>
                {t.unreadCount > 0 && (
                  <span style={{ fontWeight: 800 }}>
                    Unread: {t.unreadCount}
                  </span>
                )}
                <span>{t.lastUpdated}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
