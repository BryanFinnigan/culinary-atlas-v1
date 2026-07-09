import Link from "next/link";
import { notFound } from "next/navigation";
import CuisineCard from "@/components/CuisineCard";
import { getRegionBySlug, regions } from "@/lib/cuisines";

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug);
  if (!region) return { title: "Region not found | Culinary Atlas" };
  return {
    title: `${region.name} Cuisine Guides | Culinary Atlas`,
    description: `Explore ${region.name} cuisines, featured taste collections, food culture notes, and Culinary Atlas guide pages.`,
  };
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug);
  if (!region) notFound();

  const featured = region.cuisines.filter((cuisine) => cuisine.featured);
  const contentOnly = region.cuisines.filter((cuisine) => !cuisine.featured);

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm">
          <Link href="/" className="text-lg font-black">Culinary Atlas</Link>
          <Link href="/regions" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">All regions</Link>
        </nav>

        <p className="font-bold uppercase tracking-[0.2em] text-orange-700">{region.continent}</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
          {region.name} cuisine guides
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          Explore {region.name} through regional food culture, beginner-friendly foods, product-ready taste collections, and related cuisine pages.
        </p>

        {featured.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black">Featured in {region.name}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((cuisine) => <CuisineCard key={cuisine.slug} cuisine={cuisine} />)}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black">All {region.name} guides</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[...featured, ...contentOnly].map((cuisine) => <CuisineCard key={cuisine.slug} cuisine={cuisine} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
