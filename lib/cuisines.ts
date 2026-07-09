import cuisines from "@/data/cuisines.json";
import products from "@/data/productCatalog";

export type RawCuisine = (typeof cuisines)[keyof typeof cuisines];
export type CuisineRecord = RawCuisine & {
  name: string;
  slug: string;
  regionSlug: string;
  continent: string;
  subregion: string;
  featured: boolean;
  monetizationStatus: "featured" | "available" | "content-only" | "coming-soon";
  productCount: number;
  relatedCuisines: string[];
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function continentFromRegion(region: string) {
  if (/africa/i.test(region)) return "Africa";
  if (/asia/i.test(region)) return "Asia";
  if (/europe|mediterranean/i.test(region)) return "Europe";
  if (/america|caribbean/i.test(region)) return "Americas";
  if (/oceania/i.test(region)) return "Oceania";
  return "Global";
}

export const allCuisines: CuisineRecord[] = Object.entries(cuisines)
  .map(([name, cuisine]) => {
    const productCount = products.filter((product) => product.country === name).length;
    const region = cuisine.region;
    return {
      ...cuisine,
      name,
      slug: slugify(name),
      regionSlug: slugify(region),
      continent: continentFromRegion(region),
      subregion: region,
      productCount,
      featured: productCount > 0,
      monetizationStatus: productCount > 0 ? "featured" : "content-only",
      relatedCuisines: Object.entries(cuisines)
        .filter(([otherName, otherCuisine]) => otherName !== name && otherCuisine.region === region)
        .slice(0, 6)
        .map(([otherName]) => otherName),
    } satisfies CuisineRecord;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const featuredCuisines = allCuisines.filter((cuisine) => cuisine.featured);

export const regions = Array.from(
  new Map(
    allCuisines.map((cuisine) => [
      cuisine.regionSlug,
      {
        name: cuisine.region,
        slug: cuisine.regionSlug,
        continent: cuisine.continent,
        cuisines: allCuisines.filter((item) => item.region === cuisine.region),
      },
    ])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));

export function getCuisineBySlug(slug: string) {
  return allCuisines.find((cuisine) => cuisine.slug === slug);
}

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}

export function getProductsForCuisine(name: string) {
  return products.filter((product) => product.country === name);
}

export function groupProductsByCollection<T extends { collection?: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = item.collection || "Taste Collection";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}
