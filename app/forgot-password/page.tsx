// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
// If "@/lib/firebase" doesn't work for your tsconfig, change to:  "../lib/firebase"
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSent(false);

    try {
      setBusy(true);
      await sendPasswordResetEmail(auth, email.trim(), {
        url: "http://localhost:3000/reset",
        handleCodeInApp: true,
      });
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Could not send reset email. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    // Full-screen center
    <div className="min-h-screen grid place-items-center bg-[#7B0F24]">
      {/* SQUARE, centered, equal padding on all sides */}
      <div className="w-[420px] aspect-square rounded-2xl border border-[#FFD700] bg-[#8A1128] shadow-[0_8px_30px_rgba(0,0,0,0.35)] p-6 flex flex-col">
        {/* Content uses equal spacing inside the square */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-extrabold text-[#FFD700]">Reset your password</h1>
          <p className="text-white/85 text-sm mt-1">
            Enter your email and we’ll send a reset link.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-3">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#FFD700] bg-black/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-400/60 bg-red-500/15 px-3 py-2 text-red-200 text-sm font-semibold">
              {error}
            </div>
          )}
          {sent && (
            <div className="rounded-md border border-emerald-400/60 bg-emerald-500/15 px-3 py-2 text-emerald-200 text-sm font-semibold">
              If an account exists for <span className="underline">{email}</span>, a reset link has been sent.
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-auto w-full inline-flex items-center justify-center rounded-lg border border-[#FFD700] bg-white px-4 py-2.5 text-[16px] font-extrabold text-black shadow-sm transition hover:bg-[#fff3c4] disabled:opacity-75"
          >
            {busy ? "Sending…" : "Send reset email"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-[#FFD700] bg-white px-3.5 py-2 text-[14px] font-bold text-black shadow-sm transition hover:bg-[#fff3c4]"
          >
            ← Back to login
          </Link>
          <Link href="/signup" className="text-[#FFD700] underline font-bold text-sm">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
