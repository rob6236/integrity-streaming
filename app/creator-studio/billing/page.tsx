// app/creator-studio/billing/page.tsx
"use client";

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
    <>
      <div
        className="billing-root"
        style={{
          padding: "32px 24px 40px",
          color: "white",
        }}
      >
        <div
          className="billing-shell"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* HEADER: Billing + Dashboard + Settings, centered */}
          <div className="billing-header">
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

            <div className="billing-tabs">
              <Link
                href="/creator-studio/dashboard"
                style={{
                  fontWeight: 700,
                  textDecoration: "underline",
                  color: "white",
                }}
              >
                Dashboard
              </Link>
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

          {/* TOP BOX */}
          <section className="billing-box-wrap">
            <BillingOverview summary={summary} />
          </section>

          {/* BOTTOM THREE BOXES */}
          <div
            className="billing-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <section className="billing-box-wrap">
              <UpgradePlanCard plan={summary.plan} />
            </section>
            <section className="billing-box-wrap">
              <PaymentMethodsTable paymentMethod={summary.paymentMethod} />
            </section>
            <section className="billing-box-wrap">
              <InvoicesTable invoices={summary.invoices} />
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Center the header text + tabs on ALL breakpoints */
        .billing-header {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .billing-tabs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 16px;
        }

        /* Existing mobile tweaks for the boxes, if you’re using them */
        @media (max-width: 639px) {
          .billing-root {
            padding: 24px 8px 32px;
            overflow-x: hidden;
          }

          .billing-shell {
            max-width: 100%;
            margin: 0 auto;
          }

          .billing-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
          }

          .billing-box-wrap {
            width: 90%;
            max-width: 320px;
            margin: 0 auto 12px auto;
          }

          .billing-box-wrap > :global(*) {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }

          .billing-box-wrap :global(*) {
            font-size: 0.9rem;
            line-height: 1.35;
          }

          .billing-box-wrap :global(h2),
          .billing-box-wrap :global(h3) {
            font-size: 1.05rem;
          }

          .billing-box-wrap :global(button) {
            padding: 8px 18px;
          }
        }
      `}</style>
    </>
  );
}
