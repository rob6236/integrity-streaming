// app/creator-studio/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

/** --- Theme --- */
const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const CARD_BG = "rgba(0,0,0,0.18)";
const PANEL_BG = "rgba(0,0,0,0.28)";

/** --- Nav items (left column) --- */
const NAV = [
  { label: "Dashboard",          href: "/creator-studio" },
  { label: "Content Library",    href: "/creator-studio/library" },
  { label: "Upload",             href: "/creator-studio/upload" },
  { label: "Editor",             href: "/creator-studio/editor" },
  // ✅ corrected route
  { label: "Thumbnail Designer", href: "/creator-studio/thumbnail-designer" },
  { label: "Captions",           href: "/creator-studio/captions" },
  { label: "Monetization",       href: "/creator-studio/monetization" },
  { label: "Posts (Social)",     href: "/creator-studio/posts" },
  { label: "Comments / Inbox",   href: "/creator-studio/inbox" },
  { label: "Settings",           href: "/creator-studio/settings" },
  { label: "Billing",            href: "/creator-studio/billing" },
];

/** --- Gold outline helper --- */
const outline: React.CSSProperties = {
  border: `2px solid ${GOLD}`,
  boxShadow: `0 0 0 1px rgba(255,215,0,0.5), inset 0 0 10px rgba(255,215,0,0.18)`,
  borderRadius: 14,
};

export default function CreatorStudioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  // Auth gate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace(`/login?next=${encodeURIComponent("/creator-studio")}`);
    });
    return () => unsub();
  }, [router]);

  if (user === null) {
    return (
      <div
        style={{
          background: BURGUNDY,
          color: "white",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ ...outline, padding: 20 }}>Loading Studio…</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BURGUNDY,
        color: "white",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 16,
      }}
    >
      {/* Header row (no local smileys) */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop: 10,
        }}
      >
        <header
          data-header="true"
          style={{
            ...outline,
            background: PANEL_BG,
            padding: "8px 14px",
            maxWidth: 820,
            width: "92%",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto", // logo | centered title | buttons
            alignItems: "center",
            columnGap: 14,
            overflow: "visible",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt="Integrity Streaming Logo"
              width={86}
              height={86}
              style={{
                borderRadius: 10,
                border: `2px solid ${GOLD}`,
                boxShadow: `0 0 10px rgba(255,215,0,0.4)`,
                background: "#ffffff",
              }}
            />
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: 0.4,
              textShadow: "0 1px 0 rgba(0,0,0,0.45), 0 0 10px rgba(255,215,0,0.28)",
              color: GOLD,
              fontSize: 28,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            Integrity Streaming&nbsp;Creator&nbsp;Studio
          </h1>

          {/* Right controls */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <HeaderBtn asLink href="/home" label="Home" />
            <HeaderBtn
              onClick={async () => {
                await signOut(auth);
                router.replace("/login");
              }}
              label="Logout"
            />
          </div>
        </header>
      </div>

      {/* Left nav */}
      <aside
        style={{
          marginLeft: 12,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {NAV.map((item) => {
          const active =
            item.href === "/creator-studio"
              ? pathname === "/creator-studio"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...outline,
                background: active ? PANEL_BG : CARD_BG,
                padding: "12px 14px",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </aside>

      {/* Content */}
      <main
        style={{
          marginRight: 12,
          marginTop: 8,
          ...outline,
          background: "transparent",
          padding: 12,
        }}
      >
        {children}
      </main>
    </div>
  );
}

/** === Small button component === */
function HeaderBtn({
  label,
  onClick,
  asLink,
  href,
}: {
  label: string;
  onClick?: () => void;
  asLink?: boolean;
  href?: string;
}) {
  const base: React.CSSProperties = {
    ...outline,
    background: CARD_BG,
    padding: "10px 16px",
    minWidth: 92,
    textAlign: "center",
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
    display: "inline-block",
  };
  if (asLink && href) {
    return (
      <Link href={href} style={base}>
        {label}
      </Link>
    );
  }
  return (
    <button style={{ ...base, cursor: "pointer" }} onClick={onClick}>
      {label}
    </button>
  );
}
