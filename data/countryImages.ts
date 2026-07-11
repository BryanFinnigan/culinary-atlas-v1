export type CountryImageSet = {
  hero?: string;
  overview?: string;
  pantry?: string;
  tools?: string;
  regionalMap?: string;
};

/**
 * Reusable country image registry. New countries require only a folder and one
 * data entry; all homepage cards and cuisine-page placements render automatically.
 */
export const countryImages: Record<string, CountryImageSet> = {
  italy: {
    hero: "/images/countries/italy/hero.svg",
    overview: "/images/countries/italy/hero.svg",
    pantry: "/images/countries/italy/detail.svg",
    tools: "/images/countries/italy/detail.svg",
    regionalMap: "/images/countries/italy/regional-map.svg",
  },
  mexico: {
    hero: "/images/countries/mexico/hero.svg",
    overview: "/images/countries/mexico/hero.svg",
    pantry: "/images/countries/mexico/detail.svg",
    tools: "/images/countries/mexico/detail.svg",
    regionalMap: "/images/countries/mexico/regional-map.svg",
  },
  france: {
    hero: "/images/countries/france/hero.svg",
    overview: "/images/countries/france/hero.svg",
    pantry: "/images/countries/france/detail.svg",
    tools: "/images/countries/france/detail.svg",
    regionalMap: "/images/countries/france/regional-map.svg",
  },
};

export function getCountryImages(slug: string): CountryImageSet {
  return countryImages[slug] || {};
}
