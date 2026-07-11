export type CountryImageSet = {
  hero?: string;
  overview?: string;
  pantry?: string;
  tools?: string;
  regionalMap?: string;
};

/**
 * Country image paths live in data so page components remain generic.
 * To add a country, create /public/images/countries/<slug>/ and add one entry here.
 */
export const countryImages: Record<string, CountryImageSet> = {
  italy: {
    hero: "/images/countries/italy/hero.webp",
    overview: "/images/countries/italy/overview.webp",
    pantry: "/images/countries/italy/pantry.webp",
    tools: "/images/countries/italy/tools.webp",
    regionalMap: "/images/countries/italy/regional-map.webp",
  },
  mexico: {
    hero: "/images/countries/mexico/hero.webp",
    overview: "/images/countries/mexico/overview.webp",
    pantry: "/images/countries/mexico/pantry.webp",
    tools: "/images/countries/mexico/tools.webp",
    regionalMap: "/images/countries/mexico/regional-map.webp",
  },
  france: {
    hero: "/images/countries/france/hero.webp",
    overview: "/images/countries/france/overview.webp",
    pantry: "/images/countries/france/pantry.webp",
    tools: "/images/countries/france/tools.webp",
    regionalMap: "/images/countries/france/regional-map.webp",
  },
};

export function getCountryImages(slug: string): CountryImageSet {
  return countryImages[slug] || {};
}
