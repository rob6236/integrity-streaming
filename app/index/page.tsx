// app/page.tsx
"use client";

import Link from "next/link";

export default function PageIndex() {
  const pages = [
    { path: "/home", label: "🏠 Home" },
    { path: "/login", label: "🔑 Login" },
    { path: "/signup", label: "📝 Signup" },
    { path: "/forgot-password", label: "🔁 Forgot Password" },
    { path: "/reset", label: "🔒 Reset Password" },
    { path: "/profile", label: "👤 Profile" },
    { path: "/studio", label: "🎬 Studio (Upload Page)" },
  ];

  return (
    <main className="min-h-screen bg-[#7B0F24] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg border border-[#FFD700] rounded-2xl bg-[#8A1128] p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h1 className="text-3xl font-extrabold text-[#FFD700] mb-6">
          Integrity Streaming — Local Test Links
        </h1>
        <p className="text-white/90 mb-6">
          Click below to open each page on your local development server.
        </p>
        <ul className="space-y-3">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="block w-full rounded-lg border border-[#FFD700] bg-white py-2 text-black font-semibold hover:bg-[#fff3c4] transition"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <footer className="text-[#FFD700] mt-6 text-sm opacity-80">
        Running on <code>http://localhost:3000</code>
      </footer>
    </main>
  );
}
