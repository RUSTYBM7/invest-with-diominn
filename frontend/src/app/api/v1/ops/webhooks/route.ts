import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const events = Array.isArray(payload) ? payload : [payload];

    const sb = supabaseServer();
    const rows = events.map((e: any) => ({
      email: e?.objectId || e?.email || null,
      firstname: e?.firstname || null,
      form_id: e?.formId || null,
      event: e?.subscriptionType || e?.type || "webhook",
      source: "hubspot",
      created_at: new Date().toISOString()
    }));
    await sb.from("leads").insert(rows);

    return NextResponse.json({ ok: true, received: rows.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
