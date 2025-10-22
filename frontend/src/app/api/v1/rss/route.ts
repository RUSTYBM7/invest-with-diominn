export async function GET() {
  const rss = `<?xml version="1.0"?>
<rss version="2.0"><channel>
<title>Invest With Diomin — Insights</title>
<link>https://investwithdiomin.today/insights</link>
<description>Insights and updates</description>
</channel></rss>`;
  return new Response(rss, { headers: { "content-type": "application/rss+xml" } });
}
