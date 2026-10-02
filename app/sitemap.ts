import { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES } from "@/lib/catalog";

const BASE_URL = "https://vicinix.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/enquire`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/apps/invoice`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/apps/menu`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = Object.values(CATEGORIES).map((cat) => ({
    url: `${BASE_URL}/solutions/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Product routes
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((prod) => ({
    url: `${BASE_URL}/products/${prod.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: prod.status === "delivered" ? 0.9 : 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
