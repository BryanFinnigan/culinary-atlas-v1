"use client";

import Link from "next/link";

const markerCoordinates: Record<string, { x: number; y: number; label?: string }> = {
  "United States": { x: 18, y: 40, label: "US" },
  Canada: { x: 20, y: 25 },
  Mexico: { x: 19, y: 52 },
  Brazil: { x: 33, y: 70 },
  Argentina: { x: 31, y: 83 },
  Peru: { x: 27, y: 68 },
  "United Kingdom": { x: 45, y: 33, label: "UK" },
  Ireland: { x: 43, y: 34 },
  France: { x: 47, y: 39 },
  Spain: { x: 45, y: 45 },
  Portugal: { x: 43, y: 45 },
  Italy: { x: 51, y: 45 },
  Germany: { x: 50, y: 36 },
  Greece: { x: 54, y: 49 },
  Turkey: { x: 59, y: 48 },
  Morocco: { x: 45, y: 54 },
  Egypt: { x: 56, y: 57 },
  Nigeria: { x: 50, y: 67 },
  Ghana: { x: 47, y: 66 },
  Ethiopia: { x: 60, y: 66 },
  "South Africa": { x: 55, y: 84 },
  Kenya: { x: 60, y: 70 },
  India: { x: 69, y: 58 },
  Pakistan: { x: 66, y: 55 },
  Bangladesh: { x: 73, y: 59 },
  China: { x: 76, y: 47 },
  Japan: { x: 88, y: 44 },
  "South Korea": { x: 84, y: 45, label: "Korea" },
  Taiwan: { x: 82, y: 52 },
  Thailand: { x: 76, y: 64 },
  Vietnam: { x: 79, y: 64 },
  Malaysia: { x: 77, y: 70 },
  Singapore: { x: 77, y: 73 },
  Indonesia: { x: 81, y: 76 },
  Philippines: { x: 84, y: 64 },
  Australia: { x: 85, y: 83 },
  "New Zealand": { x: 94, y: 88 },
};

const preferredStartingPoints = [
  "Italy",
  "United Kingdom",
  "Japan",
  "Mexico",
  "India",
  "France",
  "Morocco",
  "United States",
];

type WorldMapProps = {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function WorldMap({
  countries,
  selectedCountry,
  setSelectedCountry,
}: WorldMapProps) {
  const plottedCountries = countries.filter((country) => markerCoordinates[country]);
  const unplottedCountries = countries.filter((country) => !markerCoordinates[country]);
  const startingPoints = preferredStartingPoints.filter((country) => countries.includes(country)).slice(0, 6);
  const selectedSlug = slugify(selectedCountry);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-xl shadow-orange-950/10">
      <div className="border-b border-orange-100 bg-slate-950 px-5 py-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
          Cuisine Explorer
        </p>
        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-2xl font-black">Explore cuisines, then bring the flavors home.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-orange-100">
              Choose a country, learn what to try first, then follow the guide to pantry staples, snacks, sauces, drinks, and ingredients.
            </p>
          </div>
          <Link
            href={`/cuisines/${selectedSlug}`}
            className="shrink-0 rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-white"
          >
            View cuisine guide
          </Link>
        </div>
      </div>

      <div className="border-b border-orange-100 bg-orange-50/70 p-4">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
          Popular starting points
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {startingPoints.map((country) => (
            <button
              key={country}
              aria-label={`Select ${country} in Cuisine Explorer`}
              onClick={() => setSelectedCountry(country)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedCountry === country
                  ? "bg-orange-600 text-white shadow"
                  : "bg-white text-slate-700 ring-1 ring-orange-100 hover:bg-orange-100"
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.35),transparent_28%),radial-gradient(circle_at_78%_34%,rgba(16,185,129,0.22),transparent_30%),linear-gradient(135deg,#fff7ed,#ecfeff_50%,#fef3c7)] sm:h-[520px]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="absolute left-[4%] top-[13%] h-[34%] w-[31%] rounded-[55%_45%_60%_40%] bg-white/55 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[20%] top-[49%] h-[39%] w-[21%] rotate-12 rounded-[45%_55%_55%_45%] bg-white/55 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[42%] top-[19%] h-[24%] w-[18%] rounded-[50%_45%_60%_40%] bg-white/55 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[45%] top-[41%] h-[44%] w-[24%] rounded-[45%_55%_48%_52%] bg-white/55 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[62%] top-[22%] h-[45%] w-[29%] rounded-[50%_40%_55%_45%] bg-white/55 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[77%] top-[72%] h-[19%] w-[16%] rotate-12 rounded-[55%_45%_55%_45%] bg-white/55 shadow-inner ring-1 ring-white/80" />

        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
          <path d="M120 260 C260 180, 360 330, 520 250 S760 150, 910 260" fill="none" stroke="rgb(234 88 12)" strokeWidth="3" strokeDasharray="10 12" />
          <path d="M190 390 C330 300, 510 420, 680 330 S820 270, 960 350" fill="none" stroke="rgb(15 23 42)" strokeWidth="2" strokeDasharray="6 12" />
        </svg>

        <div className="absolute left-4 right-4 top-4 rounded-3xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">
            Selected cuisine
          </p>
          <h4 className="mt-1 text-2xl font-black text-slate-950">{selectedCountry}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Open the guide for beginner foods, pantry ideas, cultural context, and product collections when available.
          </p>
        </div>

        {plottedCountries.map((country) => {
          const point = markerCoordinates[country];
          const isSelected = selectedCountry === country;
          return (
            <button
              key={country}
              aria-label={`Select ${country} cuisine`}
              onClick={() => setSelectedCountry(country)}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-lg transition ${
                  isSelected ? "scale-125 bg-orange-600" : "bg-slate-950 hover:bg-orange-500"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-black shadow-sm transition sm:text-xs ${
                  isSelected
                    ? "bg-orange-600 text-white"
                    : "bg-white/95 text-slate-800 hover:bg-white"
                }`}
              >
                {point.label || country}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 border-t border-orange-100 bg-white p-4 sm:grid-cols-4">
        <Link
          href={`/cuisines/${selectedSlug}`}
          className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-orange-700"
        >
          View cuisine guide
        </Link>
        <a
          href="#products"
          className="rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
        >
          See products
        </a>
        <a
          href="#explore"
          className="rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
        >
          Browse beginner foods
        </a>
        <a
          href="#products"
          className="rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
        >
          Shop pantry staples
        </a>
      </div>

      {unplottedCountries.length > 0 && (
        <div className="border-t border-slate-100 bg-white p-4">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            More cuisines in this filter
          </p>
          <div className="flex max-h-28 flex-wrap gap-2 overflow-auto pr-1">
            {unplottedCountries.slice(0, 40).map((country) => (
              <button
                key={country}
                aria-label={`Select ${country} cuisine`}
                onClick={() => setSelectedCountry(country)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  selectedCountry === country
                    ? "bg-orange-600 text-white"
                    : "bg-orange-50 text-slate-700 hover:bg-orange-100"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
