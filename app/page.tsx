"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CountryCard from "@/components/CountryCard";
import CountryImage from "@/components/CountryImage";
import CountryPanel from "@/components/CountryPanel";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import TrustSection from "@/components/TrustSection";
import WorldMap from "@/components/WorldMap";
import cuisines from "@/data/cuisines.json";
import products from "@/data/productCatalog";
import { getCountryImages, homepageHero } from "@/data/countryImages";

type CuisineMap = typeof cuisines;
type CountryName = keyof CuisineMap;
type Product = (typeof products)[number];

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

function groupProductsByCollection(items: Product[]) {
  return items.reduce<Record<string, Product[]>>((groups, item) => {
    const key = item.collection || "Taste Collection";
    (groups[key] ||= []).push(item);
    return groups;
  }, {});
}

const regionCards = [
  ["Europe", "Old-world techniques, regional breads, cheeses, pastas, and table traditions."],
  ["Latin America", "Corn, chiles, cacao, citrus, slow cooking, and deeply regional foodways."],
  ["Asia", "Rice traditions, fermentation, aromatics, noodles, tea, and extraordinary regional range."],
  ["Middle East & Africa", "Spice routes, grains, communal tables, preserves, fire cooking, and hospitality."],
];

export default function Home() {
  const countryNames = Object.keys(cuisines) as CountryName[];
  const defaultCountry = (countryNames.includes("Mexico" as CountryName) ? "Mexico" : countryNames[0]) as CountryName;
  const [selectedCountry, setSelectedCountry] = useState<CountryName>(defaultCountry);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const regions = useMemo(() => Array.from(new Set(countryNames.map((country) => cuisines[country].region))).sort(), [countryNames]);
  const visibleCountries = countryNames.filter((country) => country.toLowerCase().includes(search.toLowerCase()) && (region === "All Regions" || cuisines[country].region === region));
  const displayCountry = visibleCountries.includes(selectedCountry) ? selectedCountry : (visibleCountries[0] || defaultCountry);
  const selectedProducts = products.filter((product) => product.country === displayCountry);
  const productCollections = groupProductsByCollection(selectedProducts);
  const flagshipNames = ["Italy", "Mexico", "France", "United Kingdom"].filter((country) => country in cuisines) as CountryName[];

  return (
    <main className="bg-[var(--ivory)] text-[var(--ink)]">
      <section className="relative min-h-[76vh] overflow-hidden bg-[var(--navy)] text-white">
        <CountryImage src={homepageHero} alt="A shared table of global dishes and ingredients" country="Global cuisine" priority aspectClassName="absolute inset-0 h-full" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,31,51,.94)] via-[rgba(13,31,51,.72)] to-[rgba(13,31,51,.16)]" />
        <div className="atlas-container relative flex min-h-[76vh] items-center py-20">
          <div className="max-w-3xl">
            <p className="atlas-eyebrow text-[var(--gold)]">Explore the world through food</p>
            <h1 className="mt-5 font-serif text-5xl font-bold leading-[.94] tracking-[-.045em] sm:text-7xl lg:text-8xl">Explore the world, one cuisine at a time.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">Discover the places, ingredients, techniques, and traditions behind the foods people love—and find thoughtful ways to bring those flavors home.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cuisines" className="atlas-button atlas-button-primary">Explore countries</Link>
              <a href="#explorer" className="atlas-button border border-white/35 bg-white/10 text-white backdrop-blur">Open Cuisine Explorer</a>
            </div>
          </div>
        </div>
      </section>

      <section className="atlas-section bg-[var(--paper)]">
        <div className="atlas-container">
          <SectionHeader eyebrow="Featured country guides" title="Travel by taste." description="Begin with richly developed guides that connect culinary culture to approachable ingredients, tools, and regional stories." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {flagshipNames.map((name) => {
              const cuisine = cuisines[name];
              const slug = slugify(name);
              return <CountryCard key={name} name={name} slug={slug} description={cuisine.cuisineSummary} tags={cuisine.flavorProfile} image={getCountryImages(slug).hero} />;
            })}
          </div>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-container">
          <SectionHeader eyebrow="Explore by region" title="Follow flavors across borders." description="Geography, trade, migration, climate, and memory connect cuisines in ways national labels cannot fully explain." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {regionCards.map(([title, copy]) => (
              <Link key={title} href="/regions" className="atlas-card group p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]">
                <p className="atlas-eyebrow">Region</p>
                <h3 className="mt-3 font-serif text-3xl font-bold text-[var(--navy)]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{copy}</p>
                <p className="mt-6 text-sm font-bold text-[var(--forest)]">Explore region →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      <section id="explorer" className="atlas-section bg-slate-100">
        <div className="atlas-container">
          <SectionHeader eyebrow="Cuisine Explorer" title="Start with a country. Find what to try next." description="Search, browse by region, and move from cultural context to signature dishes, pantry staples, tools, and related guides." />
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <SearchBar search={search} setSearch={setSearch} region={region} setRegion={setRegion} regions={regions} />
            <div className="mt-4 flex max-h-40 flex-wrap gap-2 overflow-auto">
              {visibleCountries.map((country) => (
                <button key={country} onClick={() => setSelectedCountry(country)} className={`rounded-full px-4 py-2 text-sm font-bold ${displayCountry === country ? "bg-[var(--navy)] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{country}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <WorldMap countries={visibleCountries.map(String)} selectedCountry={displayCountry} setSelectedCountry={(country) => country in cuisines && setSelectedCountry(country as CountryName)} />
            <CountryPanel country={displayCountry} cuisine={cuisines[displayCountry]} />
          </div>
        </div>
      </section>

      <section className="atlas-section bg-[var(--paper)]">
        <div className="atlas-container">
          <SectionHeader eyebrow="Bring the flavors home" title={`Explore ${displayCountry} collections.`} description="Curated recommendations remain secondary to the story, helping you continue the journey with useful ingredients and tools." />
          {selectedProducts.length ? (
            <div className="mt-10 grid gap-6">
              {Object.entries(productCollections).slice(0, 3).map(([collection, items]) => (
                <section key={collection} className="atlas-card p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div><p className="atlas-eyebrow">Collection</p><h3 className="mt-2 font-serif text-3xl font-bold text-[var(--navy)]">{collection}</h3></div>
                    <Link href={`/cuisines/${slugify(displayCountry)}/${slugify(collection)}`} className="atlas-button atlas-button-secondary">View collection</Link>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {items.slice(0, 4).map((product) => (
                      <article key={product.id} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--gold)]">{product.category}</p>
                        <h4 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{product.productName}</h4>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.whyTryIt}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : <p className="mt-8 text-[var(--muted)]">Curated recommendations are being researched for this guide.</p>}
        </div>
      </section>
    </main>
  );
}
