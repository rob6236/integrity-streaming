// C:\Users\rcwoo\integrity-streaming\app\signup\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      router.push("/home");
    } catch (err: any) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#7B0F24] text-white border-2 border-[#FFD700]">
      <div
        className="w-full max-w-md rounded-2xl border-2 border-[#FFD700] bg-[#7B0F24]"
        style={{
          paddingLeft: "1in",
          paddingRight: "1in",
          paddingBottom: "1in", // <-- added space under the button before the gold line
        }}
      >
        <h1 className="text-3xl font-bold text-[#FFD700] mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-[#FFD700] p-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-[#FFD700] p-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-[#FFD700] p-2 text-black"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md border-2 border-[#FFD700] bg-white text-black font-bold py-2 hover:bg-gray-100"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <Link href="/login" className="text-[#FFD700] font-semibold">
            Already have an account?
          </Link>
        </div>
      </div>
    </main>
  );
}
