import Link from "next/link";
import { notFound } from "next/navigation";
import CountryImage from "@/components/CountryImage";
import {
  allCuisines,
  getCuisineBySlug,
  getProductsForCuisine,
  groupProductsByCollection,
  slugify,
} from "@/lib/cuisines";

const collectionDescriptions: Record<string, string> = {
  "Mexican Pantry Essentials": "Start with foundational seasonings, beans, chiles, herbs, masa, and everyday sauces that help explain the range of Mexican home cooking.",
  "Mexican Tortillas & Staples": "Explore tortillas, hominy, cheeses, and practical staples that support tacos, tostadas, pozole, quesadillas, and shared meals.",
  "Mexican Sauces & Mole": "Compare bright table salsas, chile-lime condiments, chamoy, and several mole styles without treating Mexican sauces as one category.",
  "Mexican Coffee & Chocolate": "Discover café de olla, tablet chocolate, piloncillo, canela, and vanilla as entry points into Mexican drinks and sweets.",
  "Mexican Candy & Snacks": "Try sweet, sour, salty, chile-forward, peanut, and tamarind flavors through familiar packaged treats and drinks.",
  "Mexican Kitchen Tools": "Build technique with a tortilla press, comal, molcajete, warmer, and serving pieces designed for practical home use.",
};

function getCollectionDescription(collection: string, cuisineName: string) {
  return collectionDescriptions[collection] || `Explore a curated group of ${cuisineName} products selected to make the cuisine more approachable at home.`;
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
      images: cuisine.images.hero ? [{ url: cuisine.images.hero }] : undefined,
    },
  };
}

export default function CuisinePage({ params }: { params: { slug: string } }) {
  const cuisine = getCuisineBySlug(params.slug);
  if (!cuisine) notFound();

  const cuisineProducts = getProductsForCuisine(cuisine.name);
  const collections = groupProductsByCollection(cuisineProducts);
  const collectionEntries = Object.entries(collections);

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center justify-between rounded-full border border-orange-200 bg-white/90 px-5 py-3 shadow-sm backdrop-blur">
            <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
            <div className="flex gap-3 text-sm font-bold">
              <Link href="/cuisines" className="rounded-full border border-orange-200 px-4 py-2">All cuisines</Link>
              <Link href={`/regions/${cuisine.regionSlug}`} className="hidden rounded-full bg-slate-950 px-4 py-2 text-white sm:inline-flex">{cuisine.region}</Link>
            </div>
          </nav>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-orange-950/15">
            <CountryImage src={cuisine.images.hero} alt={`${cuisine.name} cuisine, ingredients, and food culture`} country={cuisine.name} priority aspectClassName="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:p-14">
              <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur">{cuisine.region} cuisine</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{cuisine.name} cuisine guide</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-orange-50 sm:text-lg">{cuisine.cuisineSummary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#overview" className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-400">Explore the cuisine</a>
                {cuisineProducts.length > 0 && <a href="#taste-at-home" className="rounded-full border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur hover:bg-white/20">Browse collections</a>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <article>
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Cuisine overview</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A cuisine shaped by place, memory, and technique.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{cuisine.diningTraditions}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoBlock title="Signature dishes" items={cuisine.signatureDishes} />
              <InfoBlock title="Flavor profile" items={cuisine.flavorProfile} />
              <InfoBlock title="Staples" items={cuisine.staples} />
              <InfoBlock title="Start here" items={cuisine.beginnerFoods} />
            </div>
          </article>
          <CountryImage src={cuisine.images.overview} alt={`An overview of ${cuisine.name} food traditions and dining culture`} country={cuisine.name} aspectClassName="aspect-[4/3]" className="rounded-[2rem] shadow-xl shadow-orange-950/10" sizes="(max-width: 1024px) 100vw, 45vw" />
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <CountryImage src={cuisine.images.regionalMap} alt={`Regional food map of ${cuisine.name}`} country={cuisine.name} aspectClassName="aspect-[4/3]" className="rounded-[2rem] border border-orange-100 bg-white shadow-sm" sizes="(max-width: 1024px) 100vw, 45vw" />
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Regional context</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Explore beyond the national shorthand.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{cuisine.foodAndCultureNotes?.regionalDiversity || `Regional traditions across ${cuisine.name} reveal different ingredients, techniques, and foodways.`}</p>
            <p className="mt-4 leading-7 text-slate-600">{cuisine.foodAndCultureNotes?.localSpecialties}</p>
          </div>
        </div>
      </section>

      <section id="taste-at-home" className="bg-white px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Bring the flavors home</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Explore {cuisine.name} pantry picks and kitchen tools</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">Use these collections as practical starting points. Products remain secondary to the cuisine guide and are grouped by how they support cooking, serving, tasting, and learning.</p>
            {cuisineProducts.length > 0 && <p className="mt-3 text-sm leading-6 text-slate-500">As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.</p>}
          </div>

          {cuisineProducts.length > 0 ? (
            <div className="mt-10 grid gap-10">
              {collectionEntries.map(([collection, items], index) => {
                const isTools = /tool|kitchen|cookware|bakeware|equipment/i.test(collection);
                const image = isTools ? cuisine.images.tools : cuisine.images.pantry;
                return (
                  <section key={collection} className="overflow-hidden rounded-[2rem] border border-orange-100 bg-orange-50/50 shadow-sm">
                    {(index === 0 || isTools) && <CountryImage src={image} alt={`${cuisine.name} ${isTools ? "kitchen tools and cookware" : "pantry ingredients and staples"}`} country={cuisine.name} aspectClassName="aspect-[16/7]" sizes="(max-width: 1024px) 100vw, 1200px" />}
                    <div className="p-5 md:p-7">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                          <h3 className="text-2xl font-black">{collection}</h3>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{getCollectionDescription(collection, cuisine.name)}</p>
                        </div>
                        <Link href={`/cuisines/${cuisine.slug}/${slugify(collection)}`} className="shrink-0 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:border-orange-500">View collection</Link>
                      </div>
                      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {items.slice(0, 8).map((product) => (
                          <article key={product.id} className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
                            <h4 className="mt-3 text-xl font-black">{product.productName}</h4>
                            <p className="mt-1 text-sm font-semibold text-slate-500">{product.brand}</p>
                            <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
                            <a className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700" href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank">View on Amazon</a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50 p-8">
              <h3 className="text-2xl font-black">Recommendations are being added</h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">This cuisine guide is available now. Product recommendations will be added after the collection is researched and reviewed.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100">
      <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-slate-700 ring-1 ring-orange-100">{item}</span>)}
      </div>
    </section>
  );
}
