import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountryImage from "@/components/CountryImage";
import SectionHeader from "@/components/SectionHeader";
import { allProducts, getCuisineBySlug, getProductBySlug, productSlug, slugify } from "@/lib/cuisines";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: productSlug(product) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.productName} Guide`,
    description: product.whyTryIt,
    alternates: { canonical: `/products/${params.slug}` },
    openGraph: { title: `${product.productName} Guide | Culinary Atlas`, description: product.whyTryIt, type: "article", url: `/products/${params.slug}` },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const countrySlug = slugify(product.country);
  const collectionSlug = slugify(product.collection || "Taste Collection");
  const categorySlug = slugify(product.category || "Products");
  const cuisine = getCuisineBySlug(countrySlug);
  const relatedProducts = allProducts.filter((item) => item.id !== product.id && item.country === product.country && (item.category === product.category || item.collection === product.collection)).slice(0, 4);
  const uses = product.typicalUse || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description: product.whyTryIt,
    category: product.category,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: { "@type": "Offer", url: product.affiliateUrl, availability: "https://schema.org/InStock" },
  };

  return (
    <main className="bg-[var(--ivory)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="atlas-section">
        <div className="atlas-container max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-[var(--muted)]"><Link href="/">Home</Link> / <Link href={`/cuisines/${countrySlug}`}>{product.country}</Link> / <Link href={`/cuisines/${countrySlug}/${collectionSlug}`}>{product.collection}</Link> / <Link href={`/cuisines/${countrySlug}/${collectionSlug}/${categorySlug}`}>{product.category}</Link></nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="atlas-eyebrow">{product.country} product guide</p>
              <h1 className="mt-4 font-serif text-5xl font-bold leading-[.96] tracking-[-.04em] text-[var(--navy)] sm:text-7xl">{product.productName}</h1>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{product.whyTryIt}</p>
              <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="atlas-button atlas-button-primary mt-7">View recommendation</a>
              <p className="mt-3 text-xs text-[var(--muted)]">As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.</p>
            </div>
            {cuisine ? <CountryImage src={cuisine.images.pantry || cuisine.images.hero} alt={`${product.productName} in the context of ${product.country} cuisine`} country={product.country} aspectClassName="aspect-[4/3]" className="rounded-[2rem] shadow-2xl shadow-slate-950/10" sizes="(max-width: 1024px) 100vw, 46vw" /> : null}
          </div>

          <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[["Collection", product.collection], ["Category", product.category], ["Discovery level", product.discoveryLevel], ["Price tier", product.priceTier]].map(([label, value]) => value ? <div key={label} className="atlas-card p-5"><dt className="atlas-eyebrow">{label}</dt><dd className="mt-3 font-serif text-xl font-bold text-[var(--navy)]">{value}</dd></div> : null)}
          </section>

          <section className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Why it matters" title={`A useful entry point into ${product.country} cuisine.`} description={product.whyTryIt} />
              <p className="mt-5 leading-7 text-[var(--muted)]">Look for quality, clear labeling, and a format that fits how you plan to cook or serve it. Start with familiar uses, then explore the wider collection and related regional traditions.</p>
            </div>
            <div className="atlas-card p-7">
              <h2 className="font-serif text-3xl font-bold text-[var(--navy)]">How beginners can use it</h2>
              {uses.length ? <div className="mt-5 flex flex-wrap gap-2">{uses.map((use) => <span key={use} className="rounded-full bg-[var(--ivory)] px-4 py-2 text-sm font-semibold text-[var(--navy)] ring-1 ring-[var(--line)]">{use}</span>)}</div> : <p className="mt-4 leading-7 text-[var(--muted)]">Use it within the recipes, serving traditions, and pantry combinations described throughout the related country guide.</p>}
            </div>
          </section>

          {relatedProducts.length ? (
            <section className="mt-20">
              <SectionHeader eyebrow="Continue exploring" title="Related recommendations." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((item) => <Link key={item.id} href={`/products/${productSlug(item)}`} className="atlas-card p-5 transition hover:-translate-y-1"><p className="atlas-eyebrow">{item.category}</p><h3 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{item.productName}</h3><p className="mt-4 text-sm font-bold text-[var(--forest)]">Read guide →</p></Link>)}
              </div>
            </section>
          ) : null}

          {cuisine ? <Link href={`/cuisines/${cuisine.slug}`} className="atlas-button atlas-button-secondary mt-12">Back to {cuisine.name}</Link> : null}
        </div>
      </section>
    </main>
  );
}
