"use client";

const gold = "#FFD700";

export default function PostInsightsPanel({
  totalImpressions,
  totalLikes,
  ctr,
}: {
  totalImpressions: number;
  totalLikes: number;
  ctr: number; // 0..1
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Insights</h2>
      <div className="grid gap-3">
        <Stat label="Total Impressions" value={n(totalImpressions)} />
        <Stat label="Total Likes" value={n(totalLikes)} />
        <Stat label="Avg Click-through Rate" value={`${(ctr * 100).toFixed(2)}%`} />
      </div>
      <div className="text-sm opacity-80 mt-3">
        Wire these to Firestore aggregates later (e.g., <code>posts/daily</code>).
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3 border" style={{ borderColor: gold }}>
      <div className="text-sm opacity-80">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function n(x: number) {
  return new Intl.NumberFormat().format(x);
}
