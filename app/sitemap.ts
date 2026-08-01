import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://security-solutions.africa";
  const routes = [
    "","/about","/contact","/faq","/careers","/privacy","/terms","/services","/industries","/coverage","/locations",
    "/executive-protection","/airport-crew-security","/secure-transportation","/corporate-security","/journey-management","/security-consulting",
    "/industries/aviation","/industries/oil-gas","/industries/embassies-ngos","/industries/corporate-travel","/industries/construction","/industries/hospitality",
    "/locations/lagos","/locations/abuja","/locations/port-harcourt","/locations/kano","/locations/uyo","/locations/calabar","/locations/enugu","/locations/warri",
  ];
  return routes.map((route)=>({
    url:`${base}${route}`,
    lastModified:new Date(),
    changeFrequency:route===""?"weekly":"monthly",
    priority:route===""?1:route==="/contact"?0.9:route==="/services"||route==="/industries"||route==="/coverage"||route==="/locations"?0.85:route.startsWith("/locations/")?0.82:0.8,
  }));
}
