"use client";

import { useMemo, useState } from "react";
import CountryPanel from "../components/CountryPanel";
import SearchBar from "../components/SearchBar";
import WorldMap from "../components/WorldMap";
import cuisines from "../data/cuisines.json";

type CuisineMap = typeof cuisines;
type CountryName = keyof CuisineMap;

export default function Home() {
  const countryNames = Object.keys(cuisines) as CountryName[];

  const [selectedCountry, setSelectedCountry] =
    useState<CountryName>("Japan");

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const regions = useMemo(() => {
    return Array.from(
      new Set(countryNames.map((country) => cuisines[country].region))
    ).sort();
  }, [countryNames]);

  const visibleCountries = countryNames.filter((country) => {
    const matchesSearch = country
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRegion =
      region === "All Regions" ||
      cuisines[country].region === region;

    return matchesSearch && matchesRegion;
  });

  function chooseCountry(country: string) {
    if (country in cuisines) {
      setSelectedCountry(country as CountryName);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8 rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            MVP Starter App
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            World Cuisine Explorer
          </h1>

          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-200">
            Click a country on the map, search by name, or filter by region to
            explore cuisine summaries, flavor profiles, dishes, drinks, snacks,
            and export-friendly products.
          </p>
        </header>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <SearchBar
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
            regions={regions}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {visibleCountries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  selectedCountry === country
                    ? "bg-yellow-400 text-slate-900 shadow"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-orange-50"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section aria-label="Interactive cuisine map">
            <WorldMap
              countries={visibleCountries}
              selectedCountry={selectedCountry}
              setSelectedCountry={chooseCountry}
            />
          </section>

          <CountryPanel
            country={selectedCountry}
            cuisine={cuisines[selectedCountry]}
          />
        </div>

        <footer className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <strong>Next step:</strong> Replace{" "}
          <code className="rounded bg-slate-100 px-2 py-1">
            /data/cuisines.json
          </code>{" "}
          with your spreadsheet export. As long as the field names stay the
          same, the app will update automatically.
        </footer>

      </div>
    </main>
  );
}