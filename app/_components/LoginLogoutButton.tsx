"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth"; // <-- named import

const btn =
  "px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all";

export default function LoginLogoutButton() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <button className={btn} aria-busy="true" aria-label="Loading">
        …
      </button>
    );
  }

  if (user) {
    return (
      <button
        className={btn}
        onClick={async () => {
          try {
            await signOut(auth);
          } finally {
            router.refresh(); // update header immediately
          }
        }}
      >
        Logout
      </button>
    );
  }

  return (
    <button className={btn} onClick={() => router.push("/login")}>
      Login
    </button>
  );
}
