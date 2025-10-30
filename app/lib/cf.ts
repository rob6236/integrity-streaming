// lib/cf.ts
// Placeholder utilities for Cloudflare services (Workers AI, Stream, R2)

export const CF = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  apiToken: process.env.CLOUDFLARE_API_TOKEN || "",
};

// Example placeholder function we'll flesh out later
export async function callWorkersAI(_model: string, _payload: unknown) {
  throw new Error("callWorkersAI not implemented yet");
}
