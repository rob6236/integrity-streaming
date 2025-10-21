// app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

/* ---- Theme helpers ---- */
const gold = "rgba(255,215,0,0.90)";
const goldSoft = "rgba(255,215,0,0.65)";
const ivory = "#FFF9F0";

const cardStyle: React.CSSProperties = {
  backdropFilter: "blur(4px)",
  background: "linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.28))",
  borderRadius: 16,
  border: `1px solid ${gold}`,
  boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 16px rgba(255,215,0,0.25)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: `1px solid ${gold}`,
  padding: "12px 14px",
  outline: "none",
  background: "rgba(0,0,0,0.25)",
  color: ivory,
  boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
};

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const prefill = params.get("email") ?? "";

  const [email, setEmail] = useState(prefill);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/home");
    } catch (error: any) {
      const code: string = error?.code || "";
      if (code === "auth/user-not-found") {
        router.push(`/signup?email=${encodeURIComponent(email.trim())}`);
        return;
      }
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setErr("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setErr("Too many attempts. Please try again later.");
      } else {
        setErr("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="px-4"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div style={{ ...cardStyle, width: "100%", maxWidth: 560 }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            columnGap: 16,
            padding: "22px 22px 12px 22px",
            borderBottom: `1px solid ${goldSoft}`,
          }}
        >
          {/* BIGGER white box + logo */}
          <div
            style={{
              width: 90,               // bigger white background
              height: 90,
              borderRadius: 14,
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="/logo.png"
              alt="Integrity Streaming"
              fill
              sizes="90px"
              priority
              style={{
                objectFit: "contain",  // keep full logo visible
                objectPosition: "center",
                transform: "scale(1.28)", // gentle zoom so logo reads clearly
                transformOrigin: "center",
                display: "block",
              }}
            />
          </div>

          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 6 }}>
              Login
            </h1>
            <p style={{ opacity: 0.92, fontSize: 15 }}>
              Use your email and password.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, opacity: 0.95 }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, opacity: 0.95 }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {err && (
              <div
                role="alert"
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(255,107,107,0.65)",
                  background: "rgba(255,0,0,0.10)",
                  padding: "10px 12px",
                  fontSize: 14,
                  color: "#ffd1d1",
                }}
              >
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="gold-button"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </div>

          {/* Footer links */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              gap: 12,
            }}
          >
            <span style={{ fontSize: 14, opacity: 0.85 }}>New here?</span>
            <Link
              href={`/signup?email=${encodeURIComponent(email)}`}
              className="gold-button-outline"
              style={{ padding: "8px 12px", borderRadius: 10 }}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
