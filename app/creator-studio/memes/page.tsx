// app/creator-studio/memes/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const ivory = "#FFF9F0";

export default function MemeCreatorPage() {
  const router = useRouter();

  const [aiPrompt, setAiPrompt] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickImage = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleFakeAiGenerate = () => {
    // This is just a placeholder for now.
    if (!aiPrompt.trim()) return;
    setTopText("AI Meme Title");
    setBottomText("Generated from your prompt (placeholder)");
    alert("AI meme generation UI placeholder. Real AI coming later.");
  };

  const handleSendToSocial = () => {
    if (typeof window !== "undefined") {
      const noteParts: string[] = [];
      if (imageUrl) noteParts.push("Custom image");
      if (topText || bottomText) noteParts.push("with text overlay");
      if (!noteParts.length) noteParts.push("Blank meme canvas");

      window.localStorage.setItem(
        "draftMemeFromMemeLab",
        `Meme created in Meme Lab (${noteParts.join(" ")})`
      );

      // Store details so the composer can render a visual preview
      if (imageUrl) {
        window.localStorage.setItem("draftMemeImageUrl", imageUrl);
      } else {
        window.localStorage.removeItem("draftMemeImageUrl");
      }

      window.localStorage.setItem("draftMemeTopText", topText || "");
      window.localStorage.setItem("draftMemeBottomText", bottomText || "");
    }

    // Go back to the Posts (Social) page
    router.push("/creator-studio/posts");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: burgundy,
        color: ivory,
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: gold,
          marginBottom: 8,
        }}
      >
        Meme Creator
      </h1>
      <p style={{ opacity: 0.85, marginBottom: 24 }}>
        Use AI or your own graphics to create a meme for your social feed. When
        you&apos;re finished, send it back to your Posts (Social) composer.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Canvas area */}
        <section
          style={{
            border: `2px solid ${gold}`,
            borderRadius: 24,
            padding: 16,
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: gold,
              marginBottom: 12,
            }}
          >
            Canvas
          </h2>

          {/* White meme canvas */}
          <div
            style={{
              position: "relative",
              background: "#ffffff",
              borderRadius: 16,
              minHeight: 320,
              maxHeight: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Image layer */}
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Meme background"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: 14,
                  color: "#555",
                  textAlign: "center",
                  padding: 16,
                }}
              >
                Big blank white canvas. Upload an image or use AI to generate an
                idea, then add your text.
              </span>
            )}

            {/* Text overlay */}
            {(topText || bottomText) && (
              <>
                {topText && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "4px 8px",
                      fontWeight: 800,
                      color: "#ffffff",
                      textShadow: "0 0 4px rgba(0,0,0,0.9)",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {topText}
                  </div>
                )}
                {bottomText && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "4px 8px",
                      fontWeight: 800,
                      color: "#ffffff",
                      textShadow: "0 0 4px rgba(0,0,0,0.9)",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {bottomText}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Image controls */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onPickImage}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: `2px solid ${gold}`,
                background: "#FFF9F0",
                color: burgundy,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Upload graphic / image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />

            <span style={{ fontSize: 12, opacity: 0.75 }}>
              Drag &amp; drop support and advanced tools can be added later.
            </span>
          </div>
        </section>

        {/* RIGHT: AI + text editor + send button */}
        <section
          style={{
            border: `2px solid ${gold}`,
            borderRadius: 24,
            padding: 16,
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* AI prompt area */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: gold,
                marginBottom: 8,
              }}
            >
              AI prompt (idea generator)
            </h3>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe the meme you want. Example: 'Funny meme about staying up all night editing videos.'"
              style={{
                width: "100%",
                minHeight: 80,
                borderRadius: 12,
                border: "1px solid rgba(255,215,0,0.7)",
                padding: 8,
                background: burgundy,
                color: ivory,
              }}
            />
            <button
              onClick={handleFakeAiGenerate}
              style={{
                marginTop: 8,
                padding: "6px 14px",
                borderRadius: 999,
                border: `2px solid ${gold}`,
                background: gold,
                color: burgundy,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Generate meme idea (placeholder)
            </button>
          </div>

          {/* Text editor */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: gold,
                marginBottom: 8,
              }}
            >
              Text overlay
            </h3>
            <label
              style={{
                display: "block",
                fontSize: 13,
                marginBottom: 4,
                opacity: 0.85,
              }}
            >
              Top text
            </label>
            <input
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="TOP TEXT"
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid rgba(255,215,0,0.7)",
                padding: 8,
                marginBottom: 8,
                background: burgundy,
                color: ivory,
              }}
            />
            <label
              style={{
                display: "block",
                fontSize: 13,
                marginBottom: 4,
                opacity: 0.85,
              }}
            >
              Bottom text
            </label>
            <input
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="BOTTOM TEXT"
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid rgba(255,215,0,0.7)",
                padding: 8,
                background: burgundy,
                color: ivory,
              }}
            />
          </div>

          {/* Send back button */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.8 }}>
              When you&apos;re happy with your meme, send it back to your
              Posts (Social) composer.
            </span>

            <button
              onClick={handleSendToSocial}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: `2px solid ${gold}`,
                background: gold,
                color: burgundy,
                fontWeight: 800,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Send to Social Post
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
