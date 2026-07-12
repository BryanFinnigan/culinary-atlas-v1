import Link from "next/link";

export default function AtlasFooter() {
  return (
    <footer className="bg-[var(--navy)] text-[var(--ivory)]">
      <div className="atlas-container grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="font-serif text-3xl font-bold">Culinary Atlas</p>
          <p className="mt-4 max-w-md leading-7 text-slate-300">Explore food traditions, regional flavors, and carefully researched recommendations from kitchens around the world.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[var(--gold)]">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/cuisines">Country guides</Link><Link href="/regions">Regions</Link><Link href="/map">Cuisine Explorer</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[var(--gold)]">Discover</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/guides">Editorial guides</Link><Link href="/cuisines/italy">Italy</Link><Link href="/cuisines/mexico">Mexico</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} Culinary Atlas. As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.</div>
    </footer>
  );
}
