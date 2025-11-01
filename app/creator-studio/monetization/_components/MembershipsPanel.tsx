"use client";

const gold = "#FFD700";

export default function MembershipsPanel() {
  // Stub data; later wire to Firestore/Stripe products
  const tiers = [
    { name: "Supporter", price: "$3/mo", members: 126 },
    { name: "Backer", price: "$7/mo", members: 58 },
    { name: "VIP", price: "$15/mo", members: 22 },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3" style={{ color: gold }}>Memberships</h2>
      <div className="grid gap-3">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-xl p-3 border flex items-center justify-between"
               style={{ borderColor: gold }}>
            <div>
              <div className="font-medium">{t.name}</div>
              <div className="text-sm opacity-80">{t.price}</div>
            </div>
            <div className="text-sm opacity-80">{t.members} members</div>
            <button className="rounded px-3 py-2 border" style={{ borderColor: gold }}>
              Manage
            </button>
          </div>
        ))}
      </div>
      <div className="text-sm opacity-80 mt-2">
        Tip: Each tier maps to a Stripe Price. Store definitions in <code>memberships/tiers</code>.
      </div>
    </div>
  );
}
