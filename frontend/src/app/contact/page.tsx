"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message")
    };
    const res = await fetch("/api/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(res.ok ? "Thanks — we’ll be in touch." : "Something went wrong.");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl">Contact</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input name="name" placeholder="Your name" className="w-full rounded border p-3" required />
        <input name="email" type="email" placeholder="you@example.com" className="w-full rounded border p-3" required />
        <textarea name="message" placeholder="How can we help?" className="w-full rounded border p-3 h-32" required />
        <button className="rounded bg-emerald px-5 py-2 text-white">Send</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </section>
  );
}
