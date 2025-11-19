// app/creator-studio/billing/_components/InvoicesTable.tsx

import type { Invoice } from "./billingData";

const GOLD = "#FFD700";

type InvoicesTableProps = {
  invoices: Invoice[];
};

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  const hasInvoices = invoices.length > 0;

  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        border: `1px solid ${GOLD}`,
        borderRadius: 16,
        padding: "20px 22px",
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
        Invoices
      </h3>

      {!hasInvoices && (
        <>
          <p
            style={{
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            No invoices yet.
          </p>
          <p style={{ fontSize: 13, opacity: 0.95 }}>
            We&apos;ll show downloadable PDFs here once you begin billing.
          </p>
        </>
      )}

      {hasInvoices && (
        <div
          style={{
            marginTop: 10,
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
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
                    padding: "6px 4px",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 4px",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 4px",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 4px",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ padding: "6px 4px" }}>{inv.date}</td>
                  <td style={{ padding: "6px 4px" }}>
                    ${inv.amount.toFixed(2)} {inv.currency}
                  </td>
                  <td style={{ padding: "6px 4px", textTransform: "capitalize" }}>
                    {inv.status}
                  </td>
                  <td style={{ padding: "6px 4px" }}>
                    {inv.downloadUrl ? (
                      <a
                        href={inv.downloadUrl}
                        style={{
                          color: GOLD,
                          fontWeight: 600,
                          textDecoration: "underline",
                        }}
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
