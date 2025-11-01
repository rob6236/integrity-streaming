// app/creator-studio/settings/_components/SettingsSidebar.tsx
"use client";

const burgundy = "#7B0F24";
const gold = "#FFD700";

type Item = {
  id: string;
  label: string;
};

export default function SettingsSidebar({ items }: { items: Item[] }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <aside
      className="hidden md:block w-64 shrink-0 sticky top-20 self-start rounded-2xl p-4"
      style={{
        background: "rgba(0,0,0,0.18)",
        border: `1px solid ${gold}`,
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.45), 0 0 18px rgba(255,215,0,0.12) inset",
      }}
    >
      <nav className="space-y-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => scrollTo(it.id)}
            className="w-full text-left px-3 py-2 rounded-xl text-sm"
            style={{
              color: "#FFF",
              border: `1px solid transparent`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.border = `1px solid ${gold}`);
              (e.currentTarget.style.backgroundColor = "rgba(255,215,0,0.08)");
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.border = `1px solid transparent`);
              (e.currentTarget.style.backgroundColor = "transparent");
            }}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
