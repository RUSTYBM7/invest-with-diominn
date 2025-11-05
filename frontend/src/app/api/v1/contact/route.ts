import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { subscribeToMailchimp } from "@/lib/mailchimp";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

    const sb = supabaseServer();
    const { error } = await sb.from("leads").insert({
      email,
      firstname: name || null,
      source: "contact-form",
      event: "message",
      created_at: new Date().toISOString()
    });
    if (error) console.error(error);

    await subscribeToMailchimp(email);

    return NextResponse.json({ ok: true, status: "queued" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
