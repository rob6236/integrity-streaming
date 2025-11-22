// app/channel/[handle]/page.tsx

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const TEXT = "#FFF9F0";

type PageProps = {
  params: { handle: string };
  searchParams?: { owner?: string };
};

/**
 * Main Integrity Streaming header
 * (desktop/tablet: logo left, title & buttons centered
 *  mobile: stacked via CSS using .channel-header-flex)
 */
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
        {/* FLEX WRAPPER:
            - desktop/tablet: logo left, title/buttons centered
            - mobile: overridden in CSS to stack vertically */}
        <div
          className="channel-header-flex"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* LOGO – absolutely positioned on larger screens; normal block on mobile via CSS */}
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

          {/* CENTER COLUMN – title + buttons */}
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
              {/* Home button – goes to /home */}
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

export default function ChannelPage({ params, searchParams }: PageProps) {
  const { handle } = params;
  const isOwnerView = searchParams?.owner === "1";

  // Only show "Analytics" for the creator/owner view
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
      {/* Global header at the very top */}
      <MainHeader handle={handle} isOwnerView={isOwnerView} />

      {/* Everything below is the channel page body, locked inside the page width */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px 40px",
        }}
      >
        {/* Channel nav (Home / Videos / Shorts / etc.) */}
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
            <button
              key={tab}
              type="button"
              style={{
                border: "none",
                background: "transparent",
                color: tab === "Home" ? GOLD : TEXT,
                fontWeight: tab === "Home" ? 700 : 500,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Channel header area (image + name + actions) */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          {/* Channel image circle */}
          <div
            style={{
              width: 210,
              height: 210,
              borderRadius: "50%",
              border: `4px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.3,
              }}
            >
              CHANNEL
              <br />
              IMAGE
            </span>

            {isOwnerView && (
              <button
                type="button"
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 18px",
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  borderRadius: 999,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3)",
                }}
              >
                Edit
              </button>
            )}
          </div>

          {/* Channel text + actions */}
          <div
            style={{
              flex: "1 1 260px",
              minWidth: 260,
            }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: 0,
                marginBottom: 8,
                color: GOLD,
              }}
            >
              Channel Name
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                opacity: 0.9,
              }}
            >
              120 K subscribers
            </p>

            {/* Owner vs viewer actions */}
            {isOwnerView ? (
              <>
                {/* Creator view pill */}
                <div
                  style={{
                    marginTop: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${GOLD}`,
                    background:
                      "linear-gradient(90deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Creator view · @{handle}
                </div>

                {/* Simple creator dashboard strip */}
                <div
                  style={{
                    marginTop: 18,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${GOLD}`,
                      padding: "10px 12px",
                      fontSize: 12,
                    }}
                  >
                    <div style={{ opacity: 0.8 }}>Videos</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>128</div>
                  </div>
                  <div
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${GOLD}`,
                      padding: "10px 12px",
                      fontSize: 12,
                    }}
                  >
                    <div style={{ opacity: 0.8 }}>Watch time (hrs)</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>4.2K</div>
                  </div>
                  <div
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${GOLD}`,
                      padding: "10px 12px",
                      fontSize: 12,
                    }}
                  >
                    <div style={{ opacity: 0.8 }}>Revenue (month)</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>$2,340</div>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "8px 22px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: GOLD,
                    color: BURGUNDY,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: `1px solid ${GOLD}`,
                    background: "transparent",
                    color: TEXT,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Share
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Videos section */}
        <section>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 16,
              color: GOLD,
            }}
          >
            Videos
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <article
                key={i}
                style={{
                  borderRadius: 18,
                  border: `2px solid ${GOLD}`,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                  boxShadow:
                    "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                }}
              >
                {/* Video thumbnail with 16:9 aspect ratio */}
                <div
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${GOLD}`,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                  }}
                >
                  {/* Play icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
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
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: `14px solid ${GOLD}`,
                      }}
                    />
                  </div>
                </div>

                {/* Video meta */}
                <div style={{ marginTop: 12 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    Video Title
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.85,
                    }}
                  >
                    1.2K views · 6 days ago
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
