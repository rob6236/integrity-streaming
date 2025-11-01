// app/creator-studio/billing/page.tsx
"use client";

import { useState } from "react";
import BillingOverview from "./_components/BillingOverview";
import InvoicesTable from "./_components/InvoicesTable";
import PaymentMethodsTable from "./_components/PaymentMethodsTable";
import UpgradePlanCard from "./_components/UpgradePlanCard";

const burgundy = "#7B0F24";
const gold = "#FFD700";

export default function BillingPage() {
  // ---------- Mock data (wire to Stripe later) ----------
  const [currentPlan, setCurrentPlan] = useState("Creator");
  const stats = [
    { label: "Current plan", value: "Creator", sub: "$15 / month" },
    { label: "Next charge", value: "$15.00", sub: "Nov 30, 2025" },
    { label: "Payment method", value: "Visa •••• 4242" },
    { label: "Invoices", value: "12 total", sub: "All paid" },
  ];

  const invoices = [
    { id: "inv_00012", date: "Oct 30, 2025", amount: 1500, status: "paid" as const },
    { id: "inv_00011", date: "Sep 30, 2025", amount: 1500, status: "paid" as const },
    { id: "inv_00010", date: "Aug 30, 2025", amount: 1500, status: "paid" as const },
  ];

  const methods = [
    { id: "pm_1", brand: "Visa", last4: "4242", expMonth: 12, expYear: 2030, isDefault: true },
    { id: "pm_2", brand: "Mastercard", last4: "4444", expMonth: 5, expYear: 2028 },
  ];

  const plans = [
    { name: "Creator", price: "$15/mo", features: ["Upload & Host Videos", "Creator Studio tools", "Basic analytics"] },
    { name: "Creator Plus", price: "$29/mo", features: ["Everything in Creator", "Advanced analytics", "AI thumbnail generator"] },
    { name: "Pro", price: "$59/mo", features: ["Everything in Plus", "Priority processing", "Team seats (3)"] },
  ];

  // ---------- Placeholder handlers ----------
  const handleSelectPlan = (planName: string) => {
    setCurrentPlan(planName);
    alert(`(Demo) Selected plan: ${planName}. Wire to Stripe Checkout/Customer Portal next.`);
  };

  const handleAddMethod = () => {
    alert("(Demo) Add payment method — open Stripe SetupIntent form.");
  };

  const handleMakeDefault = (id: string) => {
    alert(`(Demo) Make default payment method: ${id}`);
  };

  const handleRemoveMethod = (id: string) => {
    alert(`(Demo) Remove payment method: ${id}`);
  };

  return (
    <div
      className="min-h-[100dvh] w-full"
      style={{ background: burgundy, color: "#FFF", border: `1px solid ${gold}` }}
    >
      {/* thin gold line across the top for brand frame */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-8 pb-20" style={{ borderTop: `1px solid ${gold}` }}>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Creator Studio • Billing</h1>

        {/* Overview cards */}
        <BillingOverview stats={stats} />

        {/* Upgrade / Change plan */}
        <UpgradePlanCard currentPlan={currentPlan} plans={plans} onSelect={handleSelectPlan} />

        {/* Payment methods */}
        <PaymentMethodsTable
          methods={methods}
          onAdd={handleAddMethod}
          onMakeDefault={handleMakeDefault}
          onRemove={handleRemoveMethod}
        />

        {/* Invoices */}
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
}
