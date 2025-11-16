"use client";

import React from "react";

const mockShorts = [
  {
    id: "s1",
    title: "Overlay Tip in 30 Seconds",
    views: 5400,
    rpm: 1.8,
    revenue: 9.72,
  },
  {
    id: "s2",
    title: "Color Grading Trick",
    views: 3120,
    rpm: 2.1,
    revenue: 6.55,
  },
];

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function ShortsRevenuePanel() {
  return (
    <div className="space-y-5 text-white">
      {/* Summary row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Shorts Revenue (Last 28 Days)
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            Total estimated revenue from your Shorts in the selected date range.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Shorts RPM
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            Revenue per 1,000 Shorts views. This often differs from long-form
            video RPM.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Shorts Views
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0</div>
          <p className="mt-2 text-xs text-white/80">
            Once analytics is wired, you will see Shorts-specific view counts
            here.
          </p>
        </div>
      </div>

      {/* Shorts list */}
      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <h2 className="mb-3 text-sm font-bold text-[#FFD700]">
          Example Shorts breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FFD700]/30 text-[11px] uppercase tracking-wide text-white/70">
                <th className="py-2 pr-3">Short</th>
                <th className="px-3 py-2">Views</th>
                <th className="px-3 py-2">RPM</th>
                <th className="px-3 py-2">Estimated Revenue</th>
              </tr>
            </thead>
            <tbody>
              {mockShorts.map((short) => (
                <tr
                  key={short.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-5 items-center justify-center rounded-md bg-gradient-to-b from-[#FFD700] to-[#FFE55C] text-[9px] font-bold text-[#7B0F24]">
                        9:16
                      </div>
                      <span className="max-w-xs truncate text-[13px] font-semibold">
                        {short.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[13px]">
                    {short.views.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-[13px]">
                    {formatCurrency(short.rpm)}
                  </td>
                  <td className="px-3 py-2 text-[13px] font-semibold text-[#FFD700]">
                    {formatCurrency(short.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[11px] text-white/70">
          This is a placeholder layout to visualize how Shorts monetization will
          be presented. Once connected, each Short will show actual views, RPM,
          and estimated revenue.
        </p>
      </div>
    </div>
  );
}
