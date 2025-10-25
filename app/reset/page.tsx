'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const oobCode = params.get('oobCode') ?? '';

  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const canSubmit = useMemo(() => pwd.length >= 8 && pwd === pwd2, [pwd, pwd2]);

  useMemo(() => {
    async function verifyCode() {
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setVerified(true);
      } catch {
        setErr('Invalid or expired reset link.');
        setVerified(false);
      }
    }
    if (!oobCode) {
      setErr('Missing reset code.');
      setVerified(false);
      return;
    }
    verifyCode();
  }, [oobCode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setErr(null);
    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, pwd);
      router.push('/login');
    } catch (e: any) {
      setErr(e?.message ?? 'Unable to reset password.');
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
          <p className="text-white/85 text-sm mt-3">Choose a new password.</p>
        </div>

        {verified === false && (
          <div className="rounded-lg border border-red-400 bg-red-900/30 text-red-200 text-sm p-3">
            {err ?? 'Invalid or expired reset link.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 px-1">
          <label className="block">
            <span className="text-sm">New password</span>
            <div className="is-field is-input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="is-input"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
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
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                className="is-input"
                placeholder="Repeat password"
                autoComplete="new-password"
                minLength={8}
              />
            </div>
          </label>

          {err && verified !== false && (
            <div className="rounded-lg border border-red-400 bg-red-900/30 text-red-200 text-sm p-3">
              {err}
            </div>
          )}

          <button
            type="submit"
            className="gold-button w-full rounded-xl py-3 disabled:opacity-60"
            disabled={loading || verified !== true || !canSubmit}
          >
            {loading ? 'Updating…' : 'Reset password'}
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
