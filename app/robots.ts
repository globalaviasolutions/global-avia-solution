import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Portal landing pages stay crawlable so crawlers can read their noindex tags.
  // API access remains controlled by the existing application authentication.
  const rules = { allow: "/", disallow: ["/api/", "/client-portal?", "/operations-dashboard?", "/contractor-response?"] };
  return {
    rules: [
      { userAgent: "*", ...rules },
      { userAgent: "OAI-SearchBot", ...rules },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
