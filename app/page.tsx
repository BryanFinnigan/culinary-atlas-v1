const featuredRegions = [
  {
    name: 'Tokyo, Japan',
    plate: 'Ramen, yakitori, seasonal sweets',
    mood: 'Precise, fast-moving, deeply seasonal',
    detail:
      'Start with a neighborhood noodle counter, save room for depachika snacks, and finish with a quiet cocktail bar.',
  },
  {
    name: 'Oaxaca, Mexico',
    plate: 'Mole negro, tlayudas, mezcal',
    mood: 'Smoky, colorful, market-led',
    detail:
      'Follow the aroma of toasted chiles through the markets, then compare family mole styles at dinner.',
  },
  {
    name: 'Lisbon, Portugal',
    plate: 'Bacalhau, pastéis de nata, petiscos',
    mood: 'Sunny, coastal, unhurried',
    detail:
      'Pair tiled streets with seafood lunches, custard tarts, and small plates that make evenings stretch longer.',
  },
]

const tripSteps = [
  'Pick a craving: noodles, spice, seafood, sweets, or street food.',
  'Choose a city guide with clear context before you book.',
  'Build a flexible route around markets, bakeries, and signature dishes.',
]

const uxFeatures = [
  'Readable city cards with cuisine highlights at a glance',
  'Plain-language planning steps for first-time food travelers',
  'Mobile-first layout with clear calls to action and accessible contrast',
  'Static Next.js page that builds cleanly on Vercel without runtime setup',
]

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff8ef] text-[#27180f]">
      <section className="relative isolate overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#f97316_0,transparent_32%),radial-gradient(circle_at_top_right,#facc15_0,transparent_26%)] opacity-25" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-[#ead7bd] bg-white/75 px-5 py-3 shadow-sm backdrop-blur">
          <a className="text-lg font-black tracking-tight" href="#top" aria-label="Culinary Atlas home">
            Culinary Atlas
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-[#6f5138] sm:flex">
            <a className="hover:text-[#27180f]" href="#destinations">
              Destinations
            </a>
            <a className="hover:text-[#27180f]" href="#plan">
              Plan a trip
            </a>
            <a className="hover:text-[#27180f]" href="#features">
              Features
            </a>
          </div>
        </nav>

        <div id="top" className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-[#27180f] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#ffe7c2]">
              Eat your way around the world
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Find the dishes, markets, and neighborhoods worth traveling for.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#684b33] sm:text-xl">
              Culinary Atlas turns food curiosity into practical travel ideas. Browse approachable city snapshots,
              learn what to order, and build a trip around memorable meals instead of generic checklists.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="rounded-full bg-[#e85d04] px-6 py-3 text-center font-bold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-[#c84d03]" href="#destinations">
                Explore featured cities
              </a>
              <a className="rounded-full border border-[#d8bea0] bg-white px-6 py-3 text-center font-bold text-[#3a2517] transition hover:-translate-y-0.5 hover:border-[#a7774e]" href="#plan">
                See how it works
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#ead7bd] bg-white p-5 shadow-2xl shadow-orange-950/10">
            <div className="rounded-[1.5rem] bg-[#27180f] p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#facc15]">Tonight&apos;s route</p>
              <h2 className="mt-4 text-3xl font-black">Market crawl in Oaxaca</h2>
              <p className="mt-3 leading-7 text-[#f8dfbd]">
                Breakfast tamales, a mid-day tlayuda, chocolate atole, and a mezcal tasting with notes you can actually use.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-[#f8dfbd]">Stops</dt>
                  <dd className="text-2xl font-black">6</dd>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-[#f8dfbd]">Budget</dt>
                  <dd className="text-2xl font-black">$$</dd>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-[#f8dfbd]">Pace</dt>
                  <dd className="text-2xl font-black">Easy</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section id="destinations" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-[#c2410c]">Featured destinations</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Start with a place. Leave with a plan.</h2>
            <p className="mt-4 text-lg leading-8 text-[#684b33]">
              Each guide favors practical context: what makes the food special, how the city feels, and where to begin.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredRegions.map((region) => (
              <article key={region.name} className="rounded-[1.75rem] border border-[#ead7bd] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e85d04]">{region.plate}</p>
                <h3 className="mt-4 text-2xl font-black">{region.name}</h3>
                <p className="mt-2 font-semibold text-[#6f5138]">{region.mood}</p>
                <p className="mt-4 leading-7 text-[#684b33]">{region.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="bg-[#27180f] px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-[#facc15]">Simple planning</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A better path from craving to itinerary.</h2>
          </div>
          <ol className="grid gap-4">
            {tripSteps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl bg-white/10 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#facc15] font-black text-[#27180f]">{index + 1}</span>
                <p className="pt-2 text-lg leading-7 text-[#ffe7c2]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ead7bd] bg-white p-8 shadow-sm lg:p-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">What changed for a smoother experience</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {uxFeatures.map((feature) => (
              <div key={feature} className="rounded-2xl bg-[#fff3df] p-5 font-semibold leading-7 text-[#4f3522]">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}  });

  function chooseCountry(country: string) {
    if (country in cuisines) {
      setSelectedCountry(country as CountryName);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8 rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            MVP Starter App
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            World Cuisine Explorer
          </h1>

          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-200">
            Click a country on the map, search by name, or filter by region to
            explore cuisine summaries, flavor profiles, dishes, drinks, snacks,
            and export-friendly products.
          </p>
        </header>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <SearchBar
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
            regions={regions}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {visibleCountries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  selectedCountry === country
                    ? "bg-yellow-400 text-slate-900 shadow"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-orange-50"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section aria-label="Interactive cuisine map">
            <WorldMap
              countries={visibleCountries}
              selectedCountry={selectedCountry}
              setSelectedCountry={chooseCountry}
            />
          </section>

          <CountryPanel
            country={selectedCountry}
            cuisine={cuisines[selectedCountry]}
          />
        </div>

        <footer className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <strong>Next step:</strong> Replace{" "}
          <code className="rounded bg-slate-100 px-2 py-1">
            /data/cuisines.json
          </code>{" "}
          with your spreadsheet export. As long as the field names stay the
          same, the app will update automatically.
        </footer>

      </div>
    </main>
  );
}
