// app/creator-studio/billing/_components/BillingSummaryMini.tsx
import React from "react";
import type { BillingSummary } from "./billingData";
import { GOLD } from "./billingData";

type Props = {
  summary: BillingSummary;
};

export default function BillingSummaryMini({ summary }: Props) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `2px solid ${GOLD}`,
        padding: 12,
        background: "rgba(0,0,0,0.22)",
        fontSize: 14,
      }}
    >
      <div>
        <strong>Plan:</strong> {summary.plan.name} ({summary.plan.priceLabel})
      </div>
      <div>
        <strong>Status:</strong> {summary.plan.statusLabel}
      </div>
      <div>
        <strong>Card:</strong> {summary.paymentMethod.brand} ••••{" "}
        {summary.paymentMethod.last4}
      </div>
    </div>
  );
}
