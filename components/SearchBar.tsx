"use client";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  regions: string[];
};

export default function SearchBar({ search, setSearch, region, setRegion, regions }: SearchBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_220px]">
      <label className="sr-only" htmlFor="country-search">Search country</label>
      <input
        id="country-search"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/30"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search country..."
      />

      <label className="sr-only" htmlFor="region-filter">Filter by region</label>
      <select
        id="region-filter"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/30"
        value={region}
        onChange={(event) => setRegion(event.target.value)}
      >
        <option value="All Regions">All Regions</option>
        {regions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
