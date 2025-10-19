import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Pull credentials from Replit environment
const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = process.env;

// Add a new subscriber to Mailchimp
async function addToMailchimp(email, firstname) {
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
  const auth = {
    username: "anystring",
    password: MAILCHIMP_API_KEY
  };
  const payload = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstname || ""
    }
  };

  try {
    const res = await axios.post(url, payload, { auth });
    console.log(`✅ Added to Mailchimp: ${res.data.email_address}`);
  } catch (err) {
    console.error("❌ Mailchimp error:", err.response?.data || err.message);
  }
}

// Webhook endpoint — receives HubSpot events
app.post("/webhooks", async (req, res) => {
  try {
    const { email, firstname } = req.body;
    if (!email) return res.status(400).send("Missing email");
    console.log("📩 New lead from HubSpot:", email);

    // Send to Mailchimp Audience
    await addToMailchimp(email, firstname);
    res.status(200).json({ ok: true, msg: "Lead synced to Mailchimp" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Health check
app.get("/", (req, res) => res.send("Mailchimp webhook live ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));