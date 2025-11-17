"use client";

import React from "react";

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

export type CommentRole = "viewer" | "creator";

export type CommentMessage = {
  id: string;
  authorName: string;
  role: CommentRole;
  text: string;
  createdAt: string;
};

type ConversationViewProps = {
  threadTitle: string;
  messages: CommentMessage[];
};

export default function ConversationView({
  threadTitle,
  messages,
}: ConversationViewProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${GOLD}`,
        backgroundColor: "rgba(0,0,0,.38)",
        padding: 12,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: GOLD,
          }}
        >
          Conversation
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#ffe8a1",
          }}
        >
          Video: {threadTitle}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: 4,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              fontSize: 13,
              color: "#ffe8a1",
              fontWeight: 600,
            }}
          >
            No messages yet. Select a thread and start replying.
          </div>
        )}

        {messages.map((m) => {
          const isCreator = m.role === "creator";

          return (
            <div
              key={m.id}
              style={{
                alignSelf: isCreator ? "flex-end" : "flex-start",
                maxWidth: "88%",
              }}
            >
              <div
                style={{
                  backgroundColor: isCreator
                    ? GOLD
                    : "rgba(0,0,0,.9)",
                  color: isCreator ? BURGUNDY : "white",
                  padding: "8px 10px",
                  borderRadius: isCreator
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  border: `1px solid ${GOLD}`,
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow: "0 0 8px rgba(0,0,0,.8)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    marginBottom: 2,
                  }}
                >
                  {isCreator ? "You" : m.authorName}
                </div>
                <div>{m.text}</div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  opacity: 0.85,
                  marginTop: 2,
                  textAlign: isCreator ? "right" : "left",
                }}
              >
                {m.createdAt}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
