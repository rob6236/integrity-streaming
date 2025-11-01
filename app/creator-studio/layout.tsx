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
  { label: "Dashboard", href: "/creator-studio" },
  // ✅ REAL route
  { label: "Content Library", href: "/creator-studio/library" },
  { label: "Upload", href: "/creator-studio/upload" },
  { label: "Editor", href: "/creator-studio/editor" },
  { label: "Thumbnail Designer", href: "/creator-studio/thumbnail-designer" },
  { label: "Captions", href: "/creator-studio/captions" },
  { label: "Monetization", href: "/creator-studio/monetization" },
  { label: "Posts (Social)", href: "/creator-studio/posts" },
  { label: "Comments / Inbox", href: "/creator-studio/inbox" },
  { label: "Settings", href: "/creator-studio/settings" },
  { label: "Billing", href: "/creator-studio/billing" },
];

/** --- Gold outline helper --- */
const outline = {
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
      <div style={{ background: BURGUNDY, color: "white", minHeight: "100vh", display: "grid", placeItems: "center" }}>
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
      {/* Header */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginTop: 10 }}>
        <Smiley position="left" />
        <header
          style={{
            ...outline,
            background: PANEL_BG,
            padding: "8px 14px",
            maxWidth: 820,
            width: "92%",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            columnGap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt="Integrity Streaming Logo"
              width={86}
              height={86}
              style={{ borderRadius: 10, border: `2px solid ${GOLD}`, boxShadow: `0 0 10px rgba(255,215,0,0.4)`, background: "#fff" }}
            />
          </div>
          <h1
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: 0.4,
              textShadow: "0 1px 0 rgba(0,0,0,0.45), 0 0 10px rgba(255,215,0,0.28)",
              color: GOLD,
              fontSize: 28,
              textAlign: "center",
            }}
          >
            Integrity Streaming&nbsp;Creator&nbsp;Studio
          </h1>
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
        <Smiley position="right" />
      </div>

      {/* Sidebar */}
      <aside style={{ marginLeft: 12, marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
        {NAV.map((item) => {
          const active = item.href === "/creator-studio" ? pathname === "/creator-studio" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ ...outline, background: active ? PANEL_BG : CARD_BG, padding: "12px 14px", color: "white", textDecoration: "none", fontWeight: 600 }}
            >
              {item.label}
            </Link>
          );
        })}
      </aside>

      {/* Content */}
      <main style={{ marginRight: 12, marginTop: 8, ...outline, background: "transparent", padding: 12 }}>{children}</main>

      {/* Smiley styles */}
      <style jsx global>{`
        @keyframes dance-bounce { 0%{transform:translateY(0) rotate(0)}25%{transform:translateY(-6px) rotate(-6deg)}50%{transform:translateY(0) rotate(0)}75%{transform:translateY(-6px) rotate(6deg)}100%{transform:translateY(0) rotate(0)} }
        .studio-smiley{position:absolute;top:10px;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#ffd27a,#ffb84d);border:2px solid ${GOLD};box-shadow:0 0 0 1px rgba(255,215,0,0.5),inset 0 0 10px rgba(0,0,0,0.15);animation:dance-bounce 1.8s infinite ease-in-out}
        .studio-smiley .eye{position:absolute;top:10px;width:5px;height:5px;background:#4b1d03;border-radius:50%}.studio-smiley .eye.left{left:9px}.studio-smiley .eye.right{right:9px}
        .studio-smiley .mouth{position:absolute;left:50%;top:18px;width:16px;height:8px;border-bottom-left-radius:10px 8px;border-bottom-right-radius:10px 8px;background:#4b1d03;transform:translateX(-50%)}
        .studio-smiley .limb{position:absolute;width:3px;background:${GOLD};box-shadow:0 0 0 1px rgba(255,215,0,0.25)}
        .studio-smiley .arm.left{height:14px;left:-5px;top:12px;transform:rotate(30deg);transform-origin:bottom;animation:wave 1.8s infinite ease-in-out}
        .studio-smiley .arm.right{height:14px;right:-5px;top:12px;transform:rotate(-30deg);transform-origin:bottom;animation:wave 1.8s infinite ease-in-out reverse}
        .studio-smiley .leg.left{height:16px;left:8px;bottom:-12px;transform:rotate(10deg);transform-origin:top;animation:step 1.8s infinite ease-in-out}
        .studio-smiley .leg.right{height:16px;right:8px;bottom:-12px;transform:rotate(-10deg);transform-origin:top;animation:step 1.8s infinite ease-in-out reverse}
        @keyframes wave{0%,100%{transform:rotate(30deg)}50%{transform:rotate(60deg)}}@keyframes step{0%,100%{transform:rotate(10deg) translateY(0)}50%{transform:rotate(0) translateY(2px)}}
        @media (max-width:720px){.studio-smiley{display:none}}
      `}</style>
    </div>
  );
}

/** Buttons */
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
  if (asLink && href) return <Link href={href} style={base}>{label}</Link>;
  return <button style={{ ...base, cursor: "pointer" }} onClick={onClick}>{label}</button>;
}

/** Smiley */
function Smiley({ position }: { position: "left" | "right" }) {
  const inset = 28;
  return (
    <div className="studio-smiley" style={{ left: position === "left" ? inset : undefined, right: position === "right" ? inset : undefined }} aria-hidden>
      <span className="eye left" /><span className="eye right" /><span className="mouth" />
      <span className="limb arm left" /><span className="limb arm right" />
      <span className="limb leg left" /><span className="limb leg right" />
    </div>
  );
}
