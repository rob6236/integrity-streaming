// app/creator-studio/billing/_components/InvoicesTable.tsx
import React from "react";
import type { Invoice } from "./billingData";
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
  invoices: Invoice[];
};

export default function InvoicesTable({ invoices }: Props) {
  const hasInvoices = invoices.length > 0;

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
        Invoices
      </h2>

      {!hasInvoices && (
        <p style={{ margin: 0, fontSize: 14 }}>No invoices yet.</p>
      )}

      {hasInvoices && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "4px 0",
                  fontWeight: 700,
                }}
              >
                Date
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "4px 0",
                  fontWeight: 700,
                }}
              >
                Amount
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "4px 0",
                  fontWeight: 700,
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{ padding: "4px 0" }}>{inv.dateLabel}</td>
                <td style={{ padding: "4px 0" }}>{inv.amountLabel}</td>
                <td style={{ padding: "4px 0" }}>{inv.statusLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
