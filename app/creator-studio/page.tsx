// app/creator-studio/page.tsx

const GOLD = "#FFD700";

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
      <p
        style={{
          color: GOLD,
          fontSize: "1.6rem", // medium size
          fontWeight: 800,
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: "720px",
          lineHeight: 1.5,
        }}
      >
        Welcome To Integrity Streaming Creator Studio Where You Give Life To Your
        Content Creations
      </p>
    </div>
  );
}
