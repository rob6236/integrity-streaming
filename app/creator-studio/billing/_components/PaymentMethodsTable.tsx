// app/creator-studio/billing/_components/PaymentMethodsTable.tsx
"use client";

type PaymentMethod = {
  id: string;            // e.g. "pm_123"
  brand: string;         // "Visa", "Mastercard"
  last4: string;         // "4242"
  expMonth: number;      // 12
  expYear: number;       // 2030
  isDefault?: boolean;
};

const gold = "#FFD700";
const burgundy = "#7B0F24";

export default function PaymentMethodsTable({
  methods,
  onMakeDefault,
  onRemove,
  onAdd,
}: {
  methods: PaymentMethod[];
  onMakeDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
  onAdd?: () => void;
}) {
  return (
    <section
      className="rounded-2xl overflow-hidden mb-6"
      style={{ border: `1px solid ${gold}` }}
    >
      <div
        className="px-4 py-3 text-white font-semibold flex items-center justify-between"
        style={{ background: "rgba(0,0,0,0.28)" }}
      >
        <span>Payment methods</span>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1 rounded-xl text-sm font-semibold"
          style={{ background: gold, color: burgundy }}
        >
          Add method
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr
              className="text-left text-white/80"
              style={{ background: "rgba(0,0,0,0.18)" }}
            >
              <th className="px-4 py-3">Card</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m) => (
              <tr
                key={m.id}
                className="border-t"
                style={{ borderColor: "rgba(255,215,0,0.25)" }}
              >
                <td className="px-4 py-3 text-white/90">
                  {m.brand} •••• {m.last4}
                </td>
                <td className="px-4 py-3 text-white/90">
                  {String(m.expMonth).padStart(2, "0")}/{m.expYear}
                </td>
                <td className="px-4 py-3">
                  {m.isDefault ? (
                    <span
                      className="px-2 py-1 rounded-lg text-xs"
                      style={{
                        border: `1px solid ${gold}`,
                        background: "rgba(255,215,0,0.12)",
                        color: "#fffbe0",
                      }}
                    >
                      DEFAULT
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onMakeDefault?.(m.id)}
                      className="px-3 py-1 rounded-xl text-sm"
                      style={{
                        border: `1px solid ${gold}`,
                        color: "#FFF",
                        background: "rgba(0,0,0,0.25)",
                      }}
                    >
                      Make default
                    </button>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onRemove?.(m.id)}
                    className="px-3 py-1 rounded-xl text-sm"
                    style={{
                      border: `1px solid ${gold}`,
                      color: "#FFF",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {methods.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-white/70" colSpan={4}>
                  No payment methods yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
