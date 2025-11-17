// app/channel/[handle]/page.tsx

import Link from "next/link";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type ChannelPageProps = {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ChannelPage({ params }: ChannelPageProps) {
  const { handle } = params;

  const channelName = "Channel Name";
  const subscribersLabel = "120 K subscribers";

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
      {/* ==================== TOP HEADER ==================== */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 80px",
          borderBottom: `1px solid ${GOLD}`,
        }}
      >
        {/* Logo + text */}
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

        {/* RIGHT BUTTONS: Home / Edit Layout / Creator Studio / Customize */}
        <nav style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Home – main homepage */}
          <Link
            href="/home"
            style={{
              padding: "10px 26px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              color: "white",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Home
          </Link>

          {/* Edit Layout – goes to edit-layout page */}
          <Link
            href={`/channel/${handle}/edit-layout`}
            style={{
              padding: "10px 26px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              color: "white",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Edit Layout
          </Link>

          {/* Creator Studio */}
          <Link
            href="/creator-studio"
            style={{
              padding: "10px 26px",
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

          {/* Customize */}
          <Link
            href={`/channel/${handle}/customize`}
            style={{
              padding: "10px 26px",
              borderRadius: 999,
              border: `1px solid ${GOLD}`,
              backgroundColor: BURGUNDY,
              color: "white",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Customize
          </Link>
        </nav>
      </header>

      {/* ==================== CHANNEL TABS ROW ==================== */}
      <div
        style={{
          padding: "0 40px",
          borderBottom: `1px solid ${GOLD}`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 32,
            padding: "18px 0",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          <span style={{ color: GOLD }}>Home</span>
          <span>Videos</span>
          <span>Shorts</span>
          <span>Playlists</span>
          <span>About</span>
          <span>Analytics</span>
        </div>
      </div>

      {/* ==================== MAIN CHANNEL CONTENT ==================== */}
      <main
        style={{
          padding: "32px 40px 60px 40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Channel header section */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Channel image circle */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: `3px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                textAlign: "center",
                fontSize: 16,
                lineHeight: 1.4,
              }}
            >
              CHANNEL
              <br />
              IMAGE
            </span>

            <button
              type="button"
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "6px 18px",
                borderRadius: 999,
                border: "none",
                backgroundColor: GOLD,
                color: BURGUNDY,
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Edit
            </button>
          </div>

          {/* Channel text info */}
          <div>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: GOLD,
                marginBottom: 8,
              }}
            >
              {channelName}
            </h2>
            <p
              style={{
                fontSize: 16,
                opacity: 0.95,
                marginBottom: 8,
              }}
            >
              {subscribersLabel}
            </p>
          </div>
        </section>

        {/* VIDEOS ROW */}
        <section style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 18,
            }}
          >
            Videos
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 20,
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <VideoCard key={`video-${index}`} />
            ))}
          </div>
        </section>

        {/* SHORTS ROW */}
        <section>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 18,
            }}
          >
            Shorts
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: 20,
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <ShortCard key={`short-${index}`} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ==================== CARD COMPONENTS ==================== */

function VideoCard() {
  const GOLD = "#FFD700";

  return (
    <div
      style={{
        borderRadius: 18,
        border: `1px solid rgba(255,215,0,0.7)`,
        padding: 14,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          borderRadius: 14,
          border: `1px solid rgba(255,215,0,0.9)`,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `3px solid ${GOLD}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          ▶
        </div>
      </div>

      <div>
        <div
          style={{
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Video Title
        </div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>
          1.2K views · 6 days ago
        </div>
      </div>
    </div>
  );
}

function ShortCard() {
  const GOLD = "#FFD700";

  return (
    <div
      style={{
        borderRadius: 18,
        border: `1px solid rgba(255,215,0,0.7)`,
        padding: 10,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          borderRadius: 14,
          border: `1px solid rgba(255,215,0,0.9)`,
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: `3px solid ${GOLD}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          ▶
        </div>
      </div>

      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 2,
          }}
        >
          Short Title
        </div>
        <div style={{ fontSize: 11, opacity: 0.9 }}>
          2.3K views · 3 days ago
        </div>
      </div>
    </div>
  );
}
