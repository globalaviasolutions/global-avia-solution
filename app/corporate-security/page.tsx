import PageStructuredData from "../components/PageStructuredData";
import { pageMetadata } from "../lib/seo";
import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = pageMetadata("/corporate-security", {
  title: "Corporate Security Services in Nigeria",
  alternates: { canonical: "/corporate-security" },
  description: "Corporate security planning for offices, facilities, events, projects, and international business teams across Nigeria.",
});

export default function CorporateSecurityPage() {
  return (<> <PageStructuredData path="/corporate-security" metadata={metadata} />
    <ServicePage
      eyebrow="Corporate Security Nigeria"
      title="Corporate Security"
      intro="Security planning and operational support for offices, facilities, projects, conferences, and visiting international teams."
      imageClass="serviceCorporateHero"
      features={["Site security reviews", "Visitor management", "Executive visit support", "Event security planning", "Access coordination", "Emergency procedures", "Security briefings", "Incident escalation support"]}
      audiences={["Corporate Offices", "Construction Projects", "Hotels & Venues", "Financial Services", "International Companies", "Conferences & Events"]}
    />
  </>);
}
