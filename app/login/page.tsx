// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pwd);
      router.push('/home');
    } catch (e: any) {
      setErr(e?.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen bg-[#7B0F24] text-white grid place-items-center py-10"
      style={{ paddingLeft: '1in', paddingRight: '1in' }}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#FFD700] p-6 sm:p-8"
        style={{
          boxShadow: '0 0 0 1px rgba(255,215,0,.6), 0 0 10px rgba(255,215,0,.18)',
          minHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div className="text-center">
          <div className="is-title text-[30px] sm:text-[38px] leading-none">
            Integrity Streaming
          </div>
          <p className="text-white/85 text-sm mt-3">Welcome back. Please sign in.</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5 px-1">
          <label className="block">
            <span className="text-sm">Email</span>
            <div className="is-field">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="is-input"
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <div className="is-field is-input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="is-input"
                placeholder="••••••••"
                autoComplete="current-password"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="gold-button-outline is-tog"
                aria-label="Toggle password visibility"
              >
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {err && (
            <div className="rounded-lg border border-red-400 bg-red-900/30 text-red-200 text-sm p-3">
              {err}
            </div>
          )}

          <button type="submit" className="gold-button w-full rounded-xl py-3" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm px-5 py-3">
            <Link href="/forgot-password" className="underline text-[#FFD700] hover:opacity-90">
              Forgot password?
            </Link>
            <Link href="/signup" className="underline text-[#FFD700] hover:opacity-90">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
