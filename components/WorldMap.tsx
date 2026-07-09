"use client";

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

type WorldMapProps = {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
};

export default function WorldMap({
  countries,
  selectedCountry,
  setSelectedCountry,
}: WorldMapProps) {
  const plottedCountries = countries.filter((country) => markerCoordinates[country]);
  const unplottedCountries = countries.filter((country) => !markerCoordinates[country]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      <div className="border-b border-slate-100 bg-slate-950 px-5 py-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
          Interactive map preview
        </p>
        <h3 className="mt-1 text-2xl font-black">Choose a cuisine by geography</h3>
      </div>

      <div className="relative h-[460px] overflow-hidden bg-gradient-to-br from-sky-100 via-orange-50 to-emerald-100">
        <div className="absolute left-[4%] top-[14%] h-[34%] w-[31%] rounded-[55%_45%_60%_40%] bg-white/70 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[20%] top-[48%] h-[39%] w-[21%] rotate-12 rounded-[45%_55%_55%_45%] bg-white/70 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[42%] top-[20%] h-[24%] w-[18%] rounded-[50%_45%_60%_40%] bg-white/70 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[45%] top-[41%] h-[44%] w-[24%] rounded-[45%_55%_48%_52%] bg-white/70 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[62%] top-[22%] h-[45%] w-[29%] rounded-[50%_40%_55%_45%] bg-white/70 shadow-inner ring-1 ring-white/80" />
        <div className="absolute left-[77%] top-[72%] h-[19%] w-[16%] rotate-12 rounded-[55%_45%_55%_45%] bg-white/70 shadow-inner ring-1 ring-white/80" />

        <div className="absolute inset-x-6 top-6 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold text-slate-700">
            This MVP map uses reliable positioned markers. As the dataset grows,
            the next upgrade is a full country-shape SVG map.
          </p>
        </div>

        {plottedCountries.map((country) => {
          const point = markerCoordinates[country];
          const isSelected = selectedCountry === country;
          return (
            <button
              key={country}
              aria-label={`View ${country} cuisine`}
              onClick={() => setSelectedCountry(country)}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus:outline-none focus:ring-2 focus:ring-orange-600"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span
                className={`h-4 w-4 rounded-full border-2 border-white shadow-lg transition ${
                  isSelected ? "scale-125 bg-orange-600" : "bg-slate-950 hover:bg-orange-500"
                }`}
              />
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-black shadow-sm transition ${
                  isSelected
                    ? "bg-orange-600 text-white"
                    : "bg-white/90 text-slate-800 hover:bg-white"
                }`}
              >
                {point.label || country}
              </span>
            </button>
          );
        })}
      </div>

      {unplottedCountries.length > 0 && (
        <div className="border-t border-slate-100 bg-white p-4">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            More countries in this filter
          </p>
          <div className="flex max-h-24 flex-wrap gap-2 overflow-auto pr-1">
            {unplottedCountries.slice(0, 40).map((country) => (
              <button
                key={country}
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
