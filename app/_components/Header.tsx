// C:\Users\rcwoo\integrity-streaming\app\_components\Header.tsx
"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export default function Header() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const buttonStyle =
    "px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all";

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b-2 border-[#FFD700] bg-[#7B0F24]">
      {/* Left: Logo and title */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-md bg-white border border-[#FFD700] overflow-hidden flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Integrity Streaming Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
        <h1 className="text-[24px] font-extrabold italic text-[#FFD700] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
          Integrity <span className="not-italic">Streaming</span>
        </h1>
      </div>

      {/* Right: Navigation buttons */}
      <nav className="flex items-center gap-4">
        <Link href="/home" className={buttonStyle}>
          Home
        </Link>
        <Link href="/create" className={buttonStyle}>
          Create
        </Link>
        {user ? (
          <button onClick={handleLogout} className={buttonStyle}>
            Logout
          </button>
        ) : (
          <Link href="/login" className={buttonStyle}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
