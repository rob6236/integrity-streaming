// app/creator-studio/billing/_components/UpgradePlanCard.tsx
import React from "react";
import type { BillingPlan } from "./billingData";
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
  plan: BillingPlan;
};

export default function UpgradePlanCard({ plan }: Props) {
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
        Current Plan
      </h2>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        {plan.name} — {plan.priceLabel}
      </p>

      <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.4 }}>
        Change/upgrade will go here when Stripe is connected.
      </p>

      <button
        type="button"
        style={{
          borderRadius: 999,
          padding: "10px 26px",
          border: `3px solid ${GOLD}`,
          background: "transparent",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        Manage plan
      </button>
    </section>
  );
}
