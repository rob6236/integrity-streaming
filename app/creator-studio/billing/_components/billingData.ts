// app/creator-studio/billing/_components/billingData.ts

export const GOLD = "#FFD700";

export type BillingPlan = {
  name: string;
  priceLabel: string;   // e.g. "$0 / mo"
  statusLabel: string;  // e.g. "trialing"
};

export type PaymentMethod = {
  brand: string;        // e.g. "Visa"
  last4: string;        // e.g. "4242"
  expMonth: number;     // e.g. 12
  expYear: number;      // e.g. 2030
};

export type Invoice = {
  id: string;
  dateLabel: string;    // e.g. "Nov 1, 2025"
  amountLabel: string;  // e.g. "$29.00"
  statusLabel: string;  // e.g. "Paid"
};

export type BillingSummary = {
  plan: BillingPlan;
  paymentMethod: PaymentMethod;
  invoices: Invoice[];
};

export const mockBillingSummary: BillingSummary = {
  plan: {
    name: "Creator",
    priceLabel: "$0 / mo",
    statusLabel: "trialing",
  },
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2030,
  },
  invoices: [
    {
      id: "inv_001",
      dateLabel: "Nov 1, 2025",
      amountLabel: "$0.00",
      statusLabel: "Trial",
    },
  ],
};
