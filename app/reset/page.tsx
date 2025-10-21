// app/reset/page.tsx
'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setErr(null);
    try { await sendPasswordResetEmail(auth, email.trim()); setMsg('If that email exists, a reset link was sent.'); }
    catch (e: any) { setErr(e?.message ?? 'Could not send reset email'); }
  }

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '32px 16px' }}>
      <h1>Reset password</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)}
               required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <button style={{ padding: '10px 14px', border: 'none', borderRadius: 8, background: '#7B0F24', color: '#fff', cursor: 'pointer' }}>
          Send reset link
        </button>
      </form>
      {msg && <div style={{ color: 'green', marginTop: 8 }}>{msg}</div>}
      {err && <div style={{ color: 'crimson', marginTop: 8 }}>{err}</div>}
      <div style={{ marginTop: 12 }}>
        <Link href="/login">Back to login</Link>
      </div>
    </main>
  );
}
