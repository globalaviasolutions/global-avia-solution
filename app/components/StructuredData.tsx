export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://security-solutions.africa/#organization",
    name: "Africa Security Solutions",
    url: "https://security-solutions.africa",
    logo: "https://security-solutions.africa/brand-horizontal.png",
    email: "info@security-solutions.africa",
    contactPoint: [{"@type":"ContactPoint",contactType:"customer enquiries",email:"info@security-solutions.africa",availableLanguage:["English"]}],
    description:
      "Executive protection, secure transportation, aviation support, corporate security, journey management and risk consulting across Nigeria and West Africa.",
    areaServed: ["Nigeria", "West Africa"],
    knowsAbout: [
      "Executive protection",
      "Secure transportation",
      "Airport and crew security",
      "Journey management",
      "Corporate security",
      "Security risk consulting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [data, { "@type": "WebSite", "@id": "https://security-solutions.africa/#website", url: "https://security-solutions.africa/", name: "Africa Security Solutions", publisher: { "@id": data["@id"] }, inLanguage: "en" }] }).replace(/</g, "\\u003c") }}
    />
  );
}
