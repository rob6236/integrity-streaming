'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (pwd !== pwd2) {
      setErr('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pwd);
      router.push('/home');
    } catch (e: any) {
      setErr(e?.message ?? 'Signup failed. Please try again.');
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
          <p className="text-white/85 text-sm mt-3">Create your account.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5 px-1">
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
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <div className="is-field is-input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                minLength={8}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="is-input"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="gold-button-outline is-tog"
              >
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-sm">Confirm password</span>
            <div className="is-field">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                minLength={8}
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                className="is-input"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </div>
          </label>

          {err && (
            <div className="rounded-lg border border-red-400 bg-red-900/30 text-red-200 text-sm p-3">
              {err}
            </div>
          )}

          <button type="submit" className="gold-button w-full rounded-xl py-3" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm px-5 py-3">
            <Link href="/login" className="underline text-[#FFD700] hover:opacity-90">
              Already have an account? Login
            </Link>
            <Link href="/forgot-password" className="underline text-[#FFD700] hover:opacity-90">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
