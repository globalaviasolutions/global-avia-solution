import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Journey Management Nigeria | Global Avia Solution",
  description: "Route assessment, movement coordination, travel briefings, tracking, and contingency planning across Nigeria.",
};

export default function JourneyManagementPage() {
  return (
    <ServicePage
      eyebrow="Journey Management Nigeria"
      title="Journey Management"
      intro="Route assessment, movement coordination, contingency planning, and operational support for personnel travelling across Nigeria."
      imageClass="serviceJourneyHero"
      features={["Route assessment", "Travel security briefings", "Driver coordination", "Movement monitoring", "Check-in procedures", "Alternative route planning", "Incident escalation", "Emergency support"]}
      audiences={["Energy Teams", "NGOs", "Executives", "Aviation Crews", "Project Personnel", "International Visitors"]}
    />
  );
}
