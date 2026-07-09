import type { MetadataRoute } from "next";
import { allCuisines, regions } from "@/lib/cuisines";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culinary-atlas-v1.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/cuisines", "/regions", "/map", "/guides"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cuisineRoutes = allCuisines.map((cuisine) => ({
    url: `${siteUrl}/cuisines/${cuisine.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: cuisine.featured ? 0.9 : 0.65,
  }));

  const regionRoutes = regions.map((region) => ({
    url: `${siteUrl}/regions/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...cuisineRoutes, ...regionRoutes];
}
