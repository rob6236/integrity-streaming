"use client";

export default function StatusFooter({ text = "Ready" }: { text?: string }) {
  return (
    <footer className="mt-6 rounded-2xl border border-yellow-400 px-3 py-2 text-[rgba(255,255,255,0.85)]">
      {text}
    </footer>
  );
}
