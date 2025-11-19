// app/creator-studio/settings/_components/BillingSummaryMini.tsx

import { mockBillingSummary } from "../billing/_components/billingData";

const GOLD = "#FFD700";

export default function BillingSummaryMini() {
  const { plan, paymentMethod } = mockBillingSummary;

  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontSize: 15, marginBottom: 6 }}>
        Current plan:{" "}
        <span style={{ fontWeight: 800 }}>
          {plan.name} — ${plan.pricePerMonth} / mo
        </span>
        . Status: <span style={{ fontWeight: 700 }}>{plan.status}</span>.
      </p>

      {paymentMethod ? (
        <p style={{ fontSize: 14, opacity: 0.95 }}>
          Default payment method:{" "}
          <span style={{ fontWeight: 700 }}>
            {paymentMethod.brand} •••• {paymentMethod.last4}
          </span>
          .
        </p>
      ) : (
        <p style={{ fontSize: 14, opacity: 0.95 }}>
          No payment method on file yet.
        </p>
      )}

      <p style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>
        Full billing details, invoices, and payment methods are managed on the{" "}
        <span style={{ color: GOLD, fontWeight: 700 }}>Billing</span> page.
      </p>
    </div>
  );
}
