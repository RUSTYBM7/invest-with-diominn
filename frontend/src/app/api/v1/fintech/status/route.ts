export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    timestamp: new Date().toISOString(),
    services: { xcloudmultixpro: "online", orbitsync: "nominal" }
  }), { headers: { "content-type": "application/json" } });
}
