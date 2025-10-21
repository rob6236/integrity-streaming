// app/signup/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "@/lib/firebase";

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

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const prefill = params.get("email") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(prefill);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name.trim()) {
      setErr("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth(app);
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // 1) Set displayName on Firebase Auth profile
      await updateProfile(cred.user, { displayName: name.trim() });

      // 2) Create/overwrite a user doc so profile pages can read it
      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          name: name.trim(),
          email: email.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/home");
    } catch (error: any) {
      const code: string = error?.code || "";
      if (code === "auth/email-already-in-use") {
        setErr("An account already exists for this email. Try logging in.");
      } else if (code === "auth/weak-password") {
        setErr("Password should be at least 6 characters.");
      } else if (code === "auth/invalid-email") {
        setErr("Please enter a valid email address.");
      } else {
        setErr("Sign up failed. Please try again.");
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
          <div
            style={{
              width: 90,
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
                objectFit: "contain",
                objectPosition: "center",
                transform: "scale(1.28)",
                transformOrigin: "center",
                display: "block",
              }}
            />
          </div>

          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 6 }}>
              Create your account
            </h1>
            <p style={{ opacity: 0.92, fontSize: 15 }}>Email & password only.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, opacity: 0.95 }}>
                Name <span style={{ color: gold }}>*</span>
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
              />
            </div>

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
                placeholder="At least 6 characters"
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
              {loading ? "Creating…" : "Register"}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              gap: 12,
            }}
          >
            <span style={{ fontSize: 14, opacity: 0.85 }}>
              Already have an account?
            </span>
            <Link
              href="/login"
              className="gold-button-outline"
              style={{ padding: "8px 12px", borderRadius: 10 }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
