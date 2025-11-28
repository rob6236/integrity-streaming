// app/creator-studio/page.tsx

import Link from "next/link";

const GOLD = "#FFD700";
const BURGUNDY = "#7B0F24";

export default function CreatorStudioHome() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 12px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "720px",
        }}
      >
        <p
          style={{
            color: GOLD,
            fontSize: "1.6rem", // medium size
            fontWeight: 800,
            fontStyle: "italic",
            lineHeight: 1.5,
            marginBottom: "24px",
          }}
        >
          Welcome To Integrity Streaming Creator Studio Where You Give Life To
          Your Content Creations
        </p>

        <Link
          href="/creator-studio/projects/new"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: "999px",
            backgroundColor: GOLD,
            color: BURGUNDY,
            fontWeight: 800,
            fontSize: "1rem",
            textDecoration: "none",
            letterSpacing: "0.03em",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          Lets Start Creating Now
        </Link>
      </div>
    </div>
  );
}
