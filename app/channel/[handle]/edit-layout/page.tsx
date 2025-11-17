// app/channel/[handle]/edit-layout/page.tsx

import Link from "next/link";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type PageProps = {
  params: { handle: string };
};

export default function EditLayoutPage({ params }: PageProps) {
  const { handle } = params;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: BURGUNDY,
        color: "white",
        border: `3px solid ${GOLD}`,
        boxSizing: "border-box",
      }}
    >
      {/* Top header bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 80px",
          borderBottom: `1px solid ${GOLD}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src="/logo.png"
            alt="Integrity Streaming Logo"
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              objectFit: "cover",
              backgroundColor: "white",
            }}
          />
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: GOLD,
              margin: 0,
              letterSpacing: 1,
              fontStyle: "italic",
            }}
          >
            Integrity Streaming
          </h1>
        </div>

        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Home – main homepage */}
          <Link
            href="/home"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              fontWeight: 700,
              textDecoration: "none",
              color: "white",
              fontSize: 15,
            }}
          >
            Home
          </Link>

          {/* Creator Studio */}
          <Link
            href="/creator-studio"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: GOLD,
              color: BURGUNDY,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Creator Studio
          </Link>
        </nav>
      </header>

      {/* Page content */}
      <main style={{ padding: "32px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: GOLD,
            marginBottom: 8,
          }}
        >
          Edit Channel Layout
        </h2>
        <p style={{ marginBottom: 24, maxWidth: 800, lineHeight: 1.6 }}>
          Here you’ll control how your <b>channel page</b> is arranged. You’ll
          be able to:
        </p>

        <ul style={{ marginBottom: 32, lineHeight: 1.7 }}>
          <li>
            Choose which rows to show (Videos, Shorts, Playlists, Live, etc.).
          </li>
          <li>Drag rows up or down to change the order.</li>
          <li>Pick a featured video or Shorts row to show first.</li>
          <li>Save your layout so viewers see the new version instantly.</li>
        </ul>

        {/* Placeholder layout builder area */}
        <section
          style={{
            borderRadius: 16,
            border: `1px dashed ${GOLD}`,
            padding: 24,
            marginBottom: 32,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25))",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Layout Builder (placeholder)
          </p>
          <p style={{ opacity: 0.9 }}>
            This is where we’ll later add drag-and-drop blocks for each section
            of your channel (Videos row, Shorts row, Playlists row, etc.).
          </p>
        </section>

        {/* Back buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href={`/channel/${handle}`}
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              color: "white",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ⬅ Back to Channel
          </Link>

          <Link
            href="/home"
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: GOLD,
              color: BURGUNDY,
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            ⬅ Back to Main Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
