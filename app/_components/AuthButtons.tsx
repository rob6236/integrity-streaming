// C:\Users\rcwoo\integrity-streaming\app\_components\ui\AuthButtons.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const navBtn =
    "!appearance-none !inline-flex !items-center !justify-center " +
    "!h-12 !min-w-[120px] !px-6 !rounded-full " +
    "!text-base !font-extrabold !leading-none " +
    "!bg-white !text-black !border-2 !border-[var(--gold)] " +
    "!shadow-none focus:!outline-none focus:!ring-0 hover:!brightness-95 transition";

  return (
    <div className="flex items-center gap-3">
      <Link href="/home" className={navBtn}>Home</Link>
      <Link href="/create" className={navBtn}>Create</Link>
      <button
        onClick={async () => {
          if (user) {
            await signOut(auth);
            setUser(null);
            router.push("/home");
          } else {
            router.push("/login");
          }
        }}
        className={navBtn}
      >
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}
