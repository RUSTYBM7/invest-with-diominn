"use client";
import { useState } from "react";

export default function AskStephanieAI() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/v1/openai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: q })
    });
    const data = await res.json();
    setA(data.output || data.error || "");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl">Ask Stephanie AI</h1>
      <form onSubmit={ask} className="mt-6 flex gap-2">
        <input className="flex-1 rounded border p-3" value={q} onChange={e => setQ(e.target.value)} placeholder="Ask about wealth, real estate, fintech..." />
        <button className="rounded bg-gold px-4 py-2 text-charcoal font-medium">Ask</button>
      </form>
      {a && <pre className="mt-6 whitespace-pre-wrap rounded border bg-fog/40 p-4">{a}</pre>}
    </section>
  );
}
