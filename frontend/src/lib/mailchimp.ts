export async function subscribeToMailchimp(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY!;
  const server = process.env.MAILCHIMP_SERVER || "us5";
  const listId = process.env.MAILCHIMP_AUDIENCE_ID!;
  const res = await fetch(`https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `apikey ${apiKey}`
    },
    body: JSON.stringify({ email_address: email, status: "pending" })
  });
  if (!res.ok) {
    const txt = await res.text();
    console.warn("Mailchimp error:", txt);
  }
  return res.ok;
}
