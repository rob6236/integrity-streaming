// app/api/stream/webhook/route.ts
export async function POST() {
  // We'll verify Cloudflare signature and handle events later
  return new Response("OK", { status: 200 });
}
