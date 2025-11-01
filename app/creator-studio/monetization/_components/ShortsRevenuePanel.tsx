"use client";

const gold = "#FFD700";

export default function ShortsRevenuePanel() {
  const stats = [
    { label: "Shorts Views (30d)", value: "1.2M" },
    { label: "Revenue (30d)", value: "$410.22" },
    { label: "Revenue / 1K Views", value: "$0.34" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Shorts Revenue</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-3 border" style={{ borderColor: gold }}>
            <div className="text-sm opacity-80">{s.label}</div>
            <div className="text-xl font-semibold mt-1">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="text-sm opacity-80 mt-2">
        Tip: Shorts pool → revenue share by view contribution. Store daily splits in <code>shorts/daily</code>.
      </div>
    </div>
  );
}
