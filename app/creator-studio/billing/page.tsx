"use client";

import Link from "next/link";

export default function BillingPage() {
  const burgundy = "#7B0F24";
  const gold = "#FFD700";
  const ivory = "#FFF9F0";

  return (
    <div style={{ minHeight: "100vh", background: burgundy, color: ivory, padding: "24px 20px" }}>
      <header style={{ maxWidth: 1200, margin: "0 auto 16px" }}>
        <h1
          style={{
            margin: 0,
            color: gold,
            fontWeight: 800,
            letterSpacing: 0.4,
            textShadow: "0 2px 0 #5c0616, 0 3px 6px rgba(0,0,0,0.35)",
          }}
        >
          Billing
        </h1>
        <nav style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <Link href="/creator-studio" style={{ color: gold, textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link href="/creator-studio/settings" style={{ color: gold, textDecoration: "none" }}>
            Settings
          </Link>
        </nav>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Overview */}
        <section
          style={{
            border: `1px solid ${gold}66`,
            borderRadius: 14,
            padding: 20,
            background: "rgba(0,0,0,0.18)",
          }}
        >
          <h2 style={{ marginTop: 0, color: gold, fontWeight: 800 }}>Overview</h2>
          <p style={{ opacity: 0.95 }}>
            Billing placeholder. We’ll connect Stripe for subscriptions and payouts here.
          </p>
        </section>

        {/* Cards */}
        <section
          style={{
            marginTop: 20,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          <div
            style={{
              border: `1px solid ${gold}66`,
              borderRadius: 14,
              padding: 16,
              background: "rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ color: gold, fontWeight: 700, marginBottom: 6 }}>Current Plan</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Creator — $0 / mo</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
              Change/upgrade will go here.
            </div>
          </div>

          <div
            style={{
              border: `1px solid ${gold}66`,
              borderRadius: 14,
              padding: 16,
              background: "rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ color: gold, fontWeight: 700, marginBottom: 6 }}>Payment Method</div>
            <div style={{ fontSize: 14, opacity: 0.95 }}>•••• •••• •••• 4242</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
              Update card modal later.
            </div>
          </div>

          <div
            style={{
              border: `1px solid ${gold}66`,
              borderRadius: 14,
              padding: 16,
              background: "rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ color: gold, fontWeight: 700, marginBottom: 6 }}>Invoices</div>
            <div style={{ fontSize: 14, opacity: 0.95 }}>No invoices yet.</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
              We’ll show downloadable PDFs here.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
