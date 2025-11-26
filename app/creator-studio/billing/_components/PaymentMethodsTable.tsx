// app/creator-studio/billing/_components/PaymentMethodsTable.tsx
import React from "react";
import type { PaymentMethod } from "./billingData";
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
  paymentMethod: PaymentMethod;
};

export default function PaymentMethodsTable({ paymentMethod }: Props) {
  const { brand, last4, expMonth, expYear } = paymentMethod;

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
        Payment Method
      </h2>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        {brand} •••• •••• •••• {last4}
      </p>

      <p style={{ margin: "0 0 16px", fontSize: 14 }}>
        Expires {expMonth.toString().padStart(2, "0")}/{expYear}
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
        Update card
      </button>
    </section>
  );
}
