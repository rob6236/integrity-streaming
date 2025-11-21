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
      style={{ borderRadius: 12, padding: "8px 14px" }}
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
    <div style={goldOutline({ background: cardBg, padding: 16 })}>
      <div
        style={{
          height: compact ? 160 : 200,
          background: thumbBg,
          border: `1px solid ${goldSoft}`,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />
      <div style={{ color: ivory, fontSize: 15, fontWeight: 600 }}>
        Video title goes here
      </div>
      <div style={{ opacity: 0.8, fontSize: 13, marginTop: 2 }}>
        Channel • 12k views • 2 days ago
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="gold-button">Watch</button>
        <button className="gold-button-outline">Save</button>
        <button className="gold-button-outline">Share</button>
      </div>
    </div>
  );
}

function RowHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 18,
        marginBottom: 8,
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 18, color: ivory }}>{title}</h2>
      <div style={{ marginLeft: "auto" }}>
        <Pill>View all</Pill>
      </div>
    </div>
  );
}

function VideoRow({ compact = true }: { compact?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <VideoTile key={i} compact={compact} />
      ))}
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
  // Mobile-only toggle: which body content is visible
  const [mobileTab, setMobileTab] = useState<"videos" | "social">("videos");

  const videoSectionClass =
    mobileTab === "videos" ? "block md:block" : "hidden md:block";
  const socialSectionClass =
    mobileTab === "social" ? "block md:block" : "hidden md:block";

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 md:px-6 pb-16">
      {/* HEADER in a centered shell between smileys */}
      <div className="header-shell">
        <div
          style={goldOutline({
            background: "transparent",
            padding: 20,
            marginTop: 16,
            textAlign: "center",
          })}
        >
          {/* Logo */}
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 16,
                background: "#ffffff",
                overflow: "hidden",
                position: "relative",
                display: "block",
              }}
            >
              <Image
                src="/logo.png"
                alt="Integrity Streaming"
                fill
                sizes="110px"
                priority
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  transform: "scale(1.3)",
                  transformOrigin: "center",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h1
            id="isHeaderTitle"
            className="text-[36px] md:text-[44px] leading-none"
            style={{
              color: "#FFD700",
              fontStyle: "italic",
              fontWeight: 800,
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            Integrity <span style={{ fontStyle: "normal" }}>Streaming</span>
          </h1>

          {/* Buttons row */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
              gap: 12, // space between My Channel / Create / Login-Logout
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/channel/sample?owner=1"
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: "2px solid #FFD700",
                background: "#7B0F24",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: 16,
                textDecoration: "none",
                boxShadow:
                  "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
                whiteSpace: "nowrap",
              }}
            >
              My Channel
            </Link>

            <CreateButton />
            <LoginLogoutButton />
          </div>
        </div>
      </div>

      {/* SEARCH BAR – padded away from header and toggle */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        <input
          placeholder="Search videos, channels, topics..."
          style={{
            width: "min(680px, 100%)",
            borderRadius: 12,
            border: `1px solid ${gold}`,
            padding: "12px 14px",
            outline: "none",
            background: "rgba(0,0,0,0.25)",
            color: ivory,
            boxShadow:
              "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
          }}
        />
      </div>

      {/* MOBILE-ONLY TOGGLE (videos / social feeds) */}
      <div className="flex justify-center md:hidden" style={{ marginBottom: 24 }}>
        <div
          style={goldOutline({
            display: "inline-flex",
            padding: 4,
            borderRadius: 999,
            background: "rgba(0,0,0,0.35)",
            gap: 8, // space between Videos & Social Feeds buttons
          })}
        >
          <button
            type="button"
            onClick={() => setMobileTab("videos")}
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border:
                mobileTab === "videos"
                  ? "2px solid #FFD700"
                  : "1px solid rgba(255,215,0,0.3)",
              background:
                mobileTab === "videos" ? "#FFD700" : "rgba(0,0,0,0.25)",
              color: mobileTab === "videos" ? "#7B0F24" : "#FFF9F0",
              fontWeight: 800,
              fontSize: 15,
              minWidth: 110,
            }}
          >
            Videos
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("social")}
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border:
                mobileTab === "social"
                  ? "2px solid #FFD700"
                  : "1px solid rgba(255,215,0,0.3)",
              background:
                mobileTab === "social" ? "#FFD700" : "rgba(0,0,0,0.25)",
              color: mobileTab === "social" ? "#7B0F24" : "#FFF9F0",
              fontWeight: 800,
              fontSize: 15,
              minWidth: 130,
            }}
          >
            Social Feeds
          </button>
        </div>
      </div>

      {/* BODY – extra top margin so it's not tight under the toggle */}
      <div
        className="mt-8 md:grid md:gap-6"
        style={{
          gridTemplateColumns: "minmax(0,1fr) 360px",
        }}
      >
        {/* LEFT: video sections */}
        <section className={videoSectionClass}>
          {/* Featured */}
          <div style={goldOutline({ background: "transparent", padding: 14 })}>
            <div style={goldOutline({ background: "transparent", padding: 10 })}>
              <div
                style={{
                  height: 360,
                  borderRadius: 12,
                  background: thumbBg,
                  border: `1px solid ${goldSoft}`,
                }}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700, color: ivory }}>Featured video</div>
              <div style={{ opacity: 0.8, fontSize: 13 }}>
                A curated, high-quality pick.
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button className="gold-button">Play</button>
                <button className="gold-button-outline">Add to queue</button>
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
        </section>

        {/* RIGHT: Social feed */}
        <aside className={socialSectionClass}>
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
        </aside>
      </div>
    </main>
  );
}
