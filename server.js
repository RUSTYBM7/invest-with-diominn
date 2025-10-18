import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const { SUPABASE_URL, SUPABASE_SERVICE_KEY, HUBSPOT_ACCESS_TOKEN } = process.env;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, retries = 3, delayMs = 800) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.error(`Attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) await delay(delayMs);
    }
  }
  console.error("❌ All retries failed");
}

app.get("/", (_, res) => res.send("✅ Webhook server is live."));

app.post("/webhooks", async (req, res) => {
  const events = Array.isArray(req.body) ? req.body : [req.body];
  console.log("Incoming:", JSON.stringify(events, null, 2));

  for (const evt of events) {
    const email = evt.object?.properties?.email || "";
    const firstname = evt.object?.properties?.firstname || "";
    const eventType = evt.subscriptionType || evt.eventType || "unknown";

    await withRetry(async () => {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          firstname,
          event: eventType,
          source: "hubspot-webhook",
          created_at: new Date().toISOString()
        })
      });
      if (!resp.ok) throw new Error("Supabase insert failed");
    });
  }

  res.send("OK");
});

app.get("/leads", async (_, res) => {
  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`
      }
    });
    const data = await resp.json();

    const html = `
      <html>
        <head>
          <title>Leads Dashboard</title>
          <style>
            body { font-family: Inter, sans-serif; background:#f6f8fa; color:#333; padding:20px; }
            h1 { color:#0ea76a; }
            table { width:100%; border-collapse:collapse; margin-top:20px; }
            th,td { padding:10px; border-bottom:1px solid #ddd; text-align:left; }
            th { background:#111; color:#fff; }
            tr:hover { background:#f1f1f1; }
          </style>
        </head>
        <body>
          <h1>Leads Dashboard</h1>
          <table>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Event</th>
              <th>Source</th>
              <th>Created</th>
            </tr>
            ${data
              .map(
                (x) => `
                  <tr>
                    <td>${x.email || "-"}</td>
                    <td>${x.firstname || "-"}</td>
                    <td>${x.event || "-"}</td>
                    <td>${x.source || "-"}</td>
                    <td>${new Date(x.created_at).toLocaleString()}</td>
                  </tr>`
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading leads");
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000 ✅"));
