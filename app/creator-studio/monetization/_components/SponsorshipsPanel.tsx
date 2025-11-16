"use client";

import React from "react";

const mockDeals = [
  {
    id: "sp1",
    brand: "Example Brand",
    campaign: "Editor Pro Launch",
    status: "Planned",
    value: 500,
    deliverables: "1 dedicated video, 1 Short, 2 community posts",
  },
  {
    id: "sp2",
    brand: "Placeholder Studio",
    campaign: "Creator Studio Tour",
    status: "Completed",
    value: 350,
    deliverables: "Integrated segment in one video",
  },
];

function statusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/90";
    case "In Progress":
      return "bg-sky-500/90";
    case "Planned":
      return "bg-amber-500/90";
    default:
      return "bg-slate-500/90";
  }
}

export default function SponsorshipsPanel() {
  return (
    <div className="space-y-5 text-white">
      {/* Summary row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Total Sponsorship Value (This Year)
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            Once connected, this will show the combined value of your brand
            deals tracked through Integrity Streaming.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Active Deals
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0</div>
          <p className="mt-2 text-xs text-white/80">
            Brand deals that are in progress or upcoming.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Completed Deliverables
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0</div>
          <p className="mt-2 text-xs text-white/80">
            Over time, you&apos;ll see how many sponsored videos and posts
            you&apos;ve delivered.
          </p>
        </div>
      </div>

      {/* Deals table */}
      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#FFD700]">
            Sponsorships & brand deals (example layout)
          </h2>
          <button
            type="button"
            className="rounded-full border border-[#FFD700] bg-black/40 px-4 py-1.5 text-xs font-semibold text-[#FFD700] hover:bg-black/70"
          >
            Add sponsorship (coming soon)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FFD700]/30 text-[11px] uppercase tracking-wide text-white/70">
                <th className="py-2 pr-3">Brand</th>
                <th className="px-3 py-2">Campaign</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Value</th>
                <th className="px-3 py-2">Deliverables</th>
              </tr>
            </thead>
            <tbody>
              {mockDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-2 pr-3 text-[13px] font-semibold">
                    {deal.brand}
                  </td>
                  <td className="px-3 py-2 text-[13px]">{deal.campaign}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${statusColor(
                        deal.status
                      )}`}
                    >
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[13px] font-semibold text-[#FFD700]">
                    ${deal.value.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-[13px]">
                    {deal.deliverables}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[11px] text-white/70">
          Use this panel in the future to log sponsored deals, track their
          status, and keep your sponsorship revenue organized alongside your ad
          revenue.
        </p>
      </div>
    </div>
  );
}
