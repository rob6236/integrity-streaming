// app/channel/[handle]/analytics/page.tsx

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const TEXT = "#FFF9F0";

type PageProps = {
  params: { handle: string };
  searchParams?: { owner?: string };
};

function makeTabHref(
  handle: string,
  tab: string,
  isOwnerView: boolean
): string {
  const base = `/channel/${handle}`;
  let suffix = "";

  switch (tab) {
    case "Home":
      suffix = "";
      break;
    case "Videos":
      suffix = "/videos";
      break;
    case "Shorts":
      suffix = "/shorts";
      break;
    case "Playlists":
      suffix = "/playlists";
      break;
    case "About":
      suffix = "/about";
      break;
    case "Analytics":
      suffix = "/analytics";
      break;
  }

  const path = base + suffix;
  return isOwnerView ? `${path}?owner=1` : path;
}

function MainHeader({
  handle,
  isOwnerView,
}: {
  handle: string;
  isOwnerView: boolean;
}) {
  const baseButton = {
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
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.35)",
    whiteSpace: "nowrap",
  } as const;

  const homeActive = {
    ...baseButton,
    backgroundColor: GOLD,
    color: BURGUNDY,
  } as const;

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
              <a href="/creator-studio" style={baseButton}>
                Create
              </a>
              <a href="#logout" style={baseButton}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ChannelAnalyticsPage({
  params,
  searchParams,
}: PageProps) {
  const { handle } = params;
  const isOwnerView = searchParams?.owner === "1";
  const activeTab = "Analytics";

  // IMPORTANT: Analytics tab only appears in nav for creator view
  const navTabs = isOwnerView
    ? ["Home", "Videos", "Shorts", "Playlists", "About", "Analytics"]
    : ["Home", "Videos", "Shorts", "Playlists", "About"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: BURGUNDY,
        color: TEXT,
        boxSizing: "border-box",
      }}
    >
      <MainHeader handle={handle} isOwnerView={isOwnerView} />

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px 40px",
        }}
      >
        {/* Channel nav */}
        <nav
          style={{
            borderBottom: `2px solid ${GOLD}`,
            padding: "12px 0",
            marginBottom: 24,
            display: "flex",
            gap: 32,
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {navTabs.map((tab) => (
            <a
              key={tab}
              href={makeTabHref(handle, tab, isOwnerView)}
              style={{
                border: "none",
                background: "transparent",
                color: tab === activeTab ? GOLD : TEXT,
                fontWeight: tab === activeTab ? 700 : 500,
                fontSize: 16,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {tab}
            </a>
          ))}
        </nav>

        <section>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 16,
              color: GOLD,
            }}
          >
            Channel analytics
          </h3>

          {!isOwnerView ? (
            <div
              style={{
                borderRadius: 18,
                border: `2px solid ${GOLD}`,
                padding: 16,
                background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                boxShadow:
                  "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                fontSize: 14,
              }}
            >
              Analytics for this channel are only visible to the channel owner.
              <br />
              <br />
              <a
                href={`/channel/${handle}`}
                style={{
                  color: GOLD,
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Go back to the channel home
              </a>
            </div>
          ) : (
            <>
              <p
                style={{
                  marginBottom: 16,
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                This is a channel-level snapshot. For the full analytics suite,
                use the Creator Studio analytics dashboard.
              </p>

              {/* Link to your existing analytics area */}
              <a
                href="/creator-studio/analytics"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `2px solid ${GOLD}`,
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  marginBottom: 20,
                }}
              >
                Open full Analytics dashboard
              </a>

              {/* Simple stat cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 18,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    label: "Views (last 28 days)",
                    value: "42.3K",
                  },
                  {
                    label: "Watch time (hours)",
                    value: "1.2K",
                  },
                  {
                    label: "New subscribers",
                    value: "+380",
                  },
                  {
                    label: "Estimated revenue",
                    value: "$320.45",
                  },
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
              </div>

              {/* Placeholder for graphs / deeper analytics */}
              <div
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
                  Performance over time
                </div>
                <p style={{ margin: 0 }}>
                  This area will show graphs for views, watch time, revenue,
                  and audience when we connect it to your real analytics data.
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
