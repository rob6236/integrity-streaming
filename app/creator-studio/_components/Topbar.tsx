"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <header
      data-header="true"
      className="w-full flex items-center justify-between rounded-2xl border border-yellow-400 px-4 py-3 text-white mb-4"
      style={{ overflow: "visible" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-xl border border-yellow-400"
          style={{ width: 60, height: 60 }}
        >
          <span className="text-xs">LOGO</span>
        </div>

        <div className="font-extrabold text-2xl leading-none">
          Integrity
          <div>Streaming Creator Studio</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/" className="px-4 py-2 rounded-xl border border-yellow-400">
          Home
        </Link>
        <Link href="/logout" className="px-4 py-2 rounded-xl border border-yellow-400">
          Logout
        </Link>
      </div>
    </header>
  );
}
