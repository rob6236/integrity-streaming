"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Dashboard",         href: "/creator-studio" },
  { label: "Content Library",   href: "/creator-studio/library" },
  { label: "Upload",            href: "/creator-studio/upload" },
  { label: "Editor",            href: "/creator-studio/editor" },
  { label: "Thumbnail Designer", href: "/creator-studio/thumbnail-designer" },
  // Captions removed on purpose
  { label: "Monetization",      href: "/creator-studio/monetization" },
  { label: "Posts (Social)",    href: "/creator-studio/posts" },
  { label: "Comments / Inbox",  href: "/creator-studio/inbox" },
  { label: "Settings",          href: "/creator-studio/settings" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-3">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={clsx(
              "block rounded-2xl border px-4 py-3 text-[15px] font-semibold",
              "transition-all",
              // your burgundy/gold styling:
              "border-[rgba(255,215,0,0.6)] bg-[rgba(0,0,0,0.18)] text-[rgba(255,255,255,0.92)]",
              active
                ? "shadow-[0_0_0_2px_rgba(255,215,0,0.6)]"
                : "hover:shadow-[0_0_0_2px_rgba(255,215,0,0.35)]"
            )}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
