// app/creator-studio/monetization/page.tsx
"use client";

import Link from "next/link";

export default function MonetizationPage() {
  const burgundy = "#7B0F24";
  const gold = "#FFD700";
  const ivory = "#FFF9F0";

  return (
    <>
      {/* Layout rules (only affect behavior, not look on desktop/tablet) */}
      <style jsx>{`
        /* Default: 3 columns (desktop & tablet) */
        .monetization-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 767px) {
          /* stack header buttons under title */
          .monetization-header-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .monetization-main {
            max-width: 100%;
            padding: 12px 10px 32px;
            overflow-x: hidden;
          }

          /* ⬇️ MOBILE: stack the 3 metric boxes in 1 column */
          .monetization-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .monetization-card {
            padding: 12px;
          }

          .monetization-amount {
            font-size: 22px !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: burgundy, color: ivory }}>
        {/* HEADER (unchanged visually) */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: burgundy,
            borderBottom: `1px solid ${gold}66`,
          }}
        >
          <div
            className="monetization-header-inner"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                color: gold,
                letterSpacing: 0.4,
                textShadow: "0 2px 0 #5c0616, 0 3px 6px rgba(0,0,0,0.35)",
              }}
            >
              Monetization
            </h1>

            <nav style={{ display: "flex", gap: 12 }}>
              <Link
                href="/creator-studio/dashboard"
                style={{
                  padding: "8px 14px",
                  borderRadius: 18,
                  border: `1px solid ${gold}99`,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
              <Link
                href="/creator-studio/library"
                style={{
                  padding: "8px 14px",
                  borderRadius: 18,
                  border: `1px solid ${gold}99`,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Content Library
              </Link>
            </nav>
          </div>
        </header>

        {/* BODY */}
        <main
          className="monetization-main"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 20px 56px",
          }}
        >
          <section
            style={{
              border: `1px solid ${gold}66`,
              borderRadius: 14,
              padding: 20,
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <h2 style={{ marginTop: 0, color: gold, fontWeight: 800 }}>
              Overview
            </h2>
            <p style={{ opacity: 0.95 }}>
              This is a placeholder page for Monetization. We’ll wire up your
              revenue analytics, eligibility, payout settings, and ad controls
              here.
            </p>
          </section>

          <section
            className="monetization-grid"
            style={{
              marginTop: 20,
              display: "grid",
              gap: 16,
              // gridTemplateColumns moved to CSS so mobile can override
            }}
          >
            {["Estimated Revenue", "RPM / CPM", "Watch Time Monetized"].map(
              (title) => (
                <div
                  key={title}
                  className="monetization-card"
                  style={{
                    border: `1px solid ${gold}66`,
                    borderRadius: 14,
                    padding: 16,
                    background: "rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    style={{
                      color: gold,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    className="monetization-amount"
                    style={{ fontSize: 28, fontWeight: 800 }}
                  >
                    $0.00
                  </div>
                  <div
                    style={{
                      opacity: 0.85,
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    (Sample data — will connect to Firestore/BigQuery later.)
                  </div>
                </div>
              )
            )}
          </section>
        </main>
      </div>
    </>
  );
}
