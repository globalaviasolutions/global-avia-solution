import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Security Consulting Nigeria | Global Avia Solution",
  description: "Risk assessments, security audits, travel security plans, emergency procedures, and crisis preparedness in Nigeria.",
};

export default function SecurityConsultingPage() {
  return (
    <ServicePage
      eyebrow="Security Consulting Nigeria"
      title="Security Consulting"
      intro="Practical security advice, risk assessment, travel planning, and operational preparedness for organisations working in Nigeria."
      imageClass="serviceConsultingHero"
      features={["Risk assessments", "Travel security plans", "Security audits", "Emergency procedures", "Journey protocols", "Staff briefings", "Crisis planning", "Security vendor review"]}
      audiences={["International Companies", "Airlines", "NGOs", "Hotels", "Project Operators", "Corporate Travel Teams"]}
    />
  );
}
