// app/creator-studio/billing/_components/UpgradePlanCard.tsx
"use client";

const gold = "#FFD700";
const burgundy = "#7B0F24";

type Plan = {
  name: string;
  price: string; // "$15/mo"
  features: string[];
  highlighted?: boolean;
};

export default function UpgradePlanCard({
  currentPlan,
  plans,
  onSelect,
}: {
  currentPlan: string;
  plans: Plan[];
  onSelect?: (planName: string) => void;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-white text-xl font-semibold mb-3">
        Upgrade or change plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(0,0,0,0.18)",
              border: `1px solid ${gold}`,
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.45), 0 0 18px rgba(255,215,0,0.12) inset",
            }}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-white text-lg font-semibold">{p.name}</div>
              <div className="text-white/90">{p.price}</div>
            </div>
            <ul className="mt-3 space-y-2 text-white/80 text-sm">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              {currentPlan === p.name ? (
                <span
                  className="px-2 py-1 rounded-lg text-xs"
                  style={{
                    border: `1px solid ${gold}`,
                    background: "rgba(255,215,0,0.12)",
                    color: "#fffbe0",
                  }}
                >
                  CURRENT PLAN
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect?.(p.name)}
                  className="px-4 py-2 rounded-xl font-semibold"
                  style={{ background: gold, color: burgundy }}
                >
                  Choose {p.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
