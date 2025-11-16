// app/creator-studio/monetization/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import RevenueOverview from "./_components/RevenueOverview";
import ShortsRevenuePanel from "./_components/ShortsRevenuePanel";
import MembershipsPanel from "./_components/MembershipsPanel";
import SponsorshipsPanel from "./_components/SponsorshipsPanel";
import PayoutsTable from "./_components/PayoutsTable";
import AdPlacementsManager from "./_components/AdPlacementsManager";

type MonetizationTabId =
  | "overview"
  | "ads"
  | "shorts"
  | "memberships"
  | "sponsorships"
  | "payouts";

const TABS: {
  id: MonetizationTabId;
  label: string;
  description: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    description: "High-level earnings, RPM, and monetized watch time.",
  },
  {
    id: "ads",
    label: "Ad Placements",
    description: "Control which videos show ads and where they appear.",
  },
  {
    id: "shorts",
    label: "Shorts Revenue",
    description: "Revenue and RPM from your Shorts catalog.",
  },
  {
    id: "memberships",
    label: "Memberships",
    description: "Recurring revenue from paying channel members.",
  },
  {
    id: "sponsorships",
    label: "Sponsorships",
    description: "Brand deals and direct sponsorship income.",
  },
  {
    id: "payouts",
    label: "Payouts",
    description: "Scheduled and completed payouts to your account.",
  },
];

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState<MonetizationTabId>("overview");

  return (
    <div className="w-full px-8 pb-10 pt-6">
      {/* Page title + subtitle */}
      <header className="mb-6 border-b border-[#FFD700]/40 pb-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#FFD700]">
              Monetization
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-white/80">
              See how your content is making money across ads, Shorts,
              memberships, sponsorships, and payouts — all in one place.
            </p>
          </div>

          {/* Quick summary badges (sample data for now) */}
          <div className="mt-3 flex flex-wrap gap-3 md:mt-0 md:justify-end">
            <div className="rounded-2xl border border-[#FFD700]/60 bg-black/20 px-4 py-2 text-xs text-white">
              <div className="text-[11px] uppercase tracking-wide text-[#FFD700]/80">
                Last 28 days
              </div>
              <div className="text-lg font-extrabold">$0.00</div>
              <div className="text-[11px] text-white/70">
                Estimated total revenue
              </div>
            </div>
            <div className="rounded-2xl border border-[#FFD700]/40 bg-black/15 px-4 py-2 text-xs text-white">
              <div className="text-[11px] uppercase tracking-wide text-[#FFD700]/80">
                RPM (All content)
              </div>
              <div className="text-lg font-extrabold">$0.00</div>
              <div className="text-[11px] text-white/70">
                Revenue per 1,000 views
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Metric cards row */}
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[#FFD700]/60 bg-black/20 px-5 py-4 text-white shadow-lg shadow-black/30">
          <h2 className="text-sm font-bold text-[#FFD700]">Estimated Revenue</h2>
          <p className="mt-3 text-3xl font-extrabold tracking-wide">$0.00</p>
          <p className="mt-2 text-xs text-white/75">
            Sample data — this will connect to your revenue reports in
            Firestore/BigQuery later.
          </p>
        </div>

        <div className="rounded-3xl border border-[#FFD700]/60 bg-black/20 px-5 py-4 text-white shadow-lg shadow-black/30">
          <h2 className="text-sm font-bold text-[#FFD700]">Monetized Watch Time</h2>
          <p className="mt-3 text-3xl font-extrabold tracking-wide">0h 00m</p>
          <p className="mt-2 text-xs text-white/75">
            Total watch time that showed ads or generated revenue in the last
            period.
          </p>
        </div>

        <div className="rounded-3xl border border-[#FFD700]/60 bg-black/20 px-5 py-4 text-white shadow-lg shadow-black/30">
          <h2 className="text-sm font-bold text-[#FFD700]">Next Scheduled Payout</h2>
          <p className="mt-3 text-3xl font-extrabold tracking-wide">$0.00</p>
          <p className="mt-2 text-xs text-white/75">
            Once payouts are enabled, the next scheduled payment will appear
            here.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <nav className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "border-[#FFD700] bg-[#FFD700] text-[#7B0F24] shadow-lg shadow-black/40"
                  : "border-[#FFD700]/40 bg-black/20 text-white hover:border-[#FFD700] hover:bg-black/40"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Tab description */}
      <p className="mb-4 text-xs text-white/70">
        {
          TABS.find((tab) => tab.id === activeTab)?.description ??
          "View detailed monetization information for your channel."
        }
      </p>

      {/* Main content panel */}
      <section className="rounded-3xl border border-[#FFD700]/50 bg-black/20 p-5 text-white shadow-xl shadow-black/40">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <RevenueOverview />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#FFD700]/40 bg-[#7B0F24]/40 p-4 text-xs">
                <h3 className="text-sm font-bold text-[#FFD700]">
                  Where your money comes from
                </h3>
                <p className="mt-2 text-white/80">
                  Ads, Shorts revenue pool, memberships, sponsorships, and
                  other sources will all roll up into this overview. You&apos;ll
                  always see a clear breakdown of what you earned and why.
                </p>
              </div>
              <div className="rounded-2xl border border-[#FFD700]/40 bg-[#7B0F24]/40 p-4 text-xs">
                <h3 className="text-sm font-bold text-[#FFD700]">
                  When you get paid
                </h3>
                <p className="mt-2 text-white/80">
                  Once your payouts are wired up, thresholds, payout dates, and
                  recent payments will be visible in the Payouts tab, with a
                  clear timeline of every transaction.
                </p>
              </div>
              <div className="rounded-2xl border border-[#FFD700]/40 bg-[#7B0F24]/40 p-4 text-xs">
                <h3 className="text-sm font-bold text-[#FFD700]">
                  How to grow your revenue
                </h3>
                <p className="mt-2 text-white/80">
                  Over time, Integrity Streaming will surface tips based on your
                  data: higher-RPM topics, videos that convert members, and
                  watch-time opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#FFD700]">
                Ad Placements & Controls
              </h2>
              <Link
                href="/creator-studio/monetization/ad-placements/demo-video-id"
                className="rounded-full border border-[#FFD700] bg-[#FFD700] px-4 py-2 text-sm font-semibold text-[#7B0F24] shadow-md shadow-black/40 hover:bg-[#FFE55C]"
              >
                Manage ad placements per video
              </Link>
            </div>
            <p className="text-xs text-white/80">
              Decide which videos can show ads, what types of ads are allowed,
              and preview how ads appear before publishing.
            </p>
            <AdPlacementsManager />
          </div>
        )}

        {activeTab === "shorts" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#FFD700]">
              Shorts Revenue Breakdown
            </h2>
            <p className="text-xs text-white/80">
              See how your Shorts are contributing to your overall revenue,
              including view-based pools and RPM specific to short-form video.
            </p>
            <ShortsRevenuePanel />
          </div>
        )}

        {activeTab === "memberships" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#FFD700]">
              Channel Memberships
            </h2>
            <p className="text-xs text-white/80">
              Track recurring monthly income from your paying channel members.
              In the future you&apos;ll configure tiers, perks, and pricing
              right from this panel.
            </p>
            <MembershipsPanel />
          </div>
        )}

        {activeTab === "sponsorships" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#FFD700]">
              Sponsorships & Brand Deals
            </h2>
            <p className="text-xs text-white/80">
              Log and track income from direct brand deals, integrations, and
              sponsored segments. This keeps your Integrity Streaming revenue
              dashboard complete and centralized.
            </p>
            <SponsorshipsPanel />
          </div>
        )}

        {activeTab === "payouts" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#FFD700]">Payout History</h2>
            <p className="text-xs text-white/80">
              Every payout, date, method, and status will appear here so you
              always know exactly when and how you got paid.
            </p>
            <PayoutsTable />
          </div>
        )}
      </section>
    </div>
  );
}
