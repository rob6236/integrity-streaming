// app/creator-studio/billing/_components/InvoicesTable.tsx
"use client";

type Invoice = {
  id: string;        // e.g. "inv_123"
  date: string;      // ISO or pretty string
  amount: number;    // in cents
  status: "paid" | "open" | "void";
  url?: string;      // receipt PDF url (optional)
};

const gold = "#FFD700";

function formatUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <section
      className="rounded-2xl overflow-hidden mb-6"
      style={{ border: `1px solid ${gold}` }}
    >
      <div
        className="px-4 py-3 text-white font-semibold"
        style={{ background: "rgba(0,0,0,0.28)" }}
      >
        Invoices
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr
              className="text-left text-white/80"
              style={{ background: "rgba(0,0,0,0.18)" }}
            >
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Invoice ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr
                key={inv.id}
                className="border-t"
                style={{ borderColor: "rgba(255,215,0,0.25)" }}
              >
                <td className="px-4 py-3 text-white/90">{inv.date}</td>
                <td className="px-4 py-3 text-white/90">{inv.id}</td>
                <td className="px-4 py-3 text-white">{formatUSD(inv.amount)}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-lg text-xs"
                    style={{
                      border: `1px solid ${gold}`,
                      background:
                        inv.status === "paid"
                          ? "rgba(0,255,127,0.15)"
                          : inv.status === "open"
                          ? "rgba(255,215,0,0.12)"
                          : "rgba(255,0,0,0.12)",
                      color:
                        inv.status === "paid"
                          ? "#bfffd9"
                          : inv.status === "open"
                          ? "#fffbe0"
                          : "#ffdada",
                    }}
                  >
                    {inv.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {inv.url ? (
                    <a
                      href={inv.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-xl text-sm"
                      style={{
                        border: `1px solid ${gold}`,
                        color: "#FFF",
                        background: "rgba(0,0,0,0.25)",
                      }}
                    >
                      Download receipt
                    </a>
                  ) : (
                    <button
                      className="px-3 py-1 rounded-xl text-sm"
                      style={{
                        border: `1px solid ${gold}`,
                        color: "#FFF",
                        background: "rgba(0,0,0,0.25)",
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      Not available
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-white/70" colSpan={5}>
                  No invoices yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
