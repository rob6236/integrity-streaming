// lib/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type Status = 'loading' | 'authed' | 'unauthed';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setStatus(u ? 'authed' : 'unauthed');
    });
    return () => unsub();
  }, []);

  return { user, status };
}
