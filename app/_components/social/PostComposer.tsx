"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PostComposerProps = {
  onSubmit?: (text: string) => void;
};

export default function PostComposer({ onSubmit }: PostComposerProps) {
  const [text, setText] = useState("");
  const [attachedMemeNote, setAttachedMemeNote] = useState<string | null>(null);
  const [memeImageUrl, setMemeImageUrl] = useState<string | null>(null);
  const [memeTopText, setMemeTopText] = useState("");
  const [memeBottomText, setMemeBottomText] = useState("");

  // When this component loads, check if the meme page left us a draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    const note = window.localStorage.getItem("draftMemeFromMemeLab");
    const img = window.localStorage.getItem("draftMemeImageUrl") || "";
    const top = window.localStorage.getItem("draftMemeTopText") || "";
    const bottom = window.localStorage.getItem("draftMemeBottomText") || "";

    if (note) setAttachedMemeNote(note);
    if (img) setMemeImageUrl(img);
    if (top) setMemeTopText(top);
    if (bottom) setMemeBottomText(bottom);
  }, []);

  const handlePost = () => {
    // Require either text or a meme attached
    if (!text.trim() && !attachedMemeNote && !memeImageUrl) return;

    if (onSubmit) {
      onSubmit(text.trim());
    }

    // Clear local meme data after posting
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("draftMemeFromMemeLab");
      window.localStorage.removeItem("draftMemeImageUrl");
      window.localStorage.removeItem("draftMemeTopText");
      window.localStorage.removeItem("draftMemeBottomText");
    }

    setText("");
    setAttachedMemeNote(null);
    setMemeImageUrl(null);
    setMemeTopText("");
    setMemeBottomText("");
  };

  const charCount = text.length;

  return (
    <div
      style={{
        border: "2px solid #FFD700",
        borderRadius: 24,
        padding: 16,
        background: "#7B0F24",
        color: "#FFF9F0",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#FFD700" }}>
        Create a social post
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 1500))}
        placeholder="Share your thoughts, link an article, or introduce your latest video…"
        style={{
          minHeight: 120,
          borderRadius: 16,
          border: "1px solid rgba(255,215,0,0.6)",
          padding: 10,
          background: "#7B0F24",
          color: "#FFF9F0",
          resize: "vertical",
        }}
      />

      {/* Attached meme preview (image + overlay text) */}
      {(attachedMemeNote || memeImageUrl || memeTopText || memeBottomText) && (
        <div
          style={{
            borderRadius: 16,
            border: "1px dashed rgba(255,215,0,0.7)",
            padding: 10,
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <strong style={{ color: "#FFD700" }}>Attached meme:</strong>

          <div
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                background: "#ffffff",
                borderRadius: 12,
                width: "100%",
                maxWidth: 260,
                aspectRatio: "1 / 1",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {memeImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={memeImageUrl}
                  alt="Attached meme"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span
                  style={{
                    fontSize: 12,
                    color: "#555",
                    textAlign: "center",
                    padding: 8,
                  }}
                >
                  Meme placeholder (no image selected)
                </span>
              )}

              {/* Overlay texts */}
              {memeTopText && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "2px 6px",
                    fontWeight: 800,
                    color: "#ffffff",
                    textShadow: "0 0 4px rgba(0,0,0,0.9)",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {memeTopText}
                </div>
              )}
              {memeBottomText && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "2px 6px",
                    fontWeight: 800,
                    color: "#ffffff",
                    textShadow: "0 0 4px rgba(0,0,0,0.9)",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {memeBottomText}
                </div>
              )}
            </div>
          </div>

          {attachedMemeNote && (
            <div
              style={{
                fontSize: 12,
                opacity: 0.8,
                marginTop: 6,
              }}
            >
              {attachedMemeNote}
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginTop: 4,
        }}
      >
        {/* Left: character count */}
        <span style={{ fontSize: 12, opacity: 0.8 }}>
          {charCount}/1500 characters
        </span>

        {/* Right: buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {/* Create meme button -> goes to a separate page */}
          <Link
            href="/creator-studio/memes"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "2px solid #FFD700",
              background: "transparent",
              color: "#FFD700",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Create a meme
          </Link>

          {/* Post button */}
          <button
            onClick={handlePost}
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border: "2px solid #FFD700",
              background: "#FFD700",
              color: "#7B0F24",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
