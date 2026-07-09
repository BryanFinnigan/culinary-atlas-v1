import Link from "next/link";
import type { CuisineRecord } from "@/lib/cuisines";

export default function CuisineCard({ cuisine }: { cuisine: CuisineRecord }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[1.75rem] border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-orange-700">
            {cuisine.region}
          </span>
          {cuisine.featured && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
              Featured
            </span>
          )}
        </div>
        <h3 className="mt-4 text-2xl font-black text-slate-950">{cuisine.name}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-700">
          {cuisine.cuisineSummary}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {cuisine.productCount > 0 ? `${cuisine.productCount} products` : "Guide building"}
        </span>
        <Link
          href={`/cuisines/${cuisine.slug}`}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
        >
          Explore
        </Link>
      </div>
    </article>
  );
}
