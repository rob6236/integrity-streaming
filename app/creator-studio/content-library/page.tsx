// app/creator-studio/content-library/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";

/* Tiny placeholder card */
function PlaceholderCard({ kind }: { kind: "video" | "short" }) {
  const ratioStyle =
    kind === "short" ? { paddingTop: "177.78%" } : { paddingTop: "56.25%" }; // 9:16 vs 16:9

  return (
    <div className="w-[160px] shrink-0">
      {/* Thumb box */}
      <div
        className="relative overflow-hidden rounded-lg border border-[var(--gold,#FFD700)]/55 bg-black/25"
        style={ratioStyle}
      >
        <div className="absolute inset-0">
          {/* Placeholder stripes */}
          <div className="h-full w-full animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
        </div>
        {/* Corner badge */}
        <div className="absolute bottom-2 right-2 rounded-full border border-black/40 bg-black/65 px-2 py-[2px] text-[10px] font-semibold text-white">
          {kind === "short" ? "0:15" : "0:42"}
        </div>
      </div>

      {/* Title line */}
      <div className="mt-2 h-3.5 w-[90%] rounded bg-white/30" />
      {/* Meta line */}
      <div className="mt-1 h-3 w-[65%] rounded bg-white/20" />
    </div>
  );
}

/* Section row with title + horizontal scroller */
function RowSection({
  title,
  kind,
  count = 12,
}: {
  title: string;
  kind: "video" | "short";
  count?: number;
}) {
  return (
    <section className="mx-auto mb-8 w-full max-w-[1200px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-white">{title}</h2>
        <Link
          href="/creator-studio/upload"
          className="rounded-full border border-[var(--gold,#FFD700)] bg-[var(--gold,#FFD700)] px-3 py-1 text-xs font-semibold text-[#7B0F24] hover:brightness-95"
        >
          Upload
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--gold,#FFD700)]/70 bg-black/20 p-3">
        <div className="flex snap-x gap-3 overflow-x-auto pb-1">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="snap-start">
              <PlaceholderCard kind={kind} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContentLibraryPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUserEmail(u.email ?? null);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, [router]);

  if (checkingAuth) return <div className="p-6 text-white/90">Checking your session…</div>;

  return (
    <div className="p-6">
      {/* Header centered */}
      <div className="mb-5 grid grid-cols-3 items-center">
        <div />
        <h1 className="text-center text-2xl font-semibold text-white">Content Library</h1>
        <div className="text-right text-sm text-white/70">Signed in as {userEmail ?? "unknown"}</div>
      </div>

      {/* Two simple rows of small placeholders */}
      <div className="rounded-2xl border border-[var(--gold,#FFD700)]/80 bg-black/15 p-0 shadow-[0_0_0_1px_rgba(255,215,0,0.4)]">
        <div className="p-5 md:p-6">
          <RowSection title="Videos (16:9)" kind="video" count={14} />
          <RowSection title="Shorts (9:16)" kind="short" count={18} />
        </div>
      </div>
    </div>
  );
}
