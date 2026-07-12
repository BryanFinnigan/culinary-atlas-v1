import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountryImage from "@/components/CountryImage";
import SectionHeader from "@/components/SectionHeader";
import { allCuisines, getCategoriesForCollection, getCategoryForCollection, getCollectionForCuisine, getCollectionsForCuisine, getCuisineBySlug, productSlug } from "@/lib/cuisines";

export function generateStaticParams() {
  return allCuisines.flatMap((cuisine) => getCollectionsForCuisine(cuisine.name).flatMap((collection) => getCategoriesForCollection(cuisine.slug, collection.slug).map((category) => ({ slug: cuisine.slug, collection: collection.slug, category: category.slug }))));
}

export function generateMetadata({ params }: { params: { slug: string; collection: string; category: string } }): Metadata {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  const category = getCategoryForCollection(params.slug, params.collection, params.category);
  if (!cuisine || !collection || !category) return { title: "Category not found" };
  const description = `A focused guide to ${category.name.toLowerCase()} within ${collection.name} for ${cuisine.name} cuisine.`;
  return { title: `${category.name} for ${cuisine.name}`, description, alternates: { canonical: `/cuisines/${cuisine.slug}/${collection.slug}/${category.slug}` }, openGraph: { title: `${category.name} | Culinary Atlas`, description, images: cuisine.images.pantry ? [cuisine.images.pantry] : undefined } };
}

export default function CategoryPage({ params }: { params: { slug: string; collection: string; category: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  const category = getCategoryForCollection(params.slug, params.collection, params.category);
  if (!cuisine || !collection || !category) notFound();

  return (
    <main className="bg-[var(--ivory)]">
      <section className="atlas-section">
        <div className="atlas-container">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-[var(--muted)]"><Link href="/">Home</Link> / <Link href={`/cuisines/${cuisine.slug}`}>{cuisine.name}</Link> / <Link href={`/cuisines/${cuisine.slug}/${collection.slug}`}>{collection.name}</Link> / {category.name}</nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div><p className="atlas-eyebrow">{cuisine.name} category guide</p><h1 className="mt-4 font-serif text-5xl font-bold leading-[.95] tracking-[-.04em] text-[var(--navy)] sm:text-7xl">{category.name}</h1><p className="mt-6 text-lg leading-8 text-[var(--muted)]">A focused introduction to {category.name.toLowerCase()} within {collection.name}, with practical buying context and recommendations selected to make exploration easier.</p></div>
            <CountryImage src={cuisine.images.pantry || cuisine.images.hero} alt={`${category.name} in ${cuisine.name} cuisine`} country={cuisine.name} aspectClassName="aspect-[4/3]" className="rounded-[2rem] shadow-2xl shadow-slate-950/10" sizes="(max-width: 1024px) 100vw, 46vw" />
          </div>
        </div>
      </section>

      <section className="atlas-section bg-[var(--paper)]"><div className="atlas-container"><SectionHeader eyebrow="What to look for" title="Choose for purpose, quality, and fit." description="Start with the way you plan to cook or serve the item. Origin, ingredients, construction, storage needs, and versatility can matter more than buying the most expensive option." /><div className="mt-10 grid gap-4 md:grid-cols-3">{["Purpose", "Quality cues", "Beginner fit"].map((title) => <article key={title} className="atlas-card p-6"><h2 className="font-serif text-2xl font-bold text-[var(--navy)]">{title}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Use the product notes and related country guide to understand how each recommendation fits the cuisine.</p></article>)}</div></div></section>

      <section className="atlas-section"><div className="atlas-container"><SectionHeader eyebrow="Curated recommendations" title={`${category.name} to explore.`} /><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{category.products.map((product) => <article key={product.id} className="atlas-card p-5"><p className="atlas-eyebrow">{product.category}</p><h2 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{product.productName}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.whyTryIt}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/products/${productSlug(product)}`} className="text-sm font-bold text-[var(--forest)]">Read guide →</Link><a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-sm font-bold text-[var(--gold)]">View recommendation</a></div></article>)}</div></div></section>
    </main>
  );
}
