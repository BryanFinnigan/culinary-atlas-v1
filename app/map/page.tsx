"use client";

import Link from "next/link";
import { useState } from "react";
import WorldMap from "@/components/WorldMap";
import { allCuisines } from "@/lib/cuisines";

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState(allCuisines[0]?.name || "Italy");
  const selectedCuisine = allCuisines.find((cuisine) => cuisine.name === selectedCountry) || allCuisines[0];

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm">
          <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
          <Link href="/cuisines" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Browse cuisines</Link>
        </nav>

        <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Interactive atlas</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
          Explore the world through food.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          Select a country on the map, then continue to its cuisine guide, region page, or taste collections where available.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <WorldMap
            countries={allCuisines.map((cuisine) => cuisine.name)}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <aside className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">Selected cuisine</p>
            <h2 className="mt-3 text-3xl font-black">{selectedCuisine.name}</h2>
            <p className="mt-4 leading-7 text-slate-700">{selectedCuisine.cuisineSummary}</p>
            <Link href={`/cuisines/${selectedCuisine.slug}`} className="mt-6 inline-flex rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">
              Open guide
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
