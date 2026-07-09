"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CountryPanel from "@/components/CountryPanel";
import SearchBar from "@/components/SearchBar";
import WorldMap from "@/components/WorldMap";
import cuisines from "@/data/cuisines.json";
import products from "@/data/products.json";

type CuisineMap = typeof cuisines;
type CountryName = keyof CuisineMap;
type Product = (typeof products)[number];

const featuredRegions = [
  {
    name: "Tokyo, Japan",
    plate: "Ramen, yakitori, department-store food halls, seasonal sweets",
    mood: "Precise, fast-moving, deeply seasonal",
    detail:
      "Start with a neighborhood noodle counter, browse a department-store food hall, and end the night with yakitori or a quiet cocktail bar.",
  },
  {
    name: "Oaxaca, Mexico",
    plate: "Mole negro, tlayudas, chocolate, mezcal",
    mood: "Smoky, colorful, market-led",
    detail:
      "Follow the aroma of toasted chiles through the markets, compare family mole styles, and make time for corn, cacao, and mezcal traditions.",
  },
  {
    name: "Lisbon, Portugal",
    plate: "Bacalhau, petiscos, seafood, pastéis de nata",
    mood: "Sunny, coastal, relaxed",
    detail:
      "Pair tiled streets with seafood lunches, custard tarts, and small plates that make an evening feel unhurried.",
  },
];

const tripSteps = [
  "Collect country, cuisine, and product data as reusable assets.",
  "Turn those assets into searchable map experiences, country pages, and collections.",
  "Publish SEO-ready product pages and measure affiliate clicks to improve conversion.",
];

const uxFeatures = [
  "Interactive country exploration connected to structured cuisine data",
  "Curated product collections that support affiliate revenue without becoming a link dump",
  "Food & Culture Notes that provide context without scorecards or cultural judgment",
  "SEO-ready country and product architecture designed to grow over time",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function groupProductsByCollection(items: Product[]) {
  return items.reduce<Record<string, Product[]>>((groups, item) => {
    const key = item.collection || "Taste Collection";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
          {product.category}
        </p>
        <h3 className="mt-3 text-xl font-black text-slate-950">
          {product.productName}
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          {product.brand}
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          {product.whyTryIt}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-100">
          {product.discoveryLevel}
        </span>
        <a
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
          href={product.affiliateUrl}
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
        >
          View on Amazon
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const countryNames = Object.keys(cuisines) as CountryName[];
  const defaultCountry = (countryNames.includes("United Kingdom" as CountryName)
    ? "United Kingdom"
    : countryNames[0]) as CountryName;

  const [selectedCountry, setSelectedCountry] = useState<CountryName>(defaultCountry);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const regions = useMemo(() => {
    return Array.from(
      new Set(countryNames.map((country) => cuisines[country].region))
    ).sort();
  }, [countryNames]);

  const visibleCountries = countryNames.filter((country) => {
    const matchesSearch = country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion =
      region === "All Regions" || cuisines[country].region === region;
    return matchesSearch && matchesRegion;
  });

  function chooseCountry(country: string) {
    if (country in cuisines) {
      setSelectedCountry(country as CountryName);
    }
  }

  const displayCountry =
    visibleCountries.includes(selectedCountry) && selectedCountry in cuisines
      ? selectedCountry
      : (visibleCountries[0] as CountryName) || defaultCountry;

  const selectedProducts = products.filter(
    (product) => product.country === displayCountry
  );
  const productCollections = groupProductsByCollection(selectedProducts);

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-200 via-amber-100 to-white" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <a className="text-lg font-black tracking-tight" href="#top">
            Culinary Atlas
          </a>

          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
            <a className="transition hover:text-slate-950" href="#explore">
              Explore Map
            </a>
            <a className="transition hover:text-slate-950" href="#products">
              Collections
            </a>
            <a className="transition hover:text-slate-950" href="#destinations">
              Destinations
            </a>
            <a className="transition hover:text-slate-950" href="#plan">
              Roadmap
            </a>
          </div>
        </nav>

        <div
          id="top"
          className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28"
        >
          <div>
            <p className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
              Eat your way around the world
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Find the foods, cultures, and products worth exploring.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Culinary Atlas connects cuisine context, regional food culture,
              and practical products you can try at home. Start with the map,
              then follow curated collections into pantry staples, sweets,
              ingredients, and SEO-ready product pages.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-orange-700"
                href="#explore"
              >
                Explore the cuisine map
              </a>

              <a
                className="rounded-full border border-orange-200 bg-white px-6 py-3 text-center font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-400"
                href="#products"
              >
                View taste collections
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-orange-200 bg-white p-5 shadow-2xl shadow-orange-950/10">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
                Featured taste collection
              </p>

              <h2 className="mt-4 text-3xl font-black">Taste Britain at Home</h2>

              <p className="mt-3 leading-7 text-orange-100">
                A starter path through tea, biscuits, breakfast staples, pantry
                classics, baking items, and premium British foods—built from
                real Amazon affiliate links collected for the product catalog.
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Products</dt>
                  <dd className="text-2xl font-black">
                    {products.filter((product) => product.country === "United Kingdom").length}
                  </dd>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Country</dt>
                  <dd className="text-2xl font-black">UK</dd>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Focus</dt>
                  <dd className="text-2xl font-black">SEO</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="explore"
        className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-orange-700">
                Interactive Explorer
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Explore cuisines by country
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              Search, filter, and select a country to connect the map experience
              with cuisine summaries, Food & Culture Notes, and any product
              collections already gathered for that country.
            </p>
          </div>

          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm backdrop-blur">
            <SearchBar
              search={search}
              setSearch={setSearch}
              region={region}
              setRegion={setRegion}
              regions={regions}
            />

            <div className="mt-4 flex max-h-44 flex-wrap gap-2 overflow-auto pr-1">
              {visibleCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedCountry === country
                      ? "bg-orange-600 text-white shadow"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-orange-50"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section aria-label="Interactive cuisine map">
              <WorldMap
                countries={visibleCountries.map(String)}
                selectedCountry={displayCountry as string}
                setSelectedCountry={chooseCountry}
              />
            </section>

            <CountryPanel
              country={displayCountry as string}
              cuisine={cuisines[displayCountry]}
            />
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-orange-700">
                Curated commerce layer
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                {displayCountry} taste collections
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                These collections preserve the Amazon link data gathered so far
                and show how each country page can support education, SEO, and
                affiliate revenue without becoming a generic shopping list.
              </p>
            </div>
            <Link
              className="rounded-full border border-orange-200 px-5 py-3 text-center font-bold text-slate-900 transition hover:border-orange-500 hover:bg-orange-50"
              href={`/countries/${slugify(displayCountry as string)}`}
            >
              Open country page
            </Link>
          </div>

          {selectedProducts.length > 0 ? (
            <div className="mt-10 grid gap-8">
              {Object.entries(productCollections).map(([collection, items]) => (
                <section
                  key={collection}
                  className="rounded-[2rem] border border-orange-100 bg-orange-50/50 p-5 md:p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-950">
                        {collection}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {items.length} curated products
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {items.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50 p-8 text-slate-700">
              <h3 className="text-2xl font-black text-slate-950">
                Product catalog coming soon for {displayCountry}
              </h3>
              <p className="mt-3 max-w-3xl leading-7">
                The cuisine data is ready. The next growth step is collecting
                country-specific products, preserving affiliate links, and
                building collection pages that can rank for searches like
                clotted cream, San Marzano tomatoes, or Japanese curry blocks.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="destinations" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">
              Featured destinations
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Start with a place. Leave with a plan.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Each guide favors practical context: what makes the food special,
              how the city feels, and where to begin.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredRegions.map((region) => (
              <article
                key={region.name}
                className="rounded-[1.75rem] border border-orange-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                  {region.plate}
                </p>
                <h3 className="mt-4 text-2xl font-black">{region.name}</h3>
                <p className="mt-2 font-semibold text-slate-600">{region.mood}</p>
                <p className="mt-4 leading-7 text-slate-700">{region.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-amber-300">
              Product operating system
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              A repeatable path from data to revenue.
            </h2>
          </div>

          <ol className="grid gap-4">
            {tripSteps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl bg-white/10 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-black text-slate-950">
                  {index + 1}
                </span>
                <p className="pt-2 text-lg leading-7 text-orange-100">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-orange-200 bg-white p-8 shadow-sm lg:p-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            What this version moves forward
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {uxFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-orange-50 p-5 font-semibold leading-7 text-slate-700"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
