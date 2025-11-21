// app/layout.tsx
import type { ReactNode } from "react";
import SmileyOverlay from "./_components/SmileyOverlay";
import "./globals.css";

// This is the <meta name="viewport" ...> equivalent for the App Router
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Integrity Streaming",
  description: "Creator-first video platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Global smileys on every page */}
        <SmileyOverlay />

        {/* All page content sits inside the burgundy background + gold border */}
        {children}
      </body>
    </html>
  );
}
