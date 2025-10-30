// app/creator-studio/page.tsx
/* Server Component (no hooks) */

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type CardProps = {
  title: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

function Card({ title, children, style }: CardProps) {
  return (
    <div
      style={{
        border: `1px solid ${GOLD}`,
        borderRadius: 10,
        boxShadow: `0 0 0 1px rgba(255,215,0,.6), inset 0 0 18px rgba(255,215,0,.12)`,
        background: `linear-gradient(180deg, ${BURGUNDY} 0%, #6b0c1f 100%)`,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Title row—CENTERED per request */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 44,
          padding: "6px 10px",
          borderBottom: `1px solid ${GOLD}`,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: 800,
            letterSpacing: 0.2,
            textAlign: "center",
            // helps keep the text visually centered even with different card widths
            width: "100%",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}

export default function CreatorStudioHome() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 20,
      }}
    >
      {/* Left column */}
      <div style={{ display: "grid", gap: 20 }}>
        <Card title="Overview" style={{ minHeight: 320 }}>
          {/* placeholder */}
          <div style={{ height: 260 }} />
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <Card title="Views" style={{ minHeight: 120 }}>
            <div style={{ height: 70 }} />
          </Card>
          <Card title="Watch Time" style={{ minHeight: 120 }}>
            <div style={{ height: 70 }} />
          </Card>
          <Card title="Recent Uploads" style={{ minHeight: 120 }}>
            <div style={{ height: 70 }} />
          </Card>
          <Card title="Notifications / Activity" style={{ minHeight: 120 }}>
            <div style={{ height: 70 }} />
          </Card>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: "grid", gap: 20 }}>
        <Card title="Traffic Sources" style={{ minHeight: 320 }}>
          {/* simple pie placeholder */}
          <div
            style={{
              margin: "18px auto",
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: `12px solid ${GOLD}`,
              boxShadow:
                "inset 0 0 0 24px rgba(0,0,0,.35), 0 0 22px rgba(255,215,0,.25)",
              background: BURGUNDY,
            }}
          />
        </Card>

        <Card title="Revenue" style={{ minHeight: 120 }}>
          <div style={{ height: 70 }} />
        </Card>

        <Card title="AI Insights & Suggestions" style={{ minHeight: 120 }}>
          <div style={{ height: 70 }} />
        </Card>
      </div>
    </div>
  );
}
