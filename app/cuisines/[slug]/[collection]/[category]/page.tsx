import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCuisines,
  getCategoriesForCollection,
  getCategoryForCollection,
  getCollectionForCuisine,
  getCollectionsForCuisine,
  getCuisineBySlug,
  productSlug,
} from "@/lib/cuisines";

export function generateStaticParams() {
  return allCuisines.flatMap((cuisine) =>
    getCollectionsForCuisine(cuisine.name).flatMap((collection) =>
      getCategoriesForCollection(cuisine.slug, collection.slug).map((category) => ({
        slug: cuisine.slug,
        collection: collection.slug,
        category: category.slug,
      }))
    )
  );
}

export function generateMetadata({ params }: { params: { slug: string; collection: string; category: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  const category = getCategoryForCollection(params.slug, params.collection, params.category);
  if (!cuisine || !collection || !category) return { title: "Category not found | Culinary Atlas" };
  return {
    title: `${category.name} for ${cuisine.name} | Culinary Atlas`,
    description: `Browse ${category.name.toLowerCase()} within the ${collection.name} collection for ${cuisine.name}.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string; collection: string; category: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  const collection = getCollectionForCuisine(params.slug, params.collection);
  const category = getCategoryForCollection(params.slug, params.collection, params.category);
  if (!cuisine || !collection || !category) notFound();

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-slate-600">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/cuisines/${cuisine.slug}`}>{cuisine.name}</Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link href={`/cuisines/${cuisine.slug}/${collection.slug}`}>{collection.name}</Link>{" "}
            <span aria-hidden="true">/</span> <span>{category.name}</span>
          </nav>

          <div className="mt-8 rounded-[2rem] border border-orange-100 bg-white p-7 shadow-sm sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">{cuisine.name} category</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{category.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              A focused guide to {category.name.toLowerCase()} within {collection.name}, with products selected to make exploration easier and more practical.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {category.products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
                <h2 className="mt-3 text-xl font-black">{product.productName}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/products/${productSlug(product)}`}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
                  >
                    Product guide
                  </Link>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-orange-50"
                  >
                    View on Amazon
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
