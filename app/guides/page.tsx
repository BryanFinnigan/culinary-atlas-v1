import Link from "next/link";

export const metadata = {
  title: "Food Buying Guides | Culinary Atlas",
  description:
    "Culinary Atlas buying guides connect cuisine education with useful pantry products, starter ingredients, and affiliate-ready recommendations.",
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-sm">
        <Link href="/" className="font-black text-orange-700">Culinary Atlas</Link>
        <p className="mt-8 font-bold uppercase tracking-[0.2em] text-orange-700">Editorial commerce</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-0.04em]">Food buying guides are coming next.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This hub will organize high-intent affiliate content such as pantry starter kits, ingredient explainers, specialty food comparisons, and country-specific taste boxes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/cuisines/united-kingdom" className="rounded-full bg-slate-950 px-5 py-3 font-bold text-white">UK taste collection</Link>
          <Link href="/cuisines/italy" className="rounded-full border border-orange-200 px-5 py-3 font-bold">Italy taste collection</Link>
        </div>
      </div>
    </main>
  );
}
