"use client";

import RevenueOverview from "./_components/RevenueOverview";
import PayoutsTable from "./_components/PayoutsTable";
import MembershipsPanel from "./_components/MembershipsPanel";
import SponsorshipsPanel from "./_components/SponsorshipsPanel";
import ShortsRevenuePanel from "./_components/ShortsRevenuePanel";
import AdPlacementsManager from "./_components/AdPlacementsManager";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

export default function MonetizationPage() {
  return (
    <main className="min-h-screen w-full" style={{ background: burgundy, color: white }}>
      <h1 className="sr-only">Integrity Streaming — Monetization</h1>

      <header className="w-full border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: gold }}>
        <div className="text-lg font-semibold">
          Creator Studio / <span style={{ color: gold }}>Monetization</span>
        </div>
        <div className="text-sm opacity-80">
          Track revenue, manage ad breaks, memberships, sponsorships, and payouts.
        </div>
      </header>

      <div className="grid gap-5 p-5"
           style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Left column */}
        <section className="grid gap-5">
          <Card><RevenueOverview /></Card>
          <Card><AdPlacementsManager /></Card>
          <Card><ShortsRevenuePanel /></Card>
        </section>

        {/* Right column */}
        <section className="grid gap-5">
          <Card><MembershipsPanel /></Card>
          <Card><SponsorshipsPanel /></Card>
          <Card><PayoutsTable /></Card>
        </section>
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ borderColor: gold }}>
      {children}
    </div>
  );
}
