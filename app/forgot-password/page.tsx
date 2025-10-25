'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to send reset email.');
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
          <p className="text-white/85 text-sm mt-3">
            Forgot your password? We’ll email you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-1">
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

          {err && (
            <div className="rounded-lg border border-red-400 bg-red-900/30 text-red-200 text-sm p-3">
              {err}
            </div>
          )}
          {sent && (
            <div className="rounded-lg border border-emerald-400 bg-emerald-900/30 text-emerald-200 text-sm p-3">
              Reset email sent! Check your inbox for further instructions.
            </div>
          )}

          <button type="submit" className="gold-button w-full rounded-xl py-3" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm px-5 py-3">
            <Link href="/login" className="underline text-[#FFD700] hover:opacity-90">
              Back to login
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
