export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://investwithdiomin.today/</loc></url>
  <url><loc>https://investwithdiomin.today/about</loc></url>
  <url><loc>https://investwithdiomin.today/advisory</loc></url>
  <url><loc>https://investwithdiomin.today/real-estate</loc></url>
  <url><loc>https://investwithdiomin.today/fintech</loc></url>
  <url><loc>https://investwithdiomin.today/insights</loc></url>
  <url><loc>https://investwithdiomin.today/contact</loc></url>
  <url><loc>https://investwithdiomin.today/ask-stephanie-ai</loc></url>
</urlset>`;
  return new Response(xml, { headers: { "content-type": "application/xml" } });
}
