import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCuisines,
  getCollectionForCuisine,
  getCollectionsForCuisine,
  getCategoriesForCollection,
  getCuisineBySlug,
  productSlug,
} from "@/lib/cuisines";

export function generateStaticParams() {
  return allCuisines.flatMap((cuisine) =>
    getCollectionsForCuisine(cuisine.name).map((collection) => ({
      slug: cuisine.slug,
      collection: collection.slug,
    }))
  );
}

export function generateMetadata({ params }: { params: { slug: string; collection: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  if (!cuisine || !collection) return { title: "Collection not found | Culinary Atlas" };
  return {
    title: `${collection.name} for ${cuisine.name} | Culinary Atlas`,
    description: `Explore ${collection.name.toLowerCase()} connected to ${cuisine.name} cuisine, with practical context and curated products.`,
  };
}

export default function CollectionPage({ params }: { params: { slug: string; collection: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  if (!cuisine || !collection) notFound();
  const categories = getCategoriesForCollection(params.slug, params.collection);

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-slate-600">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/cuisines/${cuisine.slug}`}>{cuisine.name}</Link>{" "}
            <span aria-hidden="true">/</span> <span>{collection.name}</span>
          </nav>

          <div className="mt-8 rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{cuisine.name} collection</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{collection.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-orange-100">
              Explore this part of {cuisine.name} food culture through approachable products, practical context, and related categories.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Browse by category</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/cuisines/${cuisine.slug}/${collection.slug}/${category.slug}`}
                className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">Category</p>
                <h3 className="mt-2 text-2xl font-black">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{category.products.length} curated products</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-3xl font-black">Products in this collection</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {collection.products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
                <h3 className="mt-3 text-xl font-black">{product.productName}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
                <Link
                  href={`/products/${productSlug(product)}`}
                  className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
                >
                  View product guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
