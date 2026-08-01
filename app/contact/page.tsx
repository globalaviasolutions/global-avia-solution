import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Africa Security Solutions",
  description: "Request executive protection, secure transportation, airport and crew security, corporate security or risk consulting across Nigeria and West Africa.",
};

export default function ContactPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/#services">Services</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="#request">Request Protection</a></nav>
      </header>

      <section className="serviceHero contactHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <p className="eyebrow">Contact our operations team</p>
          <h1>Request security assistance in Africa.</h1>
          <p className="lead">Share the location, date, number of travellers and required service. We will review the request and respond with the next steps.</p>
        </div>
      </section>

      <section className="contactPageSection" id="request">
        <div className="contactPageCopy">
          <p className="eyebrow">Operational request</p>
          <h2>Tell us about the assignment.</h2>
          <p>For urgent enquiries, include arrival time, city, passenger count, schedule and any known operational constraints.</p>
          <div className="contactDetails">
            <a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a>
            <span>Lagos, Nigeria</span>
            <span>24/7 requests reviewed subject to availability</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
