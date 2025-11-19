// app/creator-studio/billing/_components/UpgradePlanCard.tsx

import type { BillingPlan } from "./billingData";

const GOLD = "#FFD700";

type UpgradePlanCardProps = {
  plan: BillingPlan;
};

export default function UpgradePlanCard({ plan }: UpgradePlanCardProps) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        border: `1px solid ${GOLD}`,
        borderRadius: 16,
        padding: "20px 22px",
        marginRight: 16,
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.4), inset 0 0 18px rgba(255,215,0,0.14)",
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: GOLD,
          marginBottom: 6,
        }}
      >
        Current Plan
      </h3>
      <p
        style={{
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        {plan.name} — ${plan.pricePerMonth} / mo
      </p>
      <p style={{ fontSize: 13, opacity: 0.95, marginBottom: 16 }}>
        Change/upgrade will go here when Stripe is connected.
      </p>
      <button
        type="button"
        style={{
          padding: "10px 18px",
          borderRadius: 999,
          border: `2px solid ${GOLD}`,
          backgroundColor: "transparent",
          color: "white",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Manage plan
      </button>
    </div>
  );
}
