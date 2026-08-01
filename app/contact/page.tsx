import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Africa Security Solutions",
  description: "Request executive protection, secure transportation, airport and crew security, corporate security or risk consulting across Nigeria and West Africa.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="serviceHero contactHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <p className="eyebrow">Contact our operations team</p>
          <h1>Request security assistance in Africa.</h1>
          <p className="lead">Share the location, timing, traveller profile and required support. Every request is reviewed before service availability is confirmed.</p>
        </div>
      </section>

      <section className="contactPageSection" id="request">
        <div className="contactPageCopy">
          <p className="eyebrow">Operational request</p>
          <h2>Tell us about the assignment.</h2>
          <p>Provide as much verified information as possible. For urgent enquiries, include arrival time, route, current location, passenger count and the immediate decision required.</p>
          <div className="contactDetails">
            <a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a>
            <span>Lagos, Nigeria</span>
            <span>Requests reviewed subject to lawful availability and operational feasibility</span>
          </div>
          <div className="contactResponseNote">
            <h3>For immediate danger</h3>
            <p>Contact the relevant police, medical or government emergency service first. This website is not an emergency-service dispatch channel.</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
