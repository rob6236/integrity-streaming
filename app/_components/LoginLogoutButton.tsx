// C:\Users\rcwoo\integrity-streaming\app\components\LoginLogoutButton.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onIdTokenChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  className?: string;
};

export default function LoginLogoutButton({ className = "" }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1) Get whatever Firebase already knows right now (e.g., if you just logged in)
    setUser(auth.currentUser ?? null);

    // 2) Subscribe to auth token changes (more reliable than onAuthStateChanged)
    const unsub = onIdTokenChanged(auth, (u) => {
      setUser(u ?? null);
      setReady(true);
    });

    return () => unsub();
  }, []);

  const handleClick = async () => {
    if (user) {
      // Currently logged in → sign out, then refresh the UI
      await signOut(auth);
      setUser(null);       // instant UI flip
      router.replace("/home");
      router.refresh();
    } else {
      // Not logged in → go to login
      router.push("/login");
    }
  };

  // Avoid hydration mismatch: render a stable placeholder until we know the state
  if (!ready && !auth.currentUser) {
    return (
      <button type="button" className={className} disabled aria-disabled="true">
        Login
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={user ? "Logout" : "Login"}
    >
      {user ? "Logout" : "Login"}
    </button>
  );
}
