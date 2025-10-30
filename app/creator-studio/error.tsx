"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log to console (or send to your logging service)
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#7B0F24] text-white flex items-center justify-center p-6">
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          border: "1px solid #FFD700",
          boxShadow:
            "0 0 0 1px rgba(255,215,0,0.45) inset, 0 0 18px rgba(255,215,0,0.18)",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.14))",
        }}
      >
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="opacity-90 mb-4">
          Try again. If it keeps happening, go back to the homepage.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-xl font-medium text-black"
            style={{
              backgroundColor: "#FFD700",
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.8) inset, 0 0 10px rgba(255,215,0,0.35)",
            }}
          >
            Retry
          </button>

          <a
            href="/"
            className="px-4 py-2 rounded-xl"
            style={{
              border: "1px solid #FFD700",
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.45) inset, 0 0 10px rgba(255,215,0,0.18)",
            }}
          >
            Home
          </a>
        </div>

        <pre className="mt-4 text-xs opacity-70 overflow-auto max-h-40">
{error?.message}
        </pre>
      </div>
    </div>
  );
}
