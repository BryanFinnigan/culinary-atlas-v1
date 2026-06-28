type Cuisine = {
  region: string;
  cuisineSummary: string;
  flavorProfile: string[];
  staples: string[];
  signatureDishes: string[];
  popularBeverages: string[];
  snackCulture: string;
  diningTraditions: string;
  beginnerFoods: string[];
  premiumFoods: string[];
  exportFriendlyProducts: string[];
};

type CountryPanelProps = {
  country: string;
  cuisine: Cuisine;
};

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100">
          {item}
        </span>
      ))}
    </div>
  );
}

function DetailRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </section>
  );
}

export default function CountryPanel({ country, cuisine }: CountryPanelProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-saffron">{cuisine.region}</p>
        <h2 className="text-3xl font-black text-ink">{country}</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">{cuisine.cuisineSummary}</p>
      </div>

      <div className="grid gap-4">
        <DetailRow title="Flavor Profile"><ChipList items={cuisine.flavorProfile} /></DetailRow>
        <DetailRow title="Staples"><ChipList items={cuisine.staples} /></DetailRow>
        <DetailRow title="Signature Dishes"><ChipList items={cuisine.signatureDishes} /></DetailRow>
        <DetailRow title="Popular Beverages"><ChipList items={cuisine.popularBeverages} /></DetailRow>
        <DetailRow title="Snack Culture"><p className="text-slate-700">{cuisine.snackCulture}</p></DetailRow>
        <DetailRow title="Dining Traditions"><p className="text-slate-700">{cuisine.diningTraditions}</p></DetailRow>
        <DetailRow title="Beginner Foods"><ChipList items={cuisine.beginnerFoods} /></DetailRow>
        <DetailRow title="Premium Foods"><ChipList items={cuisine.premiumFoods} /></DetailRow>
        <DetailRow title="Export-Friendly Products"><ChipList items={cuisine.exportFriendlyProducts} /></DetailRow>
      </div>
    </article>
  );
}
