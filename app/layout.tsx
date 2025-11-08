// app/layout.tsx
import type { ReactNode } from "react";
import SmileyOverlay from "./_components/SmileyOverlay"; // <-- uses the file you created
import "./globals.css"; // keep if you already have global styles

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Global smileys on every page */}
        <SmileyOverlay />

        {/* Your app content */}
        {children}
      </body>
    </html>
  );
}
