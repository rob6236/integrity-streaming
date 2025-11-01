"use client";

import { useState } from "react";

const burgundy = "#7B0F24";
const gold = "#FFD700";
const white = "#FFFFFF";

export default function MonetizationSettingsPage() {
  const [enabled, setEnabled] = useState(true);
  const [adsOnNewUploads, setAdsOnNewUploads] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState<"Stripe" | "Bank" | "PayPal">("Stripe");

  const save = async () => {
    // TODO: persist to Firestore: creators/{uid}/monetization/settings
    alert("Saved monetization settings.");
  };

  return (
    <main className="min-h-screen w-full" style={{ background: burgundy, color: white }}>
      <h1 className="sr-only">Integrity Streaming — Monetization Settings</h1>

      <header className="w-full border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: gold }}>
        <div className="text-lg font-semibold">
          Monetization / <span style={{ color: gold }}>Settings</span>
        </div>
        <button onClick={save} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
          Save
        </button>
      </header>

      <div className="p-5 grid gap-5 max-w-3xl">
        <Card>
          <h2 className="text-lg font-semibold mb-2" style={{ color: gold }}>General</h2>
          <Toggle label="Enable monetization for my channel" checked={enabled} onChange={setEnabled} />
          <Toggle label="Enable ads by default on new uploads" checked={adsOnNewUploads} onChange={setAdsOnNewUploads} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2" style={{ color: gold }}>Payouts</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <select className="rounded-lg px-3 py-2 text-black" value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value as any)}>
              <option value="Stripe">Stripe</option>
              <option value="Bank">Bank Transfer</option>
              <option value="PayPal">PayPal</option>
            </select>
            <button className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
              Connect / Update {payoutMethod}
            </button>
          </div>
          <div className="text-sm opacity-80 mt-2">Payouts run monthly once your balance exceeds the minimum threshold.</div>
        </Card>
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-4 border" style={{ borderColor: gold }}>{children}</div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
