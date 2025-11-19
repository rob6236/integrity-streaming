// app/creator-studio/billing/_components/BillingOverview.tsx

import type { BillingSummary } from "./billingData";

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

type BillingOverviewProps = {
  summary: BillingSummary;
};

export default function BillingOverview({ summary }: BillingOverviewProps) {
  const { plan } = summary;

  return (
    <section
      style={{
        border: `1px solid ${GOLD}`,
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 24,
        background: `radial-gradient(circle at top left, #8b1230 0%, ${BURGUNDY} 45%, #5c081a 100%)`,
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.45), inset 0 0 18px rgba(255,215,0,0.16)",
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: GOLD,
          marginBottom: 8,
        }}
      >
        Overview
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 12 }}>
        Billing placeholder. We&apos;ll connect Stripe for subscriptions and
        payouts here.
      </p>
      <p style={{ fontSize: 15, opacity: 0.9 }}>
        Current plan:{" "}
        <span style={{ fontWeight: 700 }}>
          {plan.name} — ${plan.pricePerMonth} / mo
        </span>
        . Status: <span style={{ fontWeight: 700 }}>{plan.status}</span>.
      </p>
    </section>
  );
}
