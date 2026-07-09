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

function WorldSilhouette() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 520"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="landGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="52%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <filter id="landShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7c2d12" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect width="1000" height="520" fill="url(#oceanGrid)" opacity="0" />

      <path
        d="M54 168 L91 112 L154 91 L231 111 L286 152 L260 208 L219 230 L226 276 L185 313 L135 293 L117 244 L70 228 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
      <path
        d="M245 294 L306 318 L343 385 L323 476 L278 499 L244 443 L215 388 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
      <path
        d="M390 129 L455 94 L521 122 L556 164 L523 199 L463 205 L417 185 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
      <path
        d="M463 217 L549 222 L620 292 L605 386 L555 468 L493 428 L459 338 L424 281 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
      <path
        d="M565 119 L684 74 L812 112 L913 191 L886 289 L784 309 L703 254 L627 269 L568 214 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
      <path
        d="M779 371 L865 350 L937 401 L910 467 L820 465 L762 423 Z"
        fill="url(#landGradient)"
        stroke="#f59e0b"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#landShadow)"
      />
    </svg>
  );
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
            className="shrink-0 rounded-full bg-amber-300 px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-white"
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
              className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
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

      <div className="relative h-[430px] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.28),transparent_28%),radial-gradient(circle_at_78%_34%,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#ecfeff,#fff7ed_52%,#fef3c7)] sm:h-[520px]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <WorldSilhouette />

        <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M105 265 C260 175, 360 330, 520 250 S760 150, 910 260" fill="none" stroke="rgb(234 88 12)" strokeWidth="3" strokeDasharray="10 12" />
          <path d="M190 390 C330 300, 510 420, 680 330 S820 270, 960 350" fill="none" stroke="rgb(15 23 42)" strokeWidth="2" strokeDasharray="6 12" />
        </svg>

        <div className="absolute left-4 right-4 top-4 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
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
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-lg transition ${
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
          className="min-h-12 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-orange-700"
        >
          View cuisine guide
        </Link>
        <a
          href="#products"
          className="min-h-12 rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
        >
          See products
        </a>
        <a
          href="#explore"
          className="min-h-12 rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
        >
          Browse beginner foods
        </a>
        <a
          href="#products"
          className="min-h-12 rounded-2xl bg-orange-50 px-4 py-3 text-center text-sm font-black text-slate-800 ring-1 ring-orange-100 transition hover:bg-orange-100"
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
                className={`min-h-9 rounded-full px-3 py-1 text-xs font-bold transition ${
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
