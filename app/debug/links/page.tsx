// app/debug/links/page.tsx
import Link from "next/link";

const items = [
  { href: "/",              label: "Landing ( / )" },
  { href: "/home",          label: "Home" },
  { href: "/login",         label: "Login" },
  { href: "/create",        label: "Create" },
  { href: "/forgot-password", label: "Forgot Password" },
  { href: "/profile",       label: "Profile" },
  { href: "/studio",        label: "Studio (if route exists)" },
];

export default function DebugLinks() {
  return (
    <main className="min-h-screen bg-[#7B0F24] text-white">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="is-title mb-4">Route Link Hub</h1>
        <p className="mb-6 opacity-90">
          Click any link to open that page. If a link 404s, that route doesn’t exist yet.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="gold-button-outline text-center py-3 rounded-xl"
            >
              {i.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 opacity-80 text-sm">
          <div className="mb-1">Quick direct URLs (copy/paste):</div>
          <ul className="list-disc pl-6 space-y-1">
            <li>http://localhost:3000/</li>
            <li>http://localhost:3000/home</li>
            <li>http://localhost:3000/login</li>
            <li>http://localhost:3000/create</li>
            <li>http://localhost:3000/forgot-password</li>
            <li>http://localhost:3000/profile</li>
            <li>http://localhost:3000/studio</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
