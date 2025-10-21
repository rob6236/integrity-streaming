// app/_components/RequireAuth.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { status, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !user) router.replace('/login');
  }, [status, user, router]);

  if (status === 'loading') return <div>Checking your session…</div>;
  if (!user) return null;

  return <>{children}</>;
}
