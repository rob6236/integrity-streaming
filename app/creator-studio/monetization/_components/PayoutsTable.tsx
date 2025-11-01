"use client";

const gold = "#FFD700";

type Row = {
  id: string;
  period: string;
  amount: string;
  status: "Processing" | "Paid" | "On Hold";
  method: "Stripe" | "Bank Transfer" | "PayPal";
};

const rows: Row[] = [
  { id: "p_001", period: "Sep 2025", amount: "$612.09", status: "Paid", method: "Stripe" },
  { id: "p_002", period: "Oct 2025", amount: "$784.15", status: "Processing", method: "Stripe" },
  { id: "p_003", period: "Aug 2025", amount: "$424.20", status: "Paid", method: "Stripe" },
];

export default function PayoutsTable() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Payouts</h2>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: gold }}>
        <table className="w-full text-sm">
          <thead className="bg-[rgba(0,0,0,0.15)]">
            <tr>
              <Th>Period</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Method</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t" style={{ borderColor: gold }}>
                <Td>{r.period}</Td>
                <Td>{r.amount}</Td>
                <Td>{r.status}</Td>
                <Td>{r.method}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm opacity-80 mt-2">
        Configure payout destination in <strong>Monetization → Settings</strong>.
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2">{children}</td>;
}
