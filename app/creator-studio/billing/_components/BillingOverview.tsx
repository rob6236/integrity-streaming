// app/creator-studio/billing/_components/BillingOverview.tsx
import React from "react";
import type { BillingSummary } from "./billingData";
import { GOLD } from "./billingData";

const cardStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  borderRadius: 24,
  border: `3px solid ${GOLD}`,
  padding: 24,
  background: "rgba(0,0,0,0.22)",
};

type Props = {
  summary: BillingSummary;
};

export default function BillingOverview({ summary }: Props) {
  return (
    <section style={cardStyle}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: GOLD,
          margin: "0 0 16px",
        }}
      >
        Overview
      </h2>

      <p style={{ margin: "0 0 12px", fontSize: 16, lineHeight: 1.4 }}>
        Billing placeholder. We&apos;ll connect Stripe for subscriptions and
        payouts here.
      </p>

      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>
        <span style={{ fontWeight: 700 }}>Current plan:</span>{" "}
        <span style={{ fontWeight: 900 }}>{summary.plan.name} — {summary.plan.priceLabel}</span>.{" "}
        <span>
          Status: <strong>{summary.plan.statusLabel}</strong>.
        </span>
      </p>
    </section>
  );
}
