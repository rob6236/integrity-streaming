// app/creator-studio/settings/_components/SettingsSidebar.tsx
"use client";

import React from "react";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

export type SettingsSectionId =
  | "account"
  | "channel"
  | "notifications"
  | "privacy"
  | "connectedApps"
  | "advanced";

type SidebarProps = {
  activeSection: SettingsSectionId;
  onSelect: (id: SettingsSectionId) => void;
};

const items: { id: SettingsSectionId; label: string }[] = [
  { id: "account", label: "Account" },
  { id: "channel", label: "Channel" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy & Safety" },
  { id: "connectedApps", label: "Connected apps" },
  { id: "advanced", label: "Advanced" },
];

export function SettingsSidebar({ activeSection, onSelect }: SidebarProps) {
  return (
    <aside
      style={{
        minWidth: 210,
        maxWidth: 240,
        borderRadius: 18,
        border: `2px solid ${GOLD}`,
        padding: 10,
        backgroundColor: BURGUNDY,
        boxShadow: "0 0 0 1px rgba(255,215,0,0.4)",
      }}
    >
      <h2
        style={{
          margin: "4px 0 10px",
          fontSize: 16,
          fontWeight: 800,
          color: GOLD,
          letterSpacing: 1,
        }}
      >
        Settings
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {items.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 999,
                border: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                backgroundColor: isActive
                  ? "rgba(255,215,0,0.15)"
                  : "rgba(0,0,0,0.35)",
                color: "white",
                fontWeight: isActive ? 800 : 600,
                fontSize: 14,
                letterSpacing: 0.6,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
