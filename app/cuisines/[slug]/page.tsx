import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountryImage from "@/components/CountryImage";
import ImageGallery from "@/components/ImageGallery";
import SectionHeader from "@/components/SectionHeader";
import {
  allCuisines,
  getCuisineBySlug,
  getProductsForCuisine,
  groupProductsByCollection,
  slugify,
} from "@/lib/cuisines";

const descriptions: Record<string, string> = {
  "Mexican Pantry Essentials": "Foundational seasonings, beans, chiles, herbs, masa, and everyday sauces that reveal the breadth of Mexican home cooking.",
  "Mexican Tortillas & Staples": "Tortillas, hominy, cheeses, and practical staples for tacos, tostadas, pozole, quesadillas, and shared meals.",
  "Mexican Sauces & Mole": "Bright table salsas, chile-lime condiments, chamoy, and distinct mole traditions.",
};

export function generateStaticParams() {
  return allCuisines.map((cuisine) => ({ slug: cuisine.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cuisine = getCuisineBySlug(params.slug);
  if (!cuisine) return { title: "Cuisine not found" };
  const image = cuisine.images.hero;
  return {
    title: `${cuisine.name} Cuisine Guide`,
    description: cuisine.cuisineSummary,
    alternates: { canonical: `/cuisines/${cuisine.slug}` },
    openGraph: {
      title: `${cuisine.name} Cuisine Guide | Culinary Atlas`,
      description: cuisine.cuisineSummary,
      type: "article",
      url: `/cuisines/${cuisine.slug}`,
      images: image ? [{ url: image, alt: `${cuisine.name} cuisine and food culture` }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${cuisine.name} Cuisine Guide`, description: cuisine.cuisineSummary, images: image ? [image] : undefined },
  };
}

export default function CuisinePage({ params }: { params: { slug: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  if (!cuisine) notFound();
  const cuisineProducts = getProductsForCuisine(cuisine.name);
  const collections = Object.entries(groupProductsByCollection(cuisineProducts));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cuisine.name} Cuisine Guide`,
    description: cuisine.cuisineSummary,
    image: cuisine.images.hero,
    mainEntityOfPage: `https://culinaryatlasguide.com/cuisines/${cuisine.slug}`,
    publisher: { "@type": "Organization", name: "Culinary Atlas" },
  };

  return (
    <main className="bg-[var(--ivory)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative min-h-[72vh] overflow-hidden bg-[var(--navy)] text-white">
        <CountryImage src={cuisine.images.hero} alt={`${cuisine.name} cuisine, ingredients, and food culture`} country={cuisine.name} priority aspectClassName="absolute inset-0 h-full" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,31,51,.96)] via-[rgba(13,31,51,.48)] to-[rgba(13,31,51,.08)]" />
        <div className="atlas-container relative flex min-h-[72vh] items-end pb-14 pt-24">
          <div className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-200"><Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/cuisines">Countries</Link> <span aria-hidden="true">/</span> {cuisine.name}</nav>
            <p className="atlas-eyebrow text-[var(--gold)]">{cuisine.region} cuisine</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[.94] tracking-[-.045em] sm:text-7xl lg:text-8xl">{cuisine.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">{cuisine.cuisineSummary}</p>
          </div>
        </div>
      </section>

      <nav aria-label={`${cuisine.name} guide sections`} className="sticky top-16 z-40 border-b border-[var(--line)] bg-[rgba(250,247,240,.94)] backdrop-blur-xl">
        <div className="atlas-container flex gap-5 overflow-x-auto py-4 text-sm font-bold text-[var(--muted)]">
          <a href="#overview">Overview</a><a href="#pantry">Pantry</a><a href="#kitchen">Kitchen</a><a href="#regions">Regional map</a><a href="#guides">Guides</a>
        </div>
      </nav>

      <section id="overview" className="atlas-section">
        <div className="atlas-container grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Cuisine overview" title="A cuisine shaped by place, memory, and technique." description={cuisine.diningTraditions} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoBlock title="Signature dishes" items={cuisine.signatureDishes} />
              <InfoBlock title="Flavor profile" items={cuisine.flavorProfile} />
              <InfoBlock title="Everyday staples" items={cuisine.staples} />
              <InfoBlock title="Begin here" items={cuisine.beginnerFoods} />
            </div>
          </div>
          <CountryImage src={cuisine.images.overview} alt={`Traditional ${cuisine.name} food and dining culture`} country={cuisine.name} aspectClassName="aspect-[4/3]" className="rounded-[2rem] shadow-2xl shadow-slate-950/10" sizes="(max-width: 1024px) 100vw, 48vw" />
        </div>
      </section>

      <section id="regions" className="atlas-section bg-[var(--paper)]">
        <div className="atlas-container grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <CountryImage src={cuisine.images.regionalMap} alt={`Regional food map of ${cuisine.name}`} country={cuisine.name} aspectClassName="aspect-[4/3]" className="rounded-[2rem] border border-[var(--line)] bg-white shadow-lg" sizes="(max-width: 1024px) 100vw, 45vw" />
          <SectionHeader eyebrow="Regional context" title="Explore beyond the national shorthand." description={cuisine.foodAndCultureNotes?.regionalDiversity || `Regional traditions across ${cuisine.name} reveal distinct ingredients, techniques, and foodways.`} />
        </div>
      </section>

      {cuisineProducts.length > 0 ? (
        <section id="pantry" className="atlas-section">
          <div className="atlas-container">
            <SectionHeader eyebrow="Bring the flavors home" title={`${cuisine.name} pantry and kitchen collections.`} description="Begin with cultural context, then use these researched collections to find ingredients and tools that support the cuisine." />
            <p className="mt-4 text-xs text-[var(--muted)]">As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.</p>
            <div className="mt-10 grid gap-10">
              {collections.map(([collection, items], index) => {
                const isTools = /tool|kitchen|cookware|bakeware|equipment|pan/i.test(collection);
                return (
                  <article id={isTools ? "kitchen" : index === 0 ? "pantry-collection" : undefined} key={collection} className="atlas-card overflow-hidden">
                    {(index === 0 || isTools) ? <CountryImage src={isTools ? cuisine.images.tools : cuisine.images.pantry} alt={`${cuisine.name} ${isTools ? "kitchen tools" : "pantry ingredients"}`} country={cuisine.name} aspectClassName="aspect-[16/7]" sizes="100vw" /> : null}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-end justify-between gap-5">
                        <div><p className="atlas-eyebrow">Curated collection</p><h2 className="mt-2 font-serif text-3xl font-bold text-[var(--navy)]">{collection}</h2><p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">{descriptions[collection] || `A practical introduction to ${collection.toLowerCase()} within ${cuisine.name} food culture.`}</p></div>
                        <Link href={`/cuisines/${cuisine.slug}/${slugify(collection)}`} className="atlas-button atlas-button-secondary">Open guide</Link>
                      </div>
                      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {items.slice(0, 8).map((product) => (
                          <article key={product.id} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--gold)]">{product.category}</p>
                            <h3 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{product.productName}</h3>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.whyTryIt}</p>
                            <a href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank" className="mt-5 inline-flex text-sm font-bold text-[var(--forest)]">View recommendation →</a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section id="guides" className="atlas-section bg-[var(--paper)]">
        <div className="atlas-container">
          <SectionHeader eyebrow="Visual journey" title={`More from ${cuisine.name}.`} description="A closer look at the tables, ingredients, and settings that give this cuisine its sense of place." />
          <div className="mt-10"><ImageGallery images={cuisine.images.gallery} country={cuisine.name} /></div>
          <div className="mt-10 flex flex-wrap gap-3"><Link href={`/regions/${cuisine.regionSlug}`} className="atlas-button atlas-button-primary">Explore {cuisine.region}</Link><Link href="/cuisines" className="atlas-button atlas-button-secondary">Browse all countries</Link></div>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5"><h3 className="text-xs font-bold uppercase tracking-[.16em] text-[var(--gold)]">{title}</h3><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--navy)] ring-1 ring-[var(--line)]">{item}</span>)}</div></section>;
}
