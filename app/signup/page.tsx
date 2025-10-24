// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setBusy(true);
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Save display name so it can be shown on profile pages later
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
      }
      // Go to home (or /profile if you prefer)
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Sign up failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md gold-outline p-6 bg-[#7B0F24] border border-[#FFD700] rounded-xl">
        <h1 className="text-2xl font-extrabold text-[#FFD700] mb-4">Create your account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name *</label>
            <input
              className="w-full"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email *</label>
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
            <label className="block mb-1 font-semibold">Password *</label>
            <input
              className="w-full"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="text-red-300 font-semibold">{error}</p>
          )}

          <button type="submit" className="btn w-full" disabled={busy}>
            {busy ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline text-[#FFD700] font-bold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
