// app/channel/[handle]/page.tsx
"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChannelPage() {
  // Preview owner controls by visiting: /channel/anything?owner=1
  const search = useSearchParams();
  const isOwner = useMemo(() => search.get("owner") === "1", [search]);

  // Brand tokens
  const burgundy = "#7B0F24";
  const gold = "#FFD700";
  const ivory = "#FFF9F0";

  // Channel image upload/preview (visible on both views)
  const [channelImage, setChannelImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickImage = () => fileInputRef.current?.click();
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setChannelImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    // TODO: persist to Firebase (Storage + Firestore)
  };

  return (
    <div style={{ minHeight: "100vh", background: burgundy, color: ivory }}>
      {/* ===== Static header (two rows) ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: burgundy,
          borderBottom: `1px solid ${gold}99`,
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "18px 20px 10px" }}>
          {/* Row 1: brand + right controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              minHeight: 84,
            }}
          >
            {/* Brand: logo + styled title */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1, minWidth: 0 }}>
              <Image
                src="/logo.png"
                alt="Integrity Streaming logo"
                width={420}
                height={100}
                priority
                style={{ height: 76, width: "auto", display: "block" }}
              />

              {/* GOLD title styled like sample: 'Integrity' italic, shadowed */}
              <div
                aria-label="Integrity Streaming"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  color: gold,
                  letterSpacing: 0.4,
                  textShadow: "0 2px 0 #5c0616, 0 3px 6px rgba(0,0,0,0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 36, fontWeight: 800, fontStyle: "italic" }}>
                  Integrity
                </span>
                <span style={{ fontSize: 36, fontWeight: 800 }}>Streaming</span>
              </div>
            </div>

            {/* Right-side buttons */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
              {isOwner ? (
                <>
                  <button
                    style={{
                      padding: "10px 18px",
                      borderRadius: 18,
                      border: `1px solid ${gold}B3`,
                      color: "#fff",
                      background: "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Edit Layout
                  </button>
                  <a
                    href="/creator-studio"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 24,
                      background: gold,
                      color: "#000",
                      fontWeight: 700,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Creator Studio
                  </a>
                  <button
                    style={{
                      padding: "10px 18px",
                      borderRadius: 18,
                      border: `1px solid ${gold}B3`,
                      color: "#fff",
                      background: "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Customize
                  </button>
                </>
              ) : (
                <button
                  style={{
                    padding: "10px 18px",
                    borderRadius: 24,
                    background: gold,
                    color: "#000",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  SUBSCRIBE
                </button>
              )}
            </div>
          </div>

          {/* Row 2: tabs */}
          <nav style={{ marginTop: 10, borderTop: `1px solid ${gold}66`, paddingTop: 10 }}>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                gap: 32,
                margin: 0,
                padding: 0,
                fontSize: 20,
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <li>Home</li>
              <li>Videos</li>
              <li>Shorts</li>
              <li>Playlists</li>
              <li>About</li>
              {isOwner && <li>Analytics</li>}
            </ul>
          </nav>
        </div>
      </header>

      {/* ===== Channel header ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Circle avatar with centered content + centered Edit button */}
          <div
            style={{
              position: "relative",
              width: 144,
              height: 144,
              borderRadius: "50%",
              border: `1px solid ${gold}CC`,
              overflow: "hidden",
              background: "rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {channelImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={channelImage}
                alt="Channel image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: 700,
                  color: gold,
                  pointerEvents: "none",
                }}
              >
                CHANNEL
                <br />
                IMAGE
              </span>
            )}

            {/* Centered “Edit” button */}
            <button
              onClick={onPickImage}
              aria-label="Edit channel image"
              title="Edit channel image"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: 10,
                padding: "6px 12px",
                borderRadius: 14,
                background: gold,
                color: "#000",
                fontWeight: 800,
                fontSize: 12,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
              }}
            >
              Edit
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: gold, margin: 0 }}>
              Channel Name
            </h2>
            <p style={{ marginTop: 8, fontSize: 18, opacity: 0.9 }}>120 K subscribers</p>
          </div>
        </div>
      </section>

      {/* ===== Videos row ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 32px" }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: gold, margin: "0 0 16px" }}>
          Videos
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                border: `1px solid ${gold}66`,
                background: "rgba(0,0,0,0.2)",
                padding: 16,
              }}
            >
              <div
                style={{
                  aspectRatio: "16 / 9",
                  width: "100%",
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${gold}4D`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 28 }}>▶</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontWeight: 600, margin: 0 }}>Video Title</p>
                <p style={{ fontSize: 13, opacity: 0.9, margin: 0 }}>1.2K views · 6 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Shorts row (styled like Videos, but 9:16) ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 48px" }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: gold, margin: "0 0 16px" }}>
          Shorts
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                border: `1px solid ${gold}66`,
                background: "rgba(0,0,0,0.2)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  aspectRatio: "9 / 16",
                  width: "100%",
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${gold}4D`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 28 }}>▶</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontWeight: 600, margin: 0 }}>Shorts Title</p>
                <p style={{ fontSize: 13, opacity: 0.9, margin: 0 }}>12K views · 3 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
