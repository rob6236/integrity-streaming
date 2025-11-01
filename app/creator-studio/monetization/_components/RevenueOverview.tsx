"use client";

const gold = "#FFD700";

export default function RevenueOverview() {
  // TODO: replace with Firestore aggregates
  const stats = [
    { label: "Est. Revenue (30d)", value: "$1,820.44" },
    { label: "RPM (avg)", value: "$6.12" },
    { label: "Ad Impressions", value: "298,310" },
    { label: "Fill Rate", value: "84%" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Revenue Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-3 border" style={{ borderColor: gold }}>
            <div className="text-sm opacity-80">{s.label}</div>
            <div className="text-xl font-semibold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm opacity-80">
        Tip: RPM = (revenue / 1000 views). Wire this to Firestore later: <code>revenues/daily</code>.
      </div>
    </div>
  );
}
