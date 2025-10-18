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

app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000 ✅"));
