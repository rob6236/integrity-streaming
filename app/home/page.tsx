"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import CreateButton from "@/app/_components/CreateButton";
import LoginLogoutButton from "@/app/_components/LoginLogoutButton";

/* ---- Theme helpers ---- */
const gold = "rgba(255,215,0,0.90)";
const goldSoft = "rgba(255,215,0,0.65)";
const cardBg = "rgba(0,0,0,0.18)";
const thumbBg = "rgba(0,0,0,0.35)";
const ivory = "#FFF9F0";

function goldOutline(style: CSSProperties = {}): CSSProperties {
  return {
    border: `1px solid ${gold}`,
    borderRadius: 16,
    boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
    ...style,
  };
}

/* ---- Small UI bits ---- */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="gold-button-outline"
      style={{
        borderRadius: 999,
        padding: "8px 16px",
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  );
}

function MetricChip({ label }: { label: string }) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 10,
        border: `1px solid ${gold}`,
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
        fontSize: 13,
      }}
    >
      {label}
    </span>
  );
}

/* ---- Video tiles & rows ---- */
function VideoTile({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ margin: 0 }}>
      {/* ONLY the placeholder has the gold outline now */}
      <div
        style={goldOutline({
          width: "100%",
          aspectRatio: "16 / 9", // keep 16:9
          background: thumbBg,
          borderRadius: 12,
          marginBottom: 8,
        })}
      />
      <div style={{ color: ivory, fontSize: 15, fontWeight: 600 }}>
        Video title goes here
      </div>
      <div style={{ opacity: 0.8, fontSize: 13, marginTop: 2 }}>
        Channel • 12k views • 2 days ago
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        <button className="gold-button">Watch</button>
        <button className="gold-button-outline">Save</button>
        <button className="gold-button-outline">Share</button>
      </div>
    </div>
  );
}

/* header above each row */
function RowHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 24,
        marginBottom: 10,
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 18, color: ivory }}>{title}</h2>
      <div style={{ marginLeft: "auto" }}>
        <Pill>View all</Pill>
      </div>
    </div>
  );
}

/**
 * GRID FOR VIDEOS
 * - Uses CSS grid with auto-fit so:
 *   • Mobile: 1 column
 *   • Tablet/Desktop: multiple columns (thumbnails in rows)
 * - Wrapper adds horizontal padding so placeholders don’t touch page edges.
 */
function VideoRow({ compact = true }: { compact?: boolean }) {
  return (
    <div style={{ padding: "0 12px" }}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          alignItems: "start",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <VideoTile key={i} compact={compact} />
        ))}
      </div>
    </div>
  );
}

/* ---- Feed card (RIGHT COLUMN) ---- */
function FeedCard({
  name,
  handle,
  time,
  text,
  chips = [],
}: {
  name: string;
  handle: string;
  time: string;
  text: string;
  chips?: string[];
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={goldOutline({ background: cardBg, padding: 16 })}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "white",
            color: "#7B0F24",
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            border: `1px solid ${goldSoft}`,
          }}
        >
          {initials}
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{name}</span>
            {chips.map((c, i) => (
              <span
                key={i}
                style={{
                  fontSize: 11,
                  padding: "2px 6px",
                  borderRadius: 999,
                  border: `1px solid ${gold}`,
                  boxShadow:
                    "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            @{handle} • {time}
          </div>
        </div>
      </div>

      <p style={{ marginTop: 12, lineHeight: 1.6 }}>{text}</p>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <MetricChip label="👍 1,290" />
        <MetricChip label="💬 203" />
        <MetricChip label="🔁 190" />
      </div>
    </div>
  );
}

/* ---- Page ---- */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"videos" | "shorts" | "social">(
    "videos"
  );

  return (
    <>
      <main
        className="mx-auto w-full max-w-[1200px] px-4 md:px-6 pb-16"
        style={{ overflowX: "hidden" }}
      >
        {/* HEADER inside shell so it stays between the smileys */}
        <div className="header-shell">
          <div
            style={goldOutline({
              background: "transparent",
              padding: 10,
              marginTop: 16,
            })}
          >
            {/* TOP OF HEADER: logo on left (moved inward), title and buttons below */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Row with logo + title + spacer (structure is same for all) */}
              <div
                id="headerRowTop"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  columnGap: 16,
                }}
              >
                {/* LOGO — left, moved inward across all versions */}
                <div className="flex justify-start" style={{ marginLeft: 40 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 16,
                      background: "#ffffff",
                      overflow: "hidden",
                      position: "relative",
                      display: "block",
                    }}
                    className="sm:w-[88px] sm:h-[88px] md:w-[96px] md:h-[96px]"
                  >
                    <Image
                      src="/logo.png"
                      alt="Integrity Streaming"
                      fill
                      sizes="96px"
                      priority
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        transform: "scale(1.2)",
                        transformOrigin: "center",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* TITLE */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    id="isHeaderTitle"
                    className="text-center leading-tight"
                    style={{
                      color: "#FFD700",
                      fontStyle: "italic",
                      fontWeight: 800,
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <span className="is-title-word">Integrity</span>{" "}
                    <span className="is-title-word">Streaming</span>
                  </h1>
                </div>

                {/* spacer for mobile symmetry (we'll ignore it on larger screens via CSS if needed) */}
                <div
                  id="headerRightSpacer"
                  style={{
                    width: 80,
                    visibility: "hidden",
                  }}
                  className="sm:block hidden"
                />
              </div>

              {/* BUTTONS — just below title */}
              <div
                style={{
                  marginTop: 6,
                  marginBottom: 4,
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {/* My Channel */}
                <div
                  style={{
                    transform: "scale(0.78)",
                    transformOrigin: "center",
                  }}
                >
                  <Link
                    href="/channel/sample?owner=1"
                    style={{
                      borderRadius: 999,
                      border: "2px solid #FFD700",
                      background: "#7B0F24",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: 13,
                      padding: "6px 18px",
                      textDecoration: "none",
                      boxShadow:
                        "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    My Channel
                  </Link>
                </div>

                {/* Create */}
                <div
                  style={{
                    transform: "scale(0.78)",
                    transformOrigin: "center",
                  }}
                >
                  <CreateButton />
                </div>

                {/* Logout / Login */}
                <div
                  style={{
                    transform: "scale(0.78)",
                    transformOrigin: "center",
                  }}
                >
                  <LoginLogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BIG GAP between header and search bar */}
        <div style={{ height: 32 }} />

        {/* SEARCH BAR – outside header, with padding around it */}
        <div className="header-shell">
          <div style={{ padding: "0 8px 0 8px" }}>
            <input
              placeholder="Search videos, channels, topics..."
              style={{
                width: "100%",
                borderRadius: 12,
                border: `1px solid ${gold}`,
                padding: "12px 16px",
                outline: "none",
                background: "rgba(0, 0, 0, 0.25)",
                color: ivory,
                boxShadow:
                  "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
              }}
            />
          </div>
        </div>

        {/* SMALLER GAP between search bar and buttons */}
        <div style={{ height: 10 }} />

        {/* VIDEOS / SHORTS / SOCIAL FEEDS TOGGLE */}
        <div className="header-shell">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              columnGap: 10,
              rowGap: 6,
              maxWidth: 420,
              margin: "0 auto",
              padding: "4px 0",
            }}
          >
            {(["videos", "shorts", "social"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label =
                tab === "videos"
                  ? "Videos"
                  : tab === "shorts"
                  ? "Shorts"
                  : "Social Feeds";

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    width: "100%",
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: `2px solid ${gold}`,
                    background: isActive ? "#FFD700" : "#3b020f",
                    color: isActive ? "#7B0F24" : "#FFFFFF",
                    fontWeight: 800,
                    fontSize: 13,
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(255,215,0,0.7), 0 0 14px rgba(255,215,0,0.25)"
                      : "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SMALL GAP between buttons row and the body of the page */}
        <div style={{ height: 12 }} />

        {/* BODY LAYOUT */}
        <div className="mt-2 md:mt-4 md:grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-5">
          {/* LEFT SIDE: videos or shorts */}
          <section className="min-w-0">
            {activeTab === "videos" && (
              <>
                {/* Featured video */}
                <div
                  style={goldOutline({
                    background: "transparent",
                    padding: 14,
                    marginBottom: 18,
                  })}
                >
                  <div
                    style={goldOutline({
                      background: "transparent",
                      padding: 10,
                    })}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 1440,
                        margin: "0 auto",
                        aspectRatio: "16 / 9",
                        borderRadius: 12,
                        background: thumbBg,
                        border: `1px solid ${goldSoft}`,
                      }}
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 700, color: ivory }}>
                      Featured video
                    </div>
                    <div style={{ opacity: 0.8, fontSize: 13 }}>
                      A curated, high-quality pick.
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                      <button className="gold-button">Play</button>
                      <button className="gold-button-outline">
                        Add to queue
                      </button>
                      <button className="gold-button-outline">Share</button>
                    </div>
                  </div>
                </div>

                {/* Rows */}
                <RowHeader title="Suggested for you" />
                <VideoRow compact />

                <RowHeader title="Continue watching" />
                <VideoRow compact />

                <RowHeader title="Watch history" />
                <VideoRow compact />
              </>
            )}

            {activeTab === "shorts" && (
              <>
                <RowHeader title="Recommended Shorts" />
                {/* GRID FOR SHORTS – placeholders in rows, with padding wrapper */}
                <div style={{ padding: "0 12px" }}>
                  <div
                    style={{
                      display: "grid",
                      gap: 16,
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(140px, 1fr))",
                      alignItems: "start",
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} style={{ margin: 0 }}>
                        <div
                          style={goldOutline({
                            width: "100%",
                            aspectRatio: "9 / 16",
                            background: thumbBg,
                            borderRadius: 12,
                            marginBottom: 8,
                          })}
                        />
                        <div
                          style={{
                            color: ivory,
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          Short title goes here
                        </div>
                        <div style={{ opacity: 0.8, fontSize: 11 }}>
                          Channel • 24k views • 1 day ago
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>

          {/* RIGHT SIDE: social feed (only when Social tab is active) */}
          {activeTab === "social" && (
            <aside className="mt-8 md:mt-0 min-w-0">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: ivory,
                  }}
                >
                  Social Feeds
                </h2>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <Pill>Trending</Pill>
                  <Pill>Following</Pill>
                </div>
              </div>

              {/* Social feed list with padding wrapper */}
              <div style={{ padding: "0 12px" }}>
                <div style={{ display: "grid", gap: 16, marginTop: 12 }}>
                  <FeedCard
                    name="Tech Truths"
                    handle="techtruths"
                    time="45 minutes ago"
                    text="AI-assisted editing workflows: my 3-step setup that cut post time by 60%."
                    chips={["X"]}
                  />
                  <FeedCard
                    name="Mira VFX"
                    handle="miravfx"
                    time="5 hours ago"
                    text="Quick LUT pack for low-light creators. Free download for 24h."
                    chips={["TikTok"]}
                  />
                  <FeedCard
                    name="Avery Johnson"
                    handle="averycreates"
                    time="13 minutes ago"
                    text="Dropped a deep-dive on creator revenue splits. TL;DR: Integrity Streaming is 🔥"
                    chips={["YouTube", "Following"]}
                  />
                  <FeedCard
                    name="Studio Sage"
                    handle="studiosage"
                    time="2 hours ago"
                    text="Threads: color grading tips for documentary footage."
                    chips={["Threads"]}
                  />
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Scoped CSS for title behavior and tablet/desktop shift */}
      <style jsx>{`
        /* Mobile default: stacked title, smaller font */
        #isHeaderTitle {
          font-size: 24px;
        }
        .is-title-word {
          display: block;
        }

        /* Tablet + desktop:
           - Bigger font
           - Words side-by-side
           - Shift entire title 40px left to align visually with other elements
        */
        @media (min-width: 768px) {
          #isHeaderTitle {
            font-size: 44px;
            transform: translateX(-40px);
          }
          .is-title-word {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}
