// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Integrity Streaming",
  description: "Creator-first video platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Gold page frame around the viewport */}
        <div className="page-frame" />
        {children}
      </body>
    </html>
  );
}
