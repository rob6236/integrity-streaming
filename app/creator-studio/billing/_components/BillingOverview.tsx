// app/creator-studio/billing/_components/BillingOverview.tsx
"use client";

type Stat = {
  label: string;
  value: string;
  sub?: string;
};

const gold = "#FFD700";

export default function BillingOverview({ stats }: { stats: Stat[] }) {
  return (
    <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl p-4"
          style={{
            background: "rgba(0,0,0,0.18)",
            border: `1px solid ${gold}`,
            boxShadow:
              "0 0 0 1px rgba(255,215,0,0.45), 0 0 18px rgba(255,215,0,0.12) inset",
          }}
        >
          <div className="text-sm text-white/70">{s.label}</div>
          <div className="text-xl font-semibold text-white mt-1">{s.value}</div>
          {s.sub ? <div className="text-xs text-white/60 mt-1">{s.sub}</div> : null}
        </div>
      ))}
    </section>
  );
}
