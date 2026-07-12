import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0d1f33] text-[#d9e1e8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:px-16">
        <div>
          <p className="font-serif text-3xl font-semibold text-[#f6ecd7]">Culinary Atlas</p>
          <p className="mt-4 max-w-xl leading-7 text-[#b9c4ce]">
            Explore the world through food, place, ingredients, and the traditions that connect them.
          </p>
          <p className="mt-5 text-sm text-[#93a2af]">As an Amazon Associate, Culinary Atlas may earn from qualifying purchases.</p>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#d9b46f]">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/cuisines" className="hover:text-white">Countries</Link>
            <Link href="/regions" className="hover:text-white">Regions</Link>
            <Link href="/map" className="hover:text-white">Cuisine Explorer</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#d9b46f]">Discover</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/guides" className="hover:text-white">Editorial guides</Link>
            <Link href="/cuisines/italy" className="hover:text-white">Italy</Link>
            <Link href="/cuisines/mexico" className="hover:text-white">Mexico</Link>
            <Link href="/cuisines/france" className="hover:text-white">France</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-[#93a2af]">
        © {new Date().getFullYear()} Culinary Atlas. Explore with curiosity and respect for regional traditions.
      </div>
    </footer>
  );
}
