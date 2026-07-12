export type CountryImageSet = {
  hero?: string;
  overview?: string;
  pantry?: string;
  tools?: string;
  regionalMap?: string;
  gallery?: string[];
};

const image = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;

export const homepageHero = image("photo-1504674900247-0877df9cc836", 2200);

/**
 * Reusable country photography registry. New countries require only one data
 * entry; every homepage card and country-page placement renders automatically.
 */
export const countryImages: Record<string, CountryImageSet> = {
  italy: {
    hero: image("photo-1579751626657-72bc17010498"),
    overview: image("photo-1473093295043-cdd812d0e601"),
    pantry: image("photo-1473093226795-af9932fe5856"),
    tools: image("photo-1556910103-1c02745aae4d"),
    regionalMap: "/images/countries/italy/regional-map.svg",
    gallery: [image("photo-1565299624946-b28f40a0ae38"), image("photo-1551183053-bf91a1d81141")],
  },
  mexico: {
    hero: image("photo-1551504734-5ee1c4a1479b"),
    overview: image("photo-1565299507177-b0ac66763828"),
    pantry: image("photo-1599974579688-8dbdd335c77f"),
    tools: image("photo-1556910103-1c02745aae4d"),
    regionalMap: "/images/countries/mexico/regional-map.svg",
    gallery: [image("photo-1552332386-f8dd00dc2f85"), image("photo-1574343635105-4cf2ea136b8b")],
  },
  france: {
    hero: image("photo-1509440159596-0249088772ff"),
    overview: image("photo-1547592180-85f173990554"),
    pantry: image("photo-1486297678162-eb2a19b0a32d"),
    tools: image("photo-1556910103-1c02745aae4d"),
    regionalMap: "/images/countries/france/regional-map.svg",
    gallery: [image("photo-1506084868230-bb9d95c24759"), image("photo-1458642849426-cfb724f15ef7")],
  },
  "united-kingdom": {
    hero: image("photo-1544787219-7f47ccb76574"),
    overview: image("photo-1576092768241-dec231879fc3"),
    pantry: image("photo-1533777857889-4be7c70b33f7"),
    tools: image("photo-1556910103-1c02745aae4d"),
    regionalMap: "/images/countries/united-kingdom/regional-map.svg",
    gallery: [image("photo-1495474472287-4d71bcdd2085"), image("photo-1547592180-85f173990554")],
  },
};

export function getCountryImages(slug: string): CountryImageSet {
  return countryImages[slug] || {};
}
