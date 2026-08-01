import ServicePage from "../components/ServicePage";

export const metadata = {
  title: "Secure Transportation in Nigeria | Global Avia Solution",
  description: "Secure airport transfers, professional drivers, route planning, and journey management for clients operating in Nigeria.",
};

export default function SecureTransportationPage() {
  return (
    <ServicePage
      eyebrow="Secure mobility · Nigeria"
      title="Secure Transportation"
      intro="Professional drivers, secure transfers, route planning, and journey management for executives, crews, project teams, and VIP visitors."
      imageClass="transportVisual"
      features={[
        "Airport transfers",
        "Professional drivers",
        "Secure SUV coordination",
        "Route planning",
        "Movement monitoring",
        "Convoy coordination",
        "Standby vehicles",
        "Alternative route planning",
      ]}
      audiences={[
        "Executives",
        "Flight Crews",
        "Project Teams",
        "Diplomatic Visitors",
        "VIP Families",
        "Corporate Groups",
      ]}
    />
  );
}
