"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CountryCard from "@/components/CountryCard";
import CountryImage from "@/components/CountryImage";
import CountryPanel from "@/components/CountryPanel";
import SearchBar from "@/components/SearchBar";
import WorldMap from "@/components/WorldMap";
import cuisines from "@/data/cuisines.json";
import products from "@/data/productCatalog";
import { getCountryImages } from "@/data/countryImages";

type CuisineMap = typeof cuisines;
type CountryName = keyof CuisineMap;
type Product = (typeof products)[number];

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
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
    <article className="flex h-full flex-col justify-between rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">{product.category}</p>
        <h3 className="mt-3 text-xl font-black text-slate-950">{product.productName}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">{product.brand}</p>
        <p className="mt-4 text-sm leading-6 text-slate-700">{product.whyTryIt}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-100">{product.discoveryLevel}</span>
        <a className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700" href={product.affiliateUrl} rel="nofollow sponsored noopener noreferrer" target="_blank">View on Amazon</a>
      </div>
    </article>
  );
}

const discoverySteps = [
  "Explore cuisines by country, region, flavor, and familiar starting points.",
  "Learn what to try first, from iconic dishes to everyday pantry staples.",
  "Follow taste collections for snacks, sauces, drinks, ingredients, cookbooks, and giftable foods.",
];

export default function Home() {
  const countryNames = Object.keys(cuisines) as CountryName[];
  const defaultCountry = (countryNames.includes("United Kingdom" as CountryName) ? "United Kingdom" : countryNames[0]) as CountryName;
  const [selectedCountry, setSelectedCountry] = useState<CountryName>(defaultCountry);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const regions = useMemo(() => Array.from(new Set(countryNames.map((country) => cuisines[country].region))).sort(), [countryNames]);
  const visibleCountries = countryNames.filter((country) => country.toLowerCase().includes(search.toLowerCase()) && (region === "All Regions" || cuisines[country].region === region));

  function chooseCountry(country: string) {
    if (country in cuisines) setSelectedCountry(country as CountryName);
  }

  const displayCountry = visibleCountries.includes(selectedCountry) && selectedCountry in cuisines ? selectedCountry : (visibleCountries[0] as CountryName) || defaultCountry;
  const selectedProducts = products.filter((product) => product.country === displayCountry);
  const productCollections = groupProductsByCollection(selectedProducts);
  const countriesWithProducts = Array.from(new Set(products.map((product) => product.country))).filter((country) => country in cuisines);
  const featuredCountries = countriesWithProducts.slice(0, 6).map((country) => {
    const cuisine = cuisines[country as CountryName];
    const slug = slugify(country);
    return { name: country, slug, cuisine, image: getCountryImages(slug).hero };
  });

  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100 via-amber-50 to-white" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-orange-200 bg-white/85 px-5 py-3 shadow-sm backdrop-blur">
          <a className="text-lg font-black tracking-tight" href="#top">Culinary Atlas</a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
            <a className="transition hover:text-slate-950" href="#explore">Cuisine Explorer</a>
            <Link className="transition hover:text-slate-950" href="/cuisines">Cuisines</Link>
            <Link className="transition hover:text-slate-950" href="/regions">Regions</Link>
            <Link className="transition hover:text-slate-950" href="/guides">Guides</Link>
          </div>
        </nav>

        <div id="top" className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">Explore the world through food</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Discover cuisines, ingredients, and food traditions from around the world.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">Culinary Atlas is an editorial guide for curious cooks and travelers—built to help you understand what to try, why it matters, and how food connects to place.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-orange-700" href="#explore">Explore cuisines</a>
              <Link className="rounded-full border border-orange-200 bg-white px-6 py-3 text-center font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-400" href="/cuisines">Browse all guides</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white shadow-2xl shadow-orange-950/15">
            <CountryImage src={getCountryImages("italy").hero} alt="An editorial introduction to global cuisine and culinary travel" country="Global cuisine" priority aspectClassName="aspect-[4/5] sm:aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 55vw" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-18 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Featured country guides</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Travel by taste.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-700">Begin with countries whose guides already include deeper pantry collections, kitchen tools, and practical ways to keep exploring at home.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredCountries.map(({ name, slug, cuisine, image }) => (
              <CountryCard key={name} name={name} slug={slug} description={cuisine.cuisineSummary} tags={cuisine.flavorProfile} image={image} />
            ))}
          </div>
        </div>
      </section>

      <section id="explore" className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Cuisine Explorer</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Start with a cuisine. Find what to try next.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-700">Search by country, browse by region, or use the interactive explorer to discover signature dishes, beginner-friendly foods, pantry staples, snacks, sauces, drinks, ingredients, cookware, cookbooks, and giftable foods.</p>
          </div>
          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm backdrop-blur">
            <SearchBar search={search} setSearch={setSearch} region={region} setRegion={setRegion} regions={regions} />
            <div className="mt-4 flex max-h-44 flex-wrap gap-2 overflow-auto pr-1">
              {visibleCountries.map((country) => (
                <button key={country} onClick={() => setSelectedCountry(country)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${selectedCountry === country ? "bg-orange-600 text-white shadow" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-orange-50"}`}>{country}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section aria-label="Cuisine Explorer"><WorldMap countries={visibleCountries.map(String)} selectedCountry={displayCountry as string} setSelectedCountry={chooseCountry} /></section>
            <CountryPanel country={displayCountry as string} cuisine={cuisines[displayCountry]} />
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Bring the flavors home</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Explore {displayCountry} pantry collections</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">Start with approachable pantry staples, sweets, sauces, drinks, ingredients, and tools selected to support culinary discovery—not replace it.</p>
            </div>
            <Link className="rounded-full border border-orange-200 px-5 py-3 text-center font-bold text-slate-900 transition hover:border-orange-500 hover:bg-orange-50" href={`/cuisines/${slugify(displayCountry as string)}`}>Open cuisine guide</Link>
          </div>
          {selectedProducts.length > 0 ? (
            <div className="mt-10 grid gap-8">
              {Object.entries(productCollections).map(([collection, items]) => (
                <section key={collection} className="rounded-[2rem] border border-orange-100 bg-orange-50/50 p-5 md:p-6">
                  <h3 className="text-2xl font-black text-slate-950">{collection}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{items.length} curated products</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}</div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50 p-8 text-slate-700"><h3 className="text-2xl font-black text-slate-950">Recommendations are being added for {displayCountry}</h3><p className="mt-3 max-w-3xl leading-7">This guide is available for discovery now. Pantry recommendations and product picks will be added as the collection is researched.</p></div>
          )}
        </div>
      </section>

      <section className="bg-orange-50 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="font-bold uppercase tracking-[0.2em] text-orange-700">How to use the Cuisine Explorer</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A simple path from curiosity to your table.</h2><p className="mt-4 leading-7 text-slate-700">Culinary Atlas is built for browsing, learning, planning meals, and finding authentic products without feeling overwhelmed.</p></div>
          <ol className="grid gap-4">{discoverySteps.map((step, index) => <li key={step} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 font-black text-white">{index + 1}</span><p className="pt-2 text-lg leading-7 text-slate-700">{step}</p></li>)}</ol>
        </div>
      </section>
    </main>
  );
}
