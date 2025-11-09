"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Logged in as:", cred.user.uid);
      router.push("/creator-studio/upload"); // or /home if you prefer
    } catch (e: any) {
      console.error("Login error:", e?.code, e?.message);
      // Show the exact Firebase error code so we know what's wrong
      setErr(e?.code || "auth/unknown-error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#7B0F24" }}>
      <div className="w-full max-w-xl border-4" style={{ borderColor: "#FFD700", borderRadius: 16, padding: 24 }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#FFD700" }}>Log in</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" style={{ color: "#FFD700" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded"
              style={{ background: "#fff" }}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1" style={{ color: "#FFD700" }}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded"
              style={{ background: "#fff" }}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {err && (
            <p className="mt-2" style={{ color: "#FFD700", background: "rgba(0,0,0,0.3)", padding: 8, borderRadius: 8 }}>
              {err}
            </p>
          )}

          <button
            type="submit"
            className="w-full font-semibold py-2 rounded"
            style={{ background: "#FFD700", color: "#000" }}
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <a href="/signup" style={{ color: "#FFD700", textDecoration: "underline" }}>Create an account</a>
          <a href="/forgot-password" style={{ color: "#FFD700", textDecoration: "underline" }}>Forgot password?</a>
        </div>
      </div>
    </div>
  );
}
