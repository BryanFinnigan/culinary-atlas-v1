import type { MetadataRoute } from "next";
import {
  allCuisines,
  allProducts,
  getCategoriesForCollection,
  getCollectionsForCuisine,
  productSlug,
  regions,
} from "@/lib/cuisines";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culinaryatlasguide.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/cuisines", "/regions", "/map", "/guides"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cuisineRoutes = allCuisines.map((cuisine) => ({
    url: `${siteUrl}/cuisines/${cuisine.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: cuisine.featured ? 0.9 : 0.65,
  }));

  const collectionRoutes = allCuisines.flatMap((cuisine) =>
    getCollectionsForCuisine(cuisine.name).map((collection) => ({
      url: `${siteUrl}/cuisines/${cuisine.slug}/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.78,
    }))
  );

  const categoryRoutes = allCuisines.flatMap((cuisine) =>
    getCollectionsForCuisine(cuisine.name).flatMap((collection) =>
      getCategoriesForCollection(cuisine.slug, collection.slug).map((category) => ({
        url: `${siteUrl}/cuisines/${cuisine.slug}/${collection.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.72,
      }))
    )
  );

  const productRoutes = allProducts.map((product) => ({
    url: `${siteUrl}/products/${productSlug(product)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.68,
  }));

  const regionRoutes = regions.map((region) => ({
    url: `${siteUrl}/regions/${region.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...cuisineRoutes,
    ...collectionRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...regionRoutes,
  ];
}
