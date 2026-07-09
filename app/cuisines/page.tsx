import Link from "next/link";
import CuisineCard from "@/components/CuisineCard";
import { allCuisines, featuredCuisines, regions } from "@/lib/cuisines";

export const metadata = {
  title: "Browse World Cuisines | Culinary Atlas",
  description:
    "Browse Culinary Atlas cuisine guides by region, flavor, beginner foods, and monetized taste collections.",
};

export default function CuisinesPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm">
            <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
            <div className="flex gap-3 text-sm font-bold">
              <Link href="/map" className="rounded-full bg-slate-950 px-4 py-2 text-white">Map</Link>
              <Link href="/regions" className="rounded-full border border-orange-200 px-4 py-2">Regions</Link>
            </div>
          </nav>

          <p className="font-bold uppercase tracking-[0.2em] text-orange-700">Cuisine directory</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
            Browse every cuisine guide in the Culinary Atlas dataset.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            All cuisine pages stay live and crawlable. Featured pages have stronger monetization data, product catalogs, or buying-guide potential; content-only pages remain useful and internally linked while revenue modules are built.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat label="Cuisine pages" value={allCuisines.length} />
            <Stat label="Featured" value={featuredCuisines.length} />
            <Stat label="Regions" value={regions.length} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Featured cuisine pages</h2>
              <p className="mt-2 max-w-2xl text-slate-700">These receive premium placement because they already have product catalog data or near-term affiliate potential.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCuisines.map((cuisine) => <CuisineCard key={cuisine.slug} cuisine={cuisine} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight">All cuisine guides</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {allCuisines.map((cuisine) => <CuisineCard key={cuisine.slug} cuisine={cuisine} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black text-slate-950">{value}</p>
    </div>
  );
}
