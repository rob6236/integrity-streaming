"use client";

import Link from "next/link";

export default function Breadcrumbs({
  items = [{ label: "Creator Studio", href: "/creator-studio" }],
}: {
  items?: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[rgba(255,255,255,0.85)] text-sm">
      <ol className="flex gap-2 items-center">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {it.href ? (
              <Link
                href={it.href}
                className="underline decoration-[rgba(255,215,0,0.6)] underline-offset-2"
              >
                {it.label}
              </Link>
            ) : (
              <span>{it.label}</span>
            )}
            {idx < items.length - 1 && <span className="opacity-60">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
