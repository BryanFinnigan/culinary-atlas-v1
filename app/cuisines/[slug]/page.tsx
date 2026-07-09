import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCuisines,
  getCuisineBySlug,
  getProductsForCuisine,
  groupProductsByCollection,
  slugify,
} from "@/lib/cuisines";

export function generateStaticParams() {
  return allCuisines.map((cuisine) => ({ slug: cuisine.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  if (!cuisine) return { title: "Cuisine not found | Culinary Atlas" };
  return {
    title: `${cuisine.name} Cuisine Guide | Culinary Atlas`,
    description: cuisine.cuisineSummary,
    openGraph: {
      title: `${cuisine.name} Cuisine Guide | Culinary Atlas`,
      description: cuisine.cuisineSummary,
      type: "article",
    },
  };
}

export default function CuisinePage({ params }: { params: { slug: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  if (!cuisine) notFound();

  const cuisineProducts = getProductsForCuisine(cuisine.name);
  const collections = groupProductsByCollection(cuisineProducts);

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm">
            <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
            <div className="flex gap-3 text-sm font-bold">
              <Link href="/cuisines" className="rounded-full border border-orange-200 px-4 py-2">All cuisines</Link>
              <Link href={`/regions/${cuisine.regionSlug}`} className="rounded-full bg-slate-950 px-4 py-2 text-white">{cuisine.region}</Link>
            </div>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
                {cuisine.region} • {cuisine.monetizationStatus}
              </p>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                {cuisine.name} cuisine guide
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                {cuisine.cuisineSummary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#taste-at-home" className="rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">
                  {cuisineProducts.length > 0 ? "Shop taste collection" : "View guide status"}
                </Link>
                <Link href="/map" className="rounded-full border border-orange-200 bg-white px-5 py-3 font-bold">
                  Find on map
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-xl shadow-orange-950/10">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">Start here</p>
              <h2 className="mt-3 text-3xl font-black">Beginner-friendly foods</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {cuisine.beginnerFoods.map((food) => (
                  <span key={food} className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800 ring-1 ring-emerald-100">
                    {food}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">Food culture overview</h2>
            <p className="mt-4 leading-8 text-slate-700">{cuisine.diningTraditions}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBlock title="Signature dishes" items={cuisine.signatureDishes} />
              <InfoBlock title="Flavor profile" items={cuisine.flavorProfile} />
              <InfoBlock title="Staples" items={cuisine.staples} />
              <InfoBlock title="Export-friendly products" items={cuisine.exportFriendlyProducts} />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">Related cuisines</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Internal links help visitors and search engines understand the atlas structure.</p>
            <div className="mt-5 grid gap-2">
              {cuisine.relatedCuisines.length > 0 ? cuisine.relatedCuisines.map((name) => (
                <Link key={name} href={`/cuisines/${slugify(name)}`} className="rounded-2xl bg-orange-50 px-4 py-3 font-bold text-slate-800 hover:bg-orange-100">
                  {name}
                </Link>
              )) : (
                <Link href="/cuisines" className="rounded-2xl bg-orange-50 px-4 py-3 font-bold text-slate-800">Browse all cuisines</Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section id="taste-at-home" className="bg-white px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Affiliate-ready module</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Taste {cuisine.name} at home</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Product recommendations appear only when useful data exists. Content-only pages stay live without fake monetization.
            </p>
          </div>

          {cuisineProducts.length > 0 ? (
            <div className="mt-10 grid gap-8">
              {Object.entries(collections).map(([collection, items]) => (
                <section key={collection} className="rounded-[2rem] border border-orange-100 bg-orange-50/50 p-5 md:p-6">
                  <h3 className="text-2xl font-black">{collection}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{items.length} curated products</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {items.map((product) => (
                      <article key={product.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
                        <h4 className="mt-3 text-xl font-black">{product.productName}</h4>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{product.brand}</p>
                        <p className="mt-4 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
                        <a className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700" href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank">
                          View on Amazon
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50 p-8">
              <h3 className="text-2xl font-black">Recommended guides are being added</h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                This page is live for discovery and SEO. Pantry items, buying guides, and affiliate products will be added after the collection is validated.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl bg-orange-50 p-4">
      <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700 ring-1 ring-orange-100">{item}</span>)}
      </div>
    </section>
  );
}
