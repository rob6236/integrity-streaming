"use client";

import React from "react";

const mockTiers = [
  {
    id: "tier1",
    name: "Supporter",
    price: 4.99,
    members: 0,
    perks: ["Loyalty badge", "Access to members-only feed"],
  },
  {
    id: "tier2",
    name: "Producer",
    price: 9.99,
    members: 0,
    perks: ["All Supporter perks", "Behind-the-scenes posts", "Early access"],
  },
];

export default function MembershipsPanel() {
  return (
    <div className="space-y-5 text-white">
      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Monthly Membership Revenue
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            When memberships launch, this will display your recurring monthly
            income from members.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Active Members
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0</div>
          <p className="mt-2 text-xs text-white/80">
            The total number of people actively paying for your membership tiers.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Churn / Growth
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0%</div>
          <p className="mt-2 text-xs text-white/80">
            Growth and cancellation trends will appear here once real data is
            available.
          </p>
        </div>
      </div>

      {/* Tiers list */}
      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#FFD700]">
            Membership tiers (example layout)
          </h2>
          <button
            type="button"
            className="rounded-full border border-[#FFD700] bg-black/40 px-4 py-1.5 text-xs font-semibold text-[#FFD700] hover:bg-black/70"
          >
            Configure tiers (coming soon)
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {mockTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-2xl border border-[#FFD700]/40 bg-[#7B0F24]/50 p-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#FFD700]">
                    {tier.name}
                  </h3>
                  <div className="text-sm font-bold">
                    ${tier.price.toFixed(2)}
                    <span className="text-xs font-normal text-white/80">
                      /month
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-white/80">
                  Members: <span className="font-semibold">0</span>
                </p>
                <ul className="mt-3 space-y-1 text-xs text-white/85">
                  {tier.perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-[#FFD700]/70 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-[#FFD700] hover:bg-black/60"
              >
                Edit tier (placeholder)
              </button>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11px] text-white/70">
          This panel shows a possible structure for memberships. Later, you&apos;ll
          be able to create custom tiers, pricing, and perks directly in this
          interface.
        </p>
      </div>
    </div>
  );
}
