import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c7a0]/40 bg-[#0d1f33]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-[#f6ecd7]">
          Culinary Atlas
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm font-semibold text-[#d9e1e8] md:flex">
          <Link className="transition hover:text-[#d9b46f]" href="/cuisines">Countries</Link>
          <Link className="transition hover:text-[#d9b46f]" href="/regions">Regions</Link>
          <Link className="transition hover:text-[#d9b46f]" href="/map">Cuisine Explorer</Link>
          <Link className="transition hover:text-[#d9b46f]" href="/guides">Guides</Link>
        </nav>
        <Link href="/cuisines" className="rounded-full border border-[#d9b46f]/70 px-4 py-2 text-sm font-bold text-[#f6ecd7] transition hover:bg-[#d9b46f] hover:text-[#0d1f33]">
          Explore
        </Link>
      </div>
    </header>
  );
}
