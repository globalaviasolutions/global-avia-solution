import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://security-solutions.africa";
  const routes = [
    "","/about","/contact","/faq","/careers","/privacy","/terms","/services","/industries",
    "/executive-protection","/airport-crew-security","/secure-transportation","/corporate-security","/journey-management","/security-consulting",
    "/industries/aviation","/industries/oil-gas","/industries/embassies-ngos","/industries/corporate-travel","/industries/construction","/industries/hospitality",
  ];
  return routes.map((route)=>({url:`${base}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:route==="/contact"?0.9:route==="/services"||route==="/industries"?0.85:0.8}));
}
