import ServicePage from "../components/ServicePage";

export const metadata = {
  title: "Airport & Crew Security in Nigeria | Global Avia Solution",
  description: "Airport coordination, crew protection, secure hotel transfers, and aviation security support across Nigeria.",
};

export default function AirportCrewSecurityPage() {
  return (
    <ServicePage
      eyebrow="Aviation security · Nigeria"
      title="Airport & Crew Security"
      intro="Aviation-focused coordination for airline crews, charter operators, technical teams, and VIP passengers from arrival through departure."
      imageClass="airportVisual"
      features={[
        "Airport meet and assist",
        "Crew protection coordination",
        "Secure crew transportation",
        "Hotel arrival support",
        "Movement monitoring",
        "Airport liaison",
        "VIP arrival assistance",
        "24/7 operations contact",
      ]}
      audiences={[
        "Airline Crews",
        "Private Aviation",
        "Technical Teams",
        "Charter Operators",
        "VIP Passengers",
        "Airline Management",
      ]}
    />
  );
}
