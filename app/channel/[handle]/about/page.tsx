// app/channel/[handle]/about/page.tsx

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

/**
 * Shared channel header with logo + title + Home / Create / Logout buttons
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

export default function ChannelAboutPage({
  params,
  searchParams,
}: PageProps) {
  const { handle } = params;
  const isOwnerView = searchParams?.owner === "1";
  const activeTab = "About";

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

        {/* About content */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                color: GOLD,
              }}
            >
              About this channel
            </h3>
            {isOwnerView && (
              <span
                style={{
                  borderRadius: 999,
                  border: `1px solid ${GOLD}`,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  backgroundColor: "#5b0b1a",
                }}
              >
                Creator editing view
              </span>
            )}
          </div>

          {isOwnerView ? (
            <>
              {/* Creator editable view */}

              {/* Instruction banner */}
              <div
                style={{
                  borderRadius: 14,
                  border: `1px solid ${GOLD}`,
                  padding: 10,
                  marginBottom: 20,
                  backgroundColor: "#5b0b1a",
                  fontSize: 13,
                }}
              >
                <strong style={{ color: GOLD }}>How to edit:</strong>{" "}
                Update the text in the boxes below, then click{" "}
                <strong>Save changes</strong> at the bottom. (In the next step
                we&apos;ll connect this to your backend so it actually saves.)
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.3fr)",
                  gap: 24,
                  marginBottom: 20,
                }}
              >
                {/* Left: public description editor */}
                <div
                  style={{
                    borderRadius: 18,
                    border: `2px solid ${GOLD}`,
                    padding: 16,
                    background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                    boxShadow:
                      "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                  }}
                >
                  <h4
                    style={{
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 16,
                      fontWeight: 800,
                      color: GOLD,
                    }}
                  >
                    Public description
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 8,
                      opacity: 0.9,
                    }}
                  >
                    This text appears on the About page for viewers.
                  </p>
                  <textarea
                    defaultValue="Welcome to my channel on Integrity Streaming! This is where I post videos about..."
                    style={{
                      width: "100%",
                      minHeight: 140,
                      borderRadius: 12,
                      border: `2px solid ${GOLD}`,
                      padding: 10,
                      fontFamily: "inherit",
                      fontSize: 14,
                      resize: "vertical",
                      backgroundColor: "#5b0b1a",
                      color: TEXT,
                    }}
                  />
                </div>

                {/* Right: extra info editor */}
                <div
                  style={{
                    borderRadius: 18,
                    border: `2px solid ${GOLD}`,
                    padding: 16,
                    background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                    boxShadow:
                      "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                  }}
                >
                  <h4
                    style={{
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 16,
                      fontWeight: 800,
                      color: GOLD,
                    }}
                  >
                    Details
                  </h4>

                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    Upload schedule
                  </label>
                  <input
                    defaultValue="New videos every Tuesday & Friday"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: `2px solid ${GOLD}`,
                      padding: "6px 10px",
                      marginBottom: 10,
                      fontFamily: "inherit",
                      fontSize: 13,
                      backgroundColor: "#5b0b1a",
                      color: TEXT,
                    }}
                  />

                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    Contact email (public)
                  </label>
                  <input
                    defaultValue="creator@example.com"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: `2px solid ${GOLD}`,
                      padding: "6px 10px",
                      marginBottom: 10,
                      fontFamily: "inherit",
                      fontSize: 13,
                      backgroundColor: "#5b0b1a",
                      color: TEXT,
                    }}
                  />

                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    Links (website, socials)
                  </label>
                  <textarea
                    defaultValue={
                      "https://example.com\nhttps://instagram.com/example"
                    }
                    style={{
                      width: "100%",
                      minHeight: 80,
                      borderRadius: 10,
                      border: `2px solid ${GOLD}`,
                      padding: 8,
                      fontFamily: "inherit",
                      fontSize: 13,
                      resize: "vertical",
                      backgroundColor: "#5b0b1a",
                      color: TEXT,
                    }}
                  />
                </div>
              </div>

              {/* Save / cancel row (visual for now, backend wiring later) */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  style={{
                    borderRadius: 999,
                    padding: "8px 22px",
                    fontWeight: 700,
                    fontSize: 14,
                    border: `2px solid ${GOLD}`,
                    backgroundColor: GOLD,
                    color: BURGUNDY,
                    cursor: "pointer",
                    boxShadow:
                      "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
                  }}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  style={{
                    borderRadius: 999,
                    padding: "8px 18px",
                    fontWeight: 600,
                    fontSize: 13,
                    border: `2px solid ${GOLD}`,
                    backgroundColor: "transparent",
                    color: TEXT,
                    cursor: "pointer",
                  }}
                >
                  Discard (reset later)
                </button>
              </div>

              <p
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  opacity: 0.7,
                  textAlign: "right",
                }}
              >
                These buttons are visual for now. In the next step, we&apos;ll
                hook them up to save this data to your database.
              </p>
            </>
          ) : (
            <>
              {/* Viewer read-only view */}
              <p
                style={{
                  marginBottom: 16,
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                This is the public About page for this channel.
              </p>

              <div
                style={{
                  borderRadius: 18,
                  border: `2px solid ${GOLD}`,
                  padding: 16,
                  marginBottom: 16,
                  background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                  boxShadow:
                    "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                }}
              >
                <p style={{ margin: 0, fontSize: 14 }}>
                  Welcome to this channel on Integrity Streaming! Here
                  you&apos;ll find videos about [channel topic]. The creator
                  uses this space to introduce themselves, share what the
                  channel is about, and explain what kinds of content you can
                  expect.
                </p>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: `2px solid ${GOLD}`,
                  padding: 16,
                  background: `linear-gradient(180deg, ${BURGUNDY} 0%, #5b0b1a 100%)`,
                  boxShadow:
                    "0 0 0 1px rgba(255,215,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)",
                  fontSize: 13,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Upload schedule
                  </div>
                  <div>New videos every Tuesday &amp; Friday</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Contact
                  </div>
                  <div>creator@example.com</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Links
                  </div>
                  <div>Website &amp; social links go here.</div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
