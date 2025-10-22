export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-serif text-4xl md:text-6xl">Beyond Wealth. Build Legacy.</h1>
      <p className="mt-4 max-w-2xl text-lg opacity-90">
        Stephanie Diomin, CPWA® — guiding entrepreneurs and families through advanced wealth strategy, real estate execution, and fintech access.
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/advisory" className="rounded bg-gold px-5 py-2 text-charcoal font-medium">View Advisory</a>
        <a href="/contact" className="rounded border border-fog px-5 py-2">Book Consultation</a>
      </div>
    </section>
  );
}
