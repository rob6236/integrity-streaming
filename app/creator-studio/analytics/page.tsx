// app/creator-studio/analytics/page.tsx

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const TEXT = "#FFF9F0";

/**
 * Shared big header with logo + "Integrity Streaming" + Home / Create / Logout
 * This matches the look of your channel Analytics header.
 */
function StudioHeader() {
  const pillBase: React.CSSProperties = {
    borderRadius: 999,
    padding: "8px 20px",
    fontWeight: 700,
    fontSize: 14,
    border: `2px solid ${GOLD}`,
    background: "transparent",
    color: TEXT,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.35)",
    whiteSpace: "nowrap",
  };

  const homeActive: React.CSSProperties = {
    ...pillBase,
    backgroundColor: GOLD,
    color: BURGUNDY,
  };

  return (
    <header style={{ padding: "16px 16px 24px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          border: `3px solid ${GOLD}`,
          borderRadius: 24,
          padding: "16px 24px 20px",
          backgroundColor: BURGUNDY,
        }}
      >
        <div
          className="channel-header-flex"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Logo */}
          <div
            className="channel-header-logo-wrapper"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 80,
              height: 80,
              borderRadius: 16,
              backgroundColor: "#fff",
              overflow: "hidden",
              flexShrink: 0,
              fontSize: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Integrity Streaming logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Title + buttons */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 40,
                fontWeight: 800,
                color: GOLD,
                textShadow:
                  "0 3px 0 rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              Integrity Streaming
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
              }}
            >
              <a href="/home" style={homeActive}>
                Home
              </a>
              <a href="/creator-studio" style={pillBase}>
                Create
              </a>
              <a href="#logout" style={pillBase}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Creator Studio – full Analytics dashboard
 */
export default function CreatorStudioAnalyticsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: BURGUNDY,
        color: TEXT,
        boxSizing: "border-box",
      }}
    >
      <StudioHeader />

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px 40px",
        }}
      >
        <section
          style={{
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: GOLD,
              margin: "0 0 8px",
            }}
          >
            Creator Studio · Analytics dashboard
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              opacity: 0.9,
            }}
          >
            This is your full analytics view for the entire channel on Integrity
            Streaming. Channel pages can link here from their{" "}
            <strong>Open full Analytics dashboard</strong> button.
          </p>
        </section>

        {/* Top KPI cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginBottom: 24,
          }}
        >
          {[
            { label: "Views (last 28 days)", value: "42.3K" },
            { label: "Watch time (hours)", value: "1.2K" },
            { label: "New subscribers", value: "+380" },
            { label: "Estimated revenue", value: "$320.45" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                borderRadius: 18,
                border: `2px solid ${GOLD}`,
                padding: 16,
                background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                boxShadow:
                  "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.9,
                  marginBottom: 6,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: GOLD,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        {/* Performance + audience layout */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {/* Performance over time */}
          <div
            style={{
              borderRadius: 18,
              border: `2px solid ${GOLD}`,
              padding: 16,
              background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
              minHeight: 220,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 8,
                color: GOLD,
              }}
            >
              Performance over time
            </div>
            <p
              style={{
                fontSize: 13,
                opacity: 0.9,
                marginBottom: 12,
              }}
            >
              This area will show graphs for views, watch time, and revenue by
              day once we connect it to your real analytics data (e.g. a line
              chart component).
            </p>
            <div
              style={{
                borderRadius: 12,
                border: "1px dashed rgba(255,215,0,0.4)",
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Graph placeholder
            </div>
          </div>

          {/* Audience snapshot */}
          <div
            style={{
              borderRadius: 18,
              border: `2px solid ${GOLD}`,
              padding: 16,
              background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
              minHeight: 220,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 8,
                color: GOLD,
              }}
            >
              Audience snapshot
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 13,
              }}
            >
              <li style={{ marginBottom: 4 }}>
                • Returning viewers: <strong>3.8K</strong>
              </li>
              <li style={{ marginBottom: 4 }}>
                • New viewers: <strong>9.2K</strong>
              </li>
              <li style={{ marginBottom: 4 }}>
                • Avg. view duration: <strong>4:12</strong>
              </li>
              <li style={{ marginBottom: 4 }}>
                • Top country: <strong>United States</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* Top videos table placeholder */}
        <section
          style={{
            borderRadius: 18,
            border: `2px solid ${GOLD}`,
            padding: 16,
            background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
            boxShadow:
              "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
            fontSize: 13,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 8,
              color: GOLD,
            }}
          >
            Top videos (last 28 days)
          </div>
          <p
            style={{
              opacity: 0.9,
              marginBottom: 8,
            }}
          >
            When wired up, this table will show your best-performing videos by
            views, watch time, and revenue.
          </p>

          <div
            style={{
              borderRadius: 12,
              border: "1px dashed rgba(255,215,0,0.4)",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              <span>Video title</span>
              <span>Views</span>
              <span>Watch time</span>
              <span>Revenue</span>
            </div>

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  padding: "4px 0",
                  borderTop:
                    i === 1 ? "none" : "1px solid rgba(255,215,0,0.25)",
                }}
              >
                <span>Sample video #{i}</span>
                <span>5.{i}K</span>
                <span>{120 + i * 10} hrs</span>
                <span>${(40 + i * 5).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
