import Link from "next/link";
import { regions } from "@/lib/cuisines";

export const metadata = {
  title: "Browse Cuisines by Region | Culinary Atlas",
  description:
    "Explore Culinary Atlas cuisines by region and discover featured taste collections, cuisine guides, and future buying guides.",
};

export default function RegionsPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm">
          <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
          <Link href="/cuisines" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">All cuisines</Link>
        </nav>

        <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Regional taxonomy</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
          Browse world cuisines by region.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          Region pages support internal linking, programmatic SEO, and discovery paths beyond a single homepage feature grid.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {regions.map((region) => {
            const featuredCount = region.cuisines.filter((cuisine) => cuisine.featured).length;
            return (
              <article key={region.slug} className="rounded-[1.75rem] border border-orange-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">{region.continent}</p>
                <h2 className="mt-3 text-3xl font-black">{region.name}</h2>
                <p className="mt-3 text-slate-700">{region.cuisines.length} cuisine guides • {featuredCount} featured</p>
                <Link href={`/regions/${region.slug}`} className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-bold text-white hover:bg-orange-700">
                  Explore region
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
