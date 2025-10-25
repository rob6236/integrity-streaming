// app/_components/Header.tsx

"use client";
import Link from "next/link";
import Image from "next/image";

const btn =
  "inline-flex items-center justify-center rounded-xl border border-[#FFD700] bg-white px-6 py-3 text-[18px] font-bold text-black shadow-sm hover:bg-[#fff3c4] transition";

export default function Header() {
  return (
    <header className="site-header flex items-center justify-between px-6 py-4 bg-[#7B0F24] border-b border-[#FFD700]">
      {/* Left: logo + title */}
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg">
          <Image
            src="/logo.png"
            alt="Integrity Streaming Logo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <h1 className="text-[#FFD700] text-2xl font-bold">Integrity Streaming</h1>
      </div>

      {/* Right: ALL THREE MATCHING WHITE BUTTONS */}
      <nav className="flex items-center gap-4">
        <Link href="/home" className={btn}>
          Home
        </Link>

        <Link href="/studio" className={btn}>
          Create
        </Link>

        <Link href="/login" className={btn}>
          Login
        </Link>
      </nav>
    </header>
  );
}