// app/channel/[handle]/shorts/page.tsx

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

export default function ChannelShortsPage({ params, searchParams }: PageProps) {
  const { handle } = params;
  const isOwnerView = searchParams?.owner === "1";
  const activeTab = "Shorts";

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
            Shorts
          </h3>

          {/* 9:16 PLACEHOLDERS, GRID WITH SEVERAL PER ROW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 24,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <article
                key={i}
                style={{
                  borderRadius: 18,
                  border: `2px solid ${GOLD}`,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                  boxShadow:
                    "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${GOLD}`,
                    padding: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    aspectRatio: "9 / 16",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: `3px solid ${GOLD}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: 2,
                        width: 0,
                        height: 0,
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: `10px solid ${GOLD}`,
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      marginBottom: 2,
                    }}
                  >
                    Short Title
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.85,
                    }}
                  >
                    3.4K views · 2 days ago
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
