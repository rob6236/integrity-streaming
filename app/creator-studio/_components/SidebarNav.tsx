"use client";

import Link from "next/link";

const gold = "#FFD700";

export default function SidebarNav() {
  return (
    <aside className="w-60 p-3 flex flex-col gap-3">
      <NavLink href="/creator-studio">Dashboard</NavLink>
      <NavLink href="/creator-studio/content-library">Content Library</NavLink>
      <NavLink href="/creator-studio/upload">Upload</NavLink>
      <NavLink href="/creator-studio/editor">Editor</NavLink>
      <NavLink href="/creator-studio/thumbnail-designer">Thumbnail Designer</NavLink>
      <NavLink href="/creator-studio/captions">Captions</NavLink>
      <NavLink href="/creator-studio/monetization">Monetization</NavLink>
      <NavLink href="/creator-studio/posts">Posts (Social)</NavLink>

      {/* ✅ Exact correct path */}
      <NavLink href="/creator-studio/comments-inbox">Comments / Inbox</NavLink>

      <NavLink href="/creator-studio/settings">Settings</NavLink>
    </aside>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="rounded-xl px-4 py-3 text-center border hover:opacity-90 transition-all no-underline"
      style={{ borderColor: "#FFD700", color: "#FFFFFF", textDecoration: "none" }}
    >
      {children}
    </Link>
  );
}
