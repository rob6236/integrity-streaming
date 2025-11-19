// app/creator-studio/billing/page.tsx

import BillingOverview from "./_components/BillingOverview";
import UpgradePlanCard from "./_components/UpgradePlanCard";
import PaymentMethodsTable from "./_components/PaymentMethodsTable";
import InvoicesTable from "./_components/InvoicesTable";
import { mockBillingSummary } from "./_components/billingData";
import Link from "next/link";

const GOLD = "#FFD700";

export default function BillingPage() {
  const summary = mockBillingSummary;

  return (
    <div
      style={{
        padding: "32px 24px 40px",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Page title + breadcrumb tabs */}
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: GOLD,
              marginBottom: 4,
            }}
          >
            Billing
          </h1>
          <div style={{ display: "flex", gap: 16, fontSize: 16 }}>
            <span style={{ fontWeight: 700, textDecoration: "underline" }}>
              Dashboard
            </span>
            <Link
              href="/creator-studio/settings"
              style={{
                fontWeight: 600,
                textDecoration: "none",
                color: "white",
                opacity: 0.9,
              }}
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Overview box */}
        <BillingOverview summary={summary} />

        {/* Three-card row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <UpgradePlanCard plan={summary.plan} />
          <PaymentMethodsTable paymentMethod={summary.paymentMethod} />
          <InvoicesTable invoices={summary.invoices} />
        </div>
      </div>
    </div>
  );
}
