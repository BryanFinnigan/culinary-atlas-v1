import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountryImage from "@/components/CountryImage";
import SectionHeader from "@/components/SectionHeader";
import { allCuisines, getCollectionForCuisine, getCollectionsForCuisine, getCategoriesForCollection, getCuisineBySlug, productSlug } from "@/lib/cuisines";

export function generateStaticParams() {
  return allCuisines.flatMap((cuisine) => getCollectionsForCuisine(cuisine.name).map((collection) => ({ slug: cuisine.slug, collection: collection.slug })));
}

export function generateMetadata({ params }: { params: { slug: string; collection: string } }): Metadata {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  if (!cuisine || !collection) return { title: "Collection not found" };
  const description = `Explore ${collection.name.toLowerCase()} connected to ${cuisine.name} cuisine, with practical context, categories, and curated recommendations.`;
  return { title: `${collection.name} for ${cuisine.name}`, description, alternates: { canonical: `/cuisines/${cuisine.slug}/${collection.slug}` }, openGraph: { title: `${collection.name} | Culinary Atlas`, description, images: cuisine.images.pantry ? [cuisine.images.pantry] : undefined } };
}

export default function CollectionPage({ params }: { params: { slug: string; collection: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  if (!cuisine || !collection) notFound();
  const categories = getCategoriesForCollection(params.slug, params.collection);
  const isTools = /tool|kitchen|cookware|bakeware|equipment|pan/i.test(collection.name);
  const hero = isTools ? cuisine.images.tools : cuisine.images.pantry;

  return (
    <main className="bg-[var(--ivory)]">
      <section className="relative min-h-[58vh] overflow-hidden bg-[var(--navy)] text-white">
        <CountryImage src={hero || cuisine.images.hero} alt={`${collection.name} in ${cuisine.name} cuisine`} country={cuisine.name} priority aspectClassName="absolute inset-0 h-full" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,31,51,.96)] via-[rgba(13,31,51,.45)] to-transparent" />
        <div className="atlas-container relative flex min-h-[58vh] items-end pb-12 pt-24">
          <div className="max-w-4xl"><nav className="text-sm font-semibold text-slate-200"><Link href="/">Home</Link> / <Link href={`/cuisines/${cuisine.slug}`}>{cuisine.name}</Link> / {collection.name}</nav><p className="atlas-eyebrow mt-7 text-[var(--gold)]">Editorial collection</p><h1 className="mt-3 font-serif text-5xl font-bold leading-[.95] sm:text-7xl">{collection.name}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100">A practical guide to this part of {cuisine.name} food culture, including what to look for, how beginners can start, and where each recommendation fits.</p></div>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-container">
          <SectionHeader eyebrow="Buying guide" title="Start with context, then choose what fits your kitchen." description={`The best ${collection.name.toLowerCase()} choices depend on how you cook, what you already have, and which traditions within ${cuisine.name} cuisine you want to explore first.`} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Begin with one versatile item", "Read labels and origin details", "Build the collection gradually"].map((title, index) => <article key={title} className="atlas-card p-6"><span className="atlas-eyebrow">0{index + 1}</span><h2 className="mt-3 font-serif text-2xl font-bold text-[var(--navy)]">{title}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Choose products that support a real use in your kitchen rather than collecting items without a clear purpose.</p></article>)}
          </div>
        </div>
      </section>

      <section className="atlas-section bg-[var(--paper)]">
        <div className="atlas-container">
          <SectionHeader eyebrow="Browse by category" title="Find the right starting point." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category.slug} href={`/cuisines/${cuisine.slug}/${collection.slug}/${category.slug}`} className="atlas-card p-6 transition hover:-translate-y-1"><p className="atlas-eyebrow">Category</p><h3 className="mt-2 font-serif text-2xl font-bold text-[var(--navy)]">{category.name}</h3><p className="mt-3 text-sm text-[var(--muted)]">{category.products.length} curated recommendations</p><p className="mt-5 text-sm font-bold text-[var(--forest)]">Open category →</p></Link>)}</div>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-container"><SectionHeader eyebrow="Curated recommendations" title="Products in this collection." /><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{collection.products.map((product) => <article key={product.id} className="atlas-card p-5"><p className="atlas-eyebrow">{product.category}</p><h3 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{product.productName}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.whyTryIt}</p><Link href={`/products/${productSlug(product)}`} className="mt-5 inline-flex text-sm font-bold text-[var(--forest)]">Read product guide →</Link></article>)}</div></div>
      </section>
    </main>
  );
}
