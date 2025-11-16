"use client";

import React from "react";

const mockPayouts = [
  {
    id: "p1",
    date: "2025-01-31",
    amount: 120.5,
    method: "Bank transfer",
    status: "Completed",
  },
  {
    id: "p2",
    date: "2025-02-28",
    amount: 95.25,
    method: "Bank transfer",
    status: "Scheduled",
  },
];

function statusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "text-emerald-400";
    case "Scheduled":
      return "text-amber-300";
    case "On Hold":
      return "text-red-300";
    default:
      return "text-white";
  }
}

export default function PayoutsTable() {
  return (
    <div className="space-y-4 text-white">
      <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
        <h3 className="text-sm font-bold text-[#FFD700]">
          Payout schedule (sample layout)
        </h3>
        <p className="mt-2 text-xs text-white/80">
          When payouts are fully wired, this panel will show every transfer made
          to you — including date, amount, method, and status. You&apos;ll
          always know exactly when and how you got paid.
        </p>
      </div>

      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-[#FFD700]">Payout history</h4>
          <button
            type="button"
            className="rounded-full border border-[#FFD700]/70 bg-black/40 px-4 py-1.5 text-xs font-semibold text-[#FFD700] hover:bg-black/70"
          >
            Export CSV (coming soon)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FFD700]/30 text-[11px] uppercase tracking-wide text-white/70">
                <th className="py-2 pr-3">Date</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Method</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-2 pr-3 text-[13px]">{payout.date}</td>
                  <td className="px-3 py-2 text-[13px] font-semibold text-[#FFD700]">
                    ${payout.amount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-[13px]">{payout.method}</td>
                  <td className={`px-3 py-2 text-[13px] ${statusColor(payout.status)}`}>
                    {payout.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[11px] text-white/70">
          For now, this is only placeholder data. Once payouts are live, this
          table will be generated directly from your payment provider so that
          Integrity Streaming remains fully transparent about your earnings.
        </p>
      </div>
    </div>
  );
}
