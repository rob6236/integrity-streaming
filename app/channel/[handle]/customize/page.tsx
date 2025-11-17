// app/channel/[handle]/customize/page.tsx

import Link from "next/link";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type PageProps = {
  params: { handle: string };
};

export default function CustomizeChannelPage({ params }: PageProps) {
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
      {/* ==================== HEADER ==================== */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 80px",
          borderBottom: `1px solid ${GOLD}`,
        }}
      >
        {/* Logo + title */}
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

        {/* Top-right nav: Home / My Channel / Creator Studio */}
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

          {/* Back to this channel */}
          <Link
            href={`/channel/${handle}`}
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
            My Channel
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

      {/* ==================== MAIN CONTENT ==================== */}
      <main style={{ padding: "32px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: GOLD,
            marginBottom: 8,
          }}
        >
          Customize Channel
        </h2>

        <p style={{ marginBottom: 24, maxWidth: 800, lineHeight: 1.6 }}>
          This is where you control your channel’s <b>branding and appearance</b>.
          Later we’ll hook these controls up to your real data, but for now this
          page shows the sections and layout you’ll use.
        </p>

        {/* ===== Branding section ===== */}
        <section
          style={{
            borderRadius: 16,
            border: `1px solid ${GOLD}`,
            padding: 24,
            marginBottom: 24,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.28))",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 12,
            }}
          >
            Channel Branding
          </h3>
          <p style={{ marginBottom: 16, opacity: 0.9 }}>
            Update the visual identity of your channel so viewers instantly
            recognize you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {/* Profile image card */}
            <div
              style={{
                borderRadius: 14,
                border: `1px dashed ${GOLD}`,
                padding: 16,
              }}
            >
              <strong>Profile Image</strong>
              <p style={{ fontSize: 13, opacity: 0.9, marginTop: 6 }}>
                Upload the main image shown on your channel and next to your
                videos.
              </p>
              <button
                type="button"
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${GOLD}`,
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Upload Image
              </button>
            </div>

            {/* Banner card */}
            <div
              style={{
                borderRadius: 14,
                border: `1px dashed ${GOLD}`,
                padding: 16,
              }}
            >
              <strong>Channel Banner</strong>
              <p style={{ fontSize: 13, opacity: 0.9, marginTop: 6 }}>
                Set the large banner that appears across the top of your
                channel page.
              </p>
              <button
                type="button"
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${GOLD}`,
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Upload Banner
              </button>
            </div>

            {/* Watermark card */}
            <div
              style={{
                borderRadius: 14,
                border: `1px dashed ${GOLD}`,
                padding: 16,
              }}
            >
              <strong>Video Watermark</strong>
              <p style={{ fontSize: 13, opacity: 0.9, marginTop: 6 }}>
                Add a small logo that appears in the corner of your videos.
              </p>
              <button
                type="button"
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${GOLD}`,
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Upload Watermark
              </button>
            </div>
          </div>
        </section>

        {/* ===== Channel details ===== */}
        <section
          style={{
            borderRadius: 16,
            border: `1px solid ${GOLD}`,
            padding: 24,
            marginBottom: 24,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.28))",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 12,
            }}
          >
            Channel Details
          </h3>

          <div style={{ display: "grid", gap: 16 }}>
            {/* Channel name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontSize: 14,
                }}
              >
                Channel Name
              </label>
              <input
                type="text"
                placeholder="Channel Name"
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontSize: 14,
                }}
              >
                Channel Description
              </label>
              <textarea
                rows={4}
                placeholder="Tell viewers what your channel is about..."
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  color: "white",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Links */}
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontSize: 14,
                }}
              >
                Links (website, socials, etc.)
              </label>
              <input
                type="text"
                placeholder="https://yourwebsite.com"
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </section>

        {/* ===== Theme & colors ===== */}
        <section
          style={{
            borderRadius: 16,
            border: `1px solid ${GOLD}`,
            padding: 24,
            marginBottom: 32,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.28))",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 12,
            }}
          >
            Theme & Colors
          </h3>

          <p style={{ marginBottom: 16, opacity: 0.9 }}>
            Later, this section will let you switch between light/dark modes and
            fine-tune accent colors (while still staying within Integrity
            Streaming’s brand guidelines).
          </p>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {/* Theme selector */}
            <div>
              <strong>Theme</strong>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button
                  type="button"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${GOLD}`,
                    backgroundColor: BURGUNDY,
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Dark
                </button>
                <button
                  type="button"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${GOLD}`,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Light
                </button>
              </div>
            </div>

            {/* Accent colors */}
            <div>
              <strong>Accent Color</strong>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: GOLD,
                    border: "2px solid white",
                  }}
                />
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "#FF6B00",
                    border: "2px solid transparent",
                  }}
                />
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "#00C6FF",
                    border: "2px solid transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Save / Cancel buttons ===== */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            type="button"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: GOLD,
              color: BURGUNDY,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
