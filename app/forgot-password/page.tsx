// C:\Users\rcwoo\integrity-streaming\app\forgot-password\page.tsx
"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      setError("Could not send reset email. Please check the address.");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#7B0F24] text-white border-2 border-[#FFD700]">
      <div
        className="rounded-2xl border-2 border-[#FFD700] bg-[#7B0F24] shadow-lg"
        style={{
          width: "800px",
          paddingLeft: "1in",
          paddingRight: "1in",
          paddingBottom: "1in",
        }}
      >
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-[#FFD700] mb-4">
            Reset your password
          </h1>
          <p className="mb-6 text-sm">
            Enter your email and we’ll send a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-[#FFD700] p-2 text-black"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            )}
            {sent && (
              <p className="text-green-300 text-sm font-semibold">
                Reset email sent — check your inbox.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md border-2 border-[#FFD700] bg-white text-black font-bold py-2 hover:bg-gray-100"
            >
              Send reset email
            </button>
          </form>

          {/* Only change: force gap below the Send button */}
          <div
            className="flex justify-between text-sm"
            style={{ marginTop: "24px" }}
          >
            <Link
              href="/login"
              className="text-black bg-white px-3 py-2 rounded-xl font-extrabold border-2 border-[#FFD700]"
            >
              ← Back to login
            </Link>
            <Link href="/signup" className="text-[#FFD700] font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
