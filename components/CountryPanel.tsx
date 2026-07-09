import Link from "next/link";
import type { ReactNode } from "react";

type FoodAndCultureNotes = {
  regionalDiversity?: string;
  seasonality?: string;
  diningCustoms?: string;
  historyAndInfluence?: string;
  localSpecialties?: string;
  modernFoodScene?: string;
};

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
  foodAndCultureNotes?: FoodAndCultureNotes;
};

type CountryPanelProps = {
  country: string;
  cuisine: Cuisine;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function DetailRow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  );
}

function CultureNotes({ notes }: { notes?: FoodAndCultureNotes }) {
  const entries = notes
    ? Object.entries(notes).filter(([, value]) => Boolean(value))
    : [];

  if (entries.length === 0) {
    return (
      <p className="text-slate-700">
        This page is a starting point. Future notes will add regional diversity,
        seasonality, dining customs, historical influences, and modern food context.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-2xl bg-orange-50 p-4">
          <h4 className="text-sm font-black capitalize tracking-wide text-slate-900">
            {key.replace(/([A-Z])/g, " $1")}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function CountryPanel({
  country,
  cuisine,
}: CountryPanelProps) {
  const countrySlug = slugify(country);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
          {cuisine.region}
        </p>
        <h2 className="text-3xl font-black text-slate-900">{country}</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {cuisine.cuisineSummary}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/cuisines/${countrySlug}`}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-orange-700"
          >
            Open full guide
          </Link>
          <a
            href="#products"
            className="rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
          >
            Shop the flavors
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        <DetailRow title="Start With These Foods">
          <ChipList items={cuisine.beginnerFoods} />
        </DetailRow>

        <DetailRow title="Flavor Profile">
          <ChipList items={cuisine.flavorProfile} />
        </DetailRow>

        <DetailRow title="Staples">
          <ChipList items={cuisine.staples} />
        </DetailRow>

        <DetailRow title="Signature Dishes">
          <ChipList items={cuisine.signatureDishes} />
        </DetailRow>

        <DetailRow title="Popular Beverages">
          <ChipList items={cuisine.popularBeverages} />
        </DetailRow>

        <DetailRow title="Snack Culture">
          <p className="text-slate-700">{cuisine.snackCulture}</p>
        </DetailRow>

        <DetailRow title="Dining Traditions">
          <p className="text-slate-700">{cuisine.diningTraditions}</p>
        </DetailRow>

        <DetailRow title="Food & Culture Notes">
          <CultureNotes notes={cuisine.foodAndCultureNotes} />
        </DetailRow>

        <DetailRow title="Premium Foods">
          <ChipList items={cuisine.premiumFoods} />
        </DetailRow>

        <DetailRow title="Export-Friendly Products">
          <ChipList items={cuisine.exportFriendlyProducts} />
        </DetailRow>
      </div>
    </article>
  );
}
