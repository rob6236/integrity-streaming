// app/creator-studio/billing/_components/billingData.ts

export type BillingPlan = {
  id: string;
  name: string;
  pricePerMonth: number;
  currency: string;
  status: "trialing" | "active" | "canceled";
  renewsOn?: string; // e.g. "Dec 31, 2025"
};

export type PaymentMethod = {
  id: string;
  brand: string; // e.g. "Visa"
  last4: string;
  expMonth: number;
  expYear: number;
};

export type Invoice = {
  id: string;
  date: string; // human-readable for now
  amount: number;
  currency: string;
  status: "paid" | "open" | "void" | "uncollectible";
  downloadUrl?: string;
};

export type BillingSummary = {
  plan: BillingPlan;
  paymentMethod?: PaymentMethod;
  invoices: Invoice[];
};

// 🔹 Mock data for now (UI-only). Later we can replace this with real Stripe data.
export const mockBillingSummary: BillingSummary = {
  plan: {
    id: "creator-basic",
    name: "Creator",
    pricePerMonth: 0,
    currency: "USD",
    status: "trialing",
    renewsOn: "TBD",
  },
  paymentMethod: {
    id: "pm_4242",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2030,
  },
  invoices: [],
};
