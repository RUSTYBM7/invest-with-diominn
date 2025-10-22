import { NextResponse } from "next/server";
import { openai } from "@/src/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ ok: false, error: "prompt required" }, { status: 400 });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    });

    return NextResponse.json({ ok: true, output: completion.choices[0]?.message?.content ?? "" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
