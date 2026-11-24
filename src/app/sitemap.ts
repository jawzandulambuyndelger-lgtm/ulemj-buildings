import type { MetadataRoute } from "next";
import { products, projects, services } from "@/lib/data";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    "/products",
    "/projects",
    "/marble",
    "/contact",
    "/quote",
    "/privacy",
    ...services.map((s) => `/services/${s.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
