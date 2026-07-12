const items = [
  ["World cuisines", "Browse food traditions across countries and regions."],
  ["Curated products", "Recommendations selected for relevance, usefulness, and cultural context."],
  ["Editorial guides", "Clear introductions for curious cooks, travelers, and gift shoppers."],
  ["A continuing journey", "Follow connected paths from country to collection, category, and product."],
];

export default function TrustSection() {
  return (
    <section className="atlas-section bg-[var(--navy)] text-white">
      <div className="atlas-container">
        <p className="atlas-eyebrow text-[var(--gold)]">Why Culinary Atlas</p>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">Built for discovery, designed for trust.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, copy], index) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-sm font-bold text-[var(--gold)]">0{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
