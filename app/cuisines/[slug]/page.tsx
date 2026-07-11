import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCuisines,
  getCuisineBySlug,
  getProductsForCuisine,
  groupProductsByCollection,
  productSlug,
  slugify,
} from "@/lib/cuisines";

const collectionDescriptions: Record<string, string> = {
  "Mexican Pantry Essentials":
    "Start with foundational seasonings, beans, chiles, herbs, masa, and everyday sauces that help explain the range of Mexican home cooking.",
  "Mexican Tortillas & Staples":
    "Explore tortillas, hominy, cheeses, and practical staples that support tacos, tostadas, pozole, quesadillas, and shared meals.",
  "Mexican Sauces & Mole":
    "Compare bright table salsas, chile-lime condiments, chamoy, and several mole styles without treating Mexican sauces as one category.",
  "Mexican Coffee & Chocolate":
    "Discover café de olla, tablet chocolate, piloncillo, canela, and vanilla as entry points into Mexican drinks and sweets.",
  "Mexican Candy & Snacks":
    "Try sweet, sour, salty, chile-forward, peanut, and tamarind flavors through familiar packaged treats and drinks.",
  "Mexican Kitchen Tools":
    "Build technique with a tortilla press, comal, molcajete, warmer, and serving pieces designed for practical home use.",
};

function getCollectionDescription(collection: string, cuisineName: string) {
  return (
    collectionDescriptions[collection] ||
    `Explore a curated group of ${cuisineName} products selected to make the cuisine more approachable at home.`
  );
}

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
                {cuisine.region} cuisine
              </p>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                {cuisine.name} cuisine guide
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                {cuisine.cuisineSummary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#taste-at-home" className="rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">
                  {cuisineProducts.length > 0 ? "Explore collections" : "Explore the guide"}
                </Link>
                <Link href="/map" className="rounded-full border border-orange-200 bg-white px-5 py-3 font-bold">
                  Open Cuisine Explorer
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-xl shadow-orange-950/10">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">Start here</p>
              <h2 className="mt-3 text-3xl font-black">Beginner-friendly foods</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Familiar starting points can open the door to deeper regional ingredients, dishes, and techniques.
              </p>
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
              <InfoBlock title="Products to explore" items={cuisine.exportFriendlyProducts} />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">Keep exploring</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Compare nearby and related food traditions to understand how ingredients, migration, geography, and technique connect cuisines.
            </p>
            <div className="mt-5 grid gap-2">
              {cuisine.relatedCuisines.length > 0 ? cuisine.relatedCuisines.map((name) => (
                <Link key={name} href={`/cuisines/${slugify(name)}`} className="rounded-2xl bg-orange-50 px-4 py-3 font-bold text-slate-800 hover:bg-orange-100">
                  Explore {name}
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
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Country → Collection → Category → Product</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Explore {cuisine.name} collections</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Start with a collection, narrow into a category, then open an individual product guide for practical context and shopping links.
            </p>
            {cuisineProducts.length > 0 && (
              <p className="mt-3 text-sm leading-6 text-slate-500">
                As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.
              </p>
            )}
          </div>

          {cuisineProducts.length > 0 ? (
            <div className="mt-10 grid gap-8">
              {Object.entries(collections).map(([collection, items]) => {
                const collectionSlug = slugify(collection);
                return (
                  <section key={collection} className="rounded-[2rem] border border-orange-100 bg-orange-50/50 p-5 md:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div>
                        <h3 className="text-2xl font-black">{collection}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                          {getCollectionDescription(collection, cuisine.name)}
                        </p>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-700">
                          {items.length} curated products
                        </p>
                      </div>
                      <Link
                        href={`/cuisines/${cuisine.slug}/${collectionSlug}`}
                        className="rounded-full bg-orange-600 px-4 py-2 text-center text-sm font-black text-white hover:bg-orange-700"
                      >
                        Open collection
                      </Link>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {items.slice(0, 8).map((product) => (
                        <article key={product.id} className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
                          <h4 className="mt-3 text-xl font-black">{product.productName}</h4>
                          <p className="mt-1 text-sm font-semibold text-slate-500">{product.brand}</p>
                          <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
                          <div className="mt-5 grid gap-2">
                            <Link className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700" href={`/products/${productSlug(product)}`}>
                              Product guide
                            </Link>
                            <a className="inline-flex min-h-11 items-center justify-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-orange-50" href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank">
                              View on Amazon
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50 p-8">
              <h3 className="text-2xl font-black">Recommendations are being added</h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                This cuisine guide is available now. Product recommendations will be added after the collection is researched and reviewed.
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
