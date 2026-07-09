import Link from "next/link";
import cuisines from "@/data/cuisines.json";
import products from "@/data/products.json";

type CuisineMap = typeof cuisines;
type CountryName = keyof CuisineMap;
type Product = (typeof products)[number];
type FoodAndCultureNotes = Record<string, string>;

type PageProps = {
  params: {
    slug: string;
  };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function titleFromNoteKey(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function groupProductsByCollection(items: Product[]) {
  return items.reduce<Record<string, Product[]>>((groups, item) => {
    const key = item.collection || "Taste Collection";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

export function generateStaticParams() {
  return (Object.keys(cuisines) as CountryName[]).map((country) => ({
    slug: slugify(country),
  }));
}

export function generateMetadata({ params }: PageProps) {
  const country = (Object.keys(cuisines) as CountryName[]).find(
    (item) => slugify(item) === params.slug
  );

  if (!country) {
    return {
      title: "Country not found | Culinary Atlas",
    };
  }

  return {
    title: `${country} Food Guide | Culinary Atlas`,
    description: cuisines[country].cuisineSummary,
  };
}

export default function CountryPage({ params }: PageProps) {
  const country = (Object.keys(cuisines) as CountryName[]).find(
    (item) => slugify(item) === params.slug
  );

  if (!country) {
    return (
      <main className="min-h-screen bg-orange-50 px-6 py-16 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black">Country not found</h1>
          <p className="mt-4 text-slate-700">
            This country page is not available yet.
          </p>
          <Link className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-bold text-white" href="/">
            Back to Culinary Atlas
          </Link>
        </div>
      </main>
    );
  }

  const cuisine = cuisines[country];
  const countryProducts = products.filter((product) => product.country === country);
  const collections = groupProductsByCollection(countryProducts);
  const notes = Object.entries(
    ((cuisine as unknown as { foodAndCultureNotes?: FoodAndCultureNotes }).foodAndCultureNotes ?? {})
  ).filter(([, value]) => Boolean(value));

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-200 via-white to-amber-50" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <Link className="text-lg font-black tracking-tight" href="/">
            Culinary Atlas
          </Link>
          <Link className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white" href="/#explore">
            Explore Map
          </Link>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
              {cuisine.region}
            </p>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {country} food guide
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">
              {cuisine.cuisineSummary}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center sm:max-w-xl">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Products</p>
                <p className="mt-1 text-3xl font-black">{countryProducts.length}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Dishes</p>
                <p className="mt-1 text-3xl font-black">{cuisine.signatureDishes.length}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Collections</p>
                <p className="mt-1 text-3xl font-black">{Object.keys(collections).length}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-2xl shadow-orange-950/10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">
              Start here
            </p>
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
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">Food culture overview</h2>
            <p className="mt-4 leading-8 text-slate-700">{cuisine.diningTraditions}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBlock title="Flavor profile" items={cuisine.flavorProfile} />
              <InfoBlock title="Staples" items={cuisine.staples} />
              <InfoBlock title="Signature dishes" items={cuisine.signatureDishes} />
              <InfoBlock title="Popular beverages" items={cuisine.popularBeverages} />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">Food & Culture Notes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Context, not scorecards. Culinary Atlas uses these notes to avoid
              oversimplifying national cuisines.
            </p>
            <div className="mt-5 grid gap-3">
              {notes.length > 0 ? (
                notes.map(([key, value]) => (
                  <div key={key} className="rounded-2xl bg-orange-50 p-4">
                    <h3 className="text-sm font-black text-slate-950">{titleFromNoteKey(key)}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-slate-700">
                  Culture notes are coming soon for this country. The page remains
                  useful as an introduction rather than a complete representation.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">
              Taste at home
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Curated {country} products
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Product links are presented as cultural discovery aids and clearly
              use affiliate commerce where available.
            </p>
          </div>

          {countryProducts.length > 0 ? (
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
                        <a className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white" href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank">
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
              <h3 className="text-2xl font-black">Products coming soon</h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                This country has cuisine data ready. Product collection is the next
                step for affiliate commerce and SEO pages.
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
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
