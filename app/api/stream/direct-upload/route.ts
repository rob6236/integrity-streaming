// app/api/stream/direct-upload/route.ts
export async function POST() {
  return new Response(JSON.stringify({ ok: true, message: "Stream direct-upload placeholder" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
