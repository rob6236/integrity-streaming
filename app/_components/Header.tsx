// C:\Users\rcwoo\integrity-streaming\app\components\Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#FFD700] p-4 md:p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo box (leave as-is; swap src if you already use a different path) */}
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="Integrity Streaming Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Center: Title — GOLD ONLY (forced with inline style) */}
          <h1
            className="text-center text-[40px] md:text-[44px] font-extrabold italic leading-none"
            style={{
              color: "#FFD700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            Integrity <span style={{ fontStyle: "normal" }}>Streaming</span>
          </h1>

          {/* Right: Nav buttons (unchanged) */}
          <nav className="flex items-center gap-3">
            <Link
              href="/home"
              className="rounded-xl bg-white/90 px-4 py-2 text-black font-semibold shadow hover:bg-white"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="rounded-xl bg-white/90 px-4 py-2 text-black font-semibold shadow hover:bg-white"
            >
              Create
            </Link>
            <Link
              href="/login"
              className="rounded-xl border-2 border-[#FFD700] bg-white px-5 py-2 text-black font-extrabold shadow hover:bg-white/95"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
