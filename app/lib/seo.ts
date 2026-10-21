import type { Metadata } from "next";

export const SITE_URL = "https://security-solutions.africa";
export const SITE_NAME = "Africa Security Solutions";
export const PUBLIC_ROUTES = ["/", "/about", "/services", "/executive-protection", "/airport-crew-security", "/secure-transportation", "/corporate-security", "/journey-management", "/security-consulting", "/industries", "/coverage", "/locations/lagos", "/locations/abuja", "/contact", "/emergency-response", "/operations-center", "/resources", "/privacy", "/terms"] as const;
export const SERVICE_ROUTES = ["/executive-protection", "/airport-crew-security", "/secure-transportation", "/corporate-security", "/journey-management", "/security-consulting"] as const;
export const DEFAULT_DESCRIPTION = "Security coordination across West Africa: executive protection, secure transportation, airport and crew support, journey management and risk consulting. Assignments subject to assessment and confirmation.";

export function pageMetadata(path: string, metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string" ? metadata.title.replace(/ \| Africa Security Solutions$/, "") : "Security Services in West Africa";
  const description = metadata.description || DEFAULT_DESCRIPTION;
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    ...metadata,
    title,
    description,
    alternates: { ...metadata.alternates, canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: SITE_NAME, title: fullTitle, description, url: path, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  };
}
