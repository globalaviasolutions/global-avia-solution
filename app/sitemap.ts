import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://global-avia-solution.vercel.app";
  const routes = [
    "",
    "/about",
    "/contact",
    "/executive-protection",
    "/airport-crew-security",
    "/secure-transportation",
    "/corporate-security",
    "/journey-management",
    "/security-consulting",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
