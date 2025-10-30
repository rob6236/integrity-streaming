// app/api/ai/thumbnail/route.ts
// Placeholder: will call Cloudflare Workers AI later.

export const runtime = "nodejs"; // or "edge" later if desired

export async function POST(req: Request) {
  return new Response(JSON.stringify({ ok: true, message: "AI thumbnail endpoint placeholder" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
