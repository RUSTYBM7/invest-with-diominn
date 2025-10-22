export async function GET(req: Request) {
  const url = new URL(req.url);
  const assets = (url.searchParams.get("assets") || "BTC,ETH,SPY").split(",");
  const prices = assets.map(a => ({ asset: a, price: "PLACEHOLDER", "24h": "PLACEHOLDER" }));
  return new Response(JSON.stringify({ ts: new Date().toISOString(), source: "aggregated", prices }), {
    headers: { "content-type": "application/json" }
  });
}
