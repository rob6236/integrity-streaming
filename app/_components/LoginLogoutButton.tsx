"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 18px",
  borderRadius: 999,
  border: "2px solid #FFD700", // gold
  background: "#7B0F24", // burgundy
  color: "#FFFFFF", // white text
  fontWeight: 800,
  fontSize: 14,
  lineHeight: 1,
  textDecoration: "none",
  boxShadow:
    "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export default function LoginLogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Watch auth state without react-firebase-hooks
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  // LOGOUT pill (when signed in)
  if (isLoggedIn) {
    return (
      <button
        type="button"
        style={pillStyle}
        onClick={async () => {
          try {
            await signOut(auth);
            router.push("/home");
          } catch (err) {
            console.error("Error signing out", err);
          }
        }}
      >
        Logout
      </button>
    );
  }

  // LOGIN pill (when signed out)
  return (
    <button
      type="button"
      style={pillStyle}
      onClick={() => router.push("/login")}
    >
      Login
    </button>
  );
}
