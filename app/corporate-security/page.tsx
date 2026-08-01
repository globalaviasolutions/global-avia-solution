import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Corporate Security Nigeria | Global Avia Solution",
  description: "Corporate security planning for offices, facilities, events, projects, and international business teams across Nigeria.",
};

export default function CorporateSecurityPage() {
  return (
    <ServicePage
      eyebrow="Corporate Security Nigeria"
      title="Corporate Security"
      intro="Security planning and operational support for offices, facilities, projects, conferences, and visiting international teams."
      imageClass="serviceCorporateHero"
      features={["Site security reviews", "Visitor management", "Executive visit support", "Event security planning", "Access coordination", "Emergency procedures", "Security briefings", "Incident escalation support"]}
      audiences={["Corporate Offices", "Construction Projects", "Hotels & Venues", "Financial Services", "International Companies", "Conferences & Events"]}
    />
  );
}
