import type { Metadata } from "next";
import { SITE_URL, SERVICE_ROUTES } from "../lib/seo";

export default function PageStructuredData({ path, metadata }: { path: string; metadata: Metadata }) {
  const url = `${SITE_URL}${path}`;
  const name = typeof metadata.title === "string" ? metadata.title : "Security Services in West Africa";
  const page = {
    "@type": "WebPage", "@id": `${url}#webpage`, url, name,
    description: metadata.description, inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
  const graph: object[] = [page];
  if ((SERVICE_ROUTES as readonly string[]).includes(path)) {
    graph.push({ "@type": "Service", "@id": `${url}#service`, name,
      description: metadata.description, url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "West Africa", mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  }
  // City pages already render their visible three-level breadcrumb in LocationPage.
  if (path !== "/" && !path.startsWith("/locations/")) {
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: url },
    ] });
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
