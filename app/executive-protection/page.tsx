import ServicePage from "../components/ServicePage";

export const metadata = {
  title: "Executive Protection in Nigeria | Global Avia Solution",
  description: "Discreet executive protection for international visitors, corporate leaders, diplomats, and VIP guests operating in Nigeria.",
};

export default function ExecutiveProtectionPage() {
  return (
    <ServicePage
      eyebrow="Executive protection · Nigeria"
      title="Executive Protection Services in Nigeria"
      intro="Discreet close protection for executives, diplomats, international personnel, and high-profile visitors operating across Nigeria."
      imageClass="executiveVisual"
      features={[
        "Close protection coordination",
        "Airport meet and greet",
        "Hotel security support",
        "Route and movement planning",
        "Journey risk assessment",
        "Residential security support",
        "Event protection",
        "Emergency coordination",
      ]}
      audiences={[
        "Corporate Executives",
        "Diplomats",
        "NGO Personnel",
        "Business Travellers",
        "VIP Families",
        "Visiting Delegations",
      ]}
    />
  );
}
