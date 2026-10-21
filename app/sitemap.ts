import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Do not invent lastmod dates: a build is not a content update.
  // Only canonical public pages belong here, never redirects, portals or APIs.
  return PUBLIC_ROUTES.map(path => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
