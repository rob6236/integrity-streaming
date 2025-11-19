// app/creator-studio/billing/_components/PaymentMethodsTable.tsx

import type { PaymentMethod } from "./billingData";

const GOLD = "#FFD700";

type PaymentMethodsTableProps = {
  paymentMethod?: PaymentMethod;
};

export default function PaymentMethodsTable({
  paymentMethod,
}: PaymentMethodsTableProps) {
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
        Payment Method
      </h3>

      {paymentMethod ? (
        <>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {paymentMethod.brand} •••• •••• •••• {paymentMethod.last4}
          </p>
          <p style={{ fontSize: 13, opacity: 0.95, marginBottom: 16 }}>
            Expires {paymentMethod.expMonth.toString().padStart(2, "0")}/
            {paymentMethod.expYear}
          </p>
        </>
      ) : (
        <p style={{ fontSize: 14, marginBottom: 16 }}>
          No payment method on file yet.
        </p>
      )}

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
        Update card
      </button>
    </div>
  );
}
