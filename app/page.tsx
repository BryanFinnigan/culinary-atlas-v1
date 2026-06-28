const featuredRegions = [
  {
    name: 'Tokyo, Japan',
    plate: 'Ramen, yakitori, yakitori alleys, seasonal sweets',
    mood: 'Precise, fast-moving, deeply seasonal',
    detail:
      'Start with a neighborhood noodle counter, browse a department-store food hall, and end the night with yakitori or a quiet cocktail bar.',
  },
  {
    name: 'Oaxaca, Mexico',
    plate: 'Mole negro, tlayudas, chocolate, mezcal',
    mood: 'Smoky, colorful, market-led',
    detail:
      'Follow the aroma of toasted chiles through the markets, compare family mole styles, and make time for corn, cacao, and mezcal traditions.',
  },
  {
    name: 'Lisbon, Portugal',
    plate: 'Bacalhau, petiscos, seafood, pastéis de nata',
    mood: 'Sunny, coastal, relaxed',
    detail:
      'Pair tiled streets with seafood lunches, custard tarts, and small plates that make an evening feel unhurried.',
  },
]

const tripSteps = [
  'Pick a craving: noodles, spice, seafood, sweets, markets, or street food.',
  'Choose a destination guide that explains what to order and why it matters.',
  'Build a flexible route around signature dishes, local neighborhoods, and easy first stops.',
]

const uxFeatures = [
  'Clearer landing page copy for first-time visitors',
  'Destination cards that explain the food, the mood, and where to begin',
  'Mobile-friendly sections with simple navigation and strong contrast',
  'Static page structure designed to deploy cleanly on Vercel',
]

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 text-slate-950">
      <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-200 via-amber-100 to-white" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <a className="text-lg font-black tracking-tight" href="#top">
            Culinary Atlas
          </a>

          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
            <a className="transition hover:text-slate-950" href="#destinations">
              Destinations
            </a>
            <a className="transition hover:text-slate-950" href="#plan">
              Plan
            </a>
            <a className="transition hover:text-slate-950" href="#features">
              Features
            </a>
          </div>
        </nav>

        <div
          id="top"
          className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28"
        >
          <div>
            <p className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
              Eat your way around the world
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Find the dishes, markets, and neighborhoods worth traveling for.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Culinary Atlas turns food curiosity into practical travel ideas.
              Browse approachable city snapshots, learn what to order, and
              build a trip around memorable meals instead of generic checklists.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-orange-700"
                href="#destinations"
              >
                Explore featured cities
              </a>

              <a
                className="rounded-full border border-orange-200 bg-white px-6 py-3 text-center font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-400"
                href="#plan"
              >
                See how it works
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-orange-200 bg-white p-5 shadow-2xl shadow-orange-950/10">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
                Tonight&apos;s route
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Market crawl in Oaxaca
              </h2>

              <p className="mt-3 leading-7 text-orange-100">
                Breakfast tamales, a mid-day tlayuda, chocolate atole, and a
                mezcal tasting with notes you can actually use.
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Stops</dt>
                  <dd className="text-2xl font-black">6</dd>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Budget</dt>
                  <dd className="text-2xl font-black">$$</dd>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <dt className="text-xs text-orange-100">Pace</dt>
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
            <p className="font-bold uppercase tracking-[0.2em] text-orange-700">
              Featured destinations
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Start with a place. Leave with a plan.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-700">
              Each guide favors practical context: what makes the food special,
              how the city feels, and where to begin.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredRegions.map((region) => (
              <article
                key={region.name}
                className="rounded-[1.75rem] border border-orange-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                  {region.plate}
                </p>

                <h3 className="mt-4 text-2xl font-black">{region.name}</h3>

                <p className="mt-2 font-semibold text-slate-600">
                  {region.mood}
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {region.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-amber-300">
              Simple planning
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              A better path from craving to itinerary.
            </h2>
          </div>

          <ol className="grid gap-4">
            {tripSteps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl bg-white/10 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-black text-slate-950">
                  {index + 1}
                </span>

                <p className="pt-2 text-lg leading-7 text-orange-100">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-orange-200 bg-white p-8 shadow-sm lg:p-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            What changed for a smoother experience
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {uxFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-orange-50 p-5 font-semibold leading-7 text-slate-700"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
