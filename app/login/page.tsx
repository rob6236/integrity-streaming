// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      setBusy(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push(next);
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md gold-outline p-6 bg-[#7B0F24] border border-[#FFD700] rounded-xl">
        <h1 className="text-2xl font-extrabold text-[#FFD700] mb-4">Log in</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              className="w-full"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              className="w-full"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-300 font-semibold">{error}</p>}

          <button type="submit" className="btn w-full" disabled={busy}>
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <Link href="/signup" className="underline text-[#FFD700] font-bold">
            Create an account
          </Link>
          <Link href="/forgot-password" className="underline text-[#FFD700] font-bold">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
}
