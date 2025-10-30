// app/api/debug/env/route.ts
function mask(v?: string | null) {
  if (!v) return null;
  const s = String(v);
  if (s.length <= 8) return "••••";
  return `${s.slice(0, 4)}…${s.slice(-4)}`;
}

export async function GET() {
  const env = process.env;

  return Response.json({
    CLOUDFLARE_ACCOUNT_ID: {
      present: !!env.CLOUDFLARE_ACCOUNT_ID,
      preview: mask(env.CLOUDFLARE_ACCOUNT_ID),
    },
    CLOUDFLARE_API_TOKEN: {
      present: !!env.CLOUDFLARE_API_TOKEN,
      preview: mask(env.CLOUDFLARE_API_TOKEN),
    },
    CLOUDFLARE_R2_ACCESS_KEY_ID: {
      present: !!env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      preview: mask(env.CLOUDFLARE_R2_ACCESS_KEY_ID),
    },
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: {
      present: !!env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      preview: mask(env.CLOUDFLARE_R2_SECRET_ACCESS_KEY),
    },
    CLOUDFLARE_R2_BUCKET: {
      present: !!env.CLOUDFLARE_R2_BUCKET,
      preview: env.CLOUDFLARE_R2_BUCKET || null, // bucket name isn't secret
    },
    CLOUDFLARE_R2_REGION: {
      present: !!env.CLOUDFLARE_R2_REGION,
      preview: env.CLOUDFLARE_R2_REGION || null,
    },
  });
}
