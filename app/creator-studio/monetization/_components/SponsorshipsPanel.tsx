"use client";

const gold = "#FFD700";

export default function SponsorshipsPanel() {
  // Stubbed upcoming/active sponsorships
  const deals = [
    { brand: "Acme Cameras", status: "Active", cpm: "$18", deliverables: "1 mid-roll, 1 shout-out" },
    { brand: "SkillSmith", status: "Pending", cpm: "$22", deliverables: "1 pre-roll, link in description" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Sponsorships</h2>
      <div className="grid gap-3">
        {deals.map((d) => (
          <div key={d.brand} className="rounded-xl p-3 border" style={{ borderColor: gold }}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{d.brand}</div>
              <div className="text-sm opacity-80">{d.status}</div>
            </div>
            <div className="text-sm opacity-80 mt-1">
              {d.deliverables} • CPM {d.cpm}
            </div>
            <div className="mt-2 flex gap-2">
              <button className="rounded px-3 py-2 border" style={{ borderColor: gold }}>View Brief</button>
              <button className="rounded px-3 py-2 border" style={{ borderColor: gold }}>Mark Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
