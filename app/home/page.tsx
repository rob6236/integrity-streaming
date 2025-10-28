// app/home/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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
    <button className="gold-button-outline" style={{ borderRadius: 12, padding: "8px 14px" }}>
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
        boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
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
      <div style={{ color: ivory, fontSize: 15, fontWeight: 600 }}>Video title goes here</div>
      <div style={{ opacity: 0.8, fontSize: 13, marginTop: 2 }}>Channel • 12k views • 2 days ago</div>
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
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, marginBottom: 8 }}>
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
                  boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
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
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 md:px-6 pb-16">
      {/* HEADER */}
      <div style={goldOutline({ background: "transparent", padding: 16, marginTop: 16 })}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Logo (left) */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            className="text-center text-[40px] md:text-[44px] leading-none"
            style={{
              color: "#FFD700",
              fontStyle: "italic",
              fontWeight: 800,
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            Integrity <span style={{ fontStyle: "normal" }}>Streaming</span>
          </h1>

          {/* Buttons (right) — all identical styling */}
          <div style={{ display: "flex", gap: 10, justifySelf: "end", alignItems: "center" }}>
            <Link
              href="/home"
              className="px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all"
            >
              Create
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Search (centered under header) */}
        <div style={{ marginTop: 14, display: "grid", placeItems: "center" }}>
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
              boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
            }}
          />
        </div>
      </div>

      {/* TWO-COLUMN BODY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 16,
          marginTop: 20,
        }}
      >
        {/* LEFT: video sections */}
        <section>
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
              <div style={{ opacity: 0.8, fontSize: 13 }}>A curated, high-quality pick.</div>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button className="gold-button">Play</button>
                <button className="gold-button-outline">Add to queue</button>
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
        <aside>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: ivory }}>Social Feeds</h2>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
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
