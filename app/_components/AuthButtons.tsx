// app/_components/AuthButtons.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/useAuth';

export default function AuthButtons() {
  const router = useRouter();
  const { user, status } = useAuth();

  if (status === 'loading') return <div>Checking auth…</div>;
  if (!user) return <Link href="/login">Sign in</Link>;

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Link href="/studio">Go to Studio</Link>
      <button
        onClick={async () => { await signOut(auth); router.push('/home'); }}
        style={{ cursor: 'pointer' }}
      >
        Sign out
      </button>
    </div>
  );
}
