import type { MetadataRoute } from "next";
const canonicalRoutes=["","/about","/services","/executive-protection","/airport-crew-security","/secure-transportation","/corporate-security","/journey-management","/security-consulting","/industries","/coverage","/locations/lagos","/locations/abuja","/contact","/emergency-response","/operations-center","/resources","/privacy","/terms"];
export default function sitemap():MetadataRoute.Sitemap {
  const base="https://security-solutions.africa";
  return canonicalRoutes.map(route=>({
    url:`${base}${route}`,
    lastModified:new Date(),
    changeFrequency:route===""?"weekly":"monthly",
    priority:route===""?1:route==="/contact"||route==="/emergency-response"?0.9:route.startsWith("/locations/")?0.85:0.8,
  }));
}
