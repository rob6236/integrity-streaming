'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

const btn =
  "px-5 py-2 rounded-md border-[1.5px] border-[--gold] bg-white text-black font-semibold shadow-sm hover:shadow transition";

export default function CreateButton() {
  // If you have a loading state, you can use it, but we won’t block navigation
  const { /* user, loading */ } = useAuth();
  const router = useRouter();

  const go = () => {
    // Let the /creator-studio page enforce auth (via RequireAuth)
    router.push('/creator-studio');
  };

  return (
    <button className={btn} onClick={go}>
      Create
    </button>
  );
}
