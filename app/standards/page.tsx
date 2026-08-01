import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standards & Compliance",
  description: "Our approach to lawful service delivery, confidentiality, partner due diligence, anti-bribery, professional conduct and operational accountability.",
};

const principles = [
  ["01", "Lawful Service Delivery", "Every assignment is subject to applicable law, licensing requirements, written scope, operational feasibility and authorised partner availability."],
  ["02", "Partner Due Diligence", "Operational partners and suppliers should be assessed for identity, capability, legal standing, relevant credentials and suitability for the requested task."],
  ["03", "Confidentiality", "Client identity, itinerary, routes, accommodation, contact details and operational information are handled on a need-to-know basis."],
  ["04", "Anti-Bribery", "We do not support bribery, facilitation payments, improper influence or concealed commissions. Concerns should be escalated before work continues."],
  ["05", "Professional Conduct", "Personnel are expected to act with discipline, respect, discretion, non-discrimination and appropriate regard for client privacy and local communities."],
  ["06", "Incident Accountability", "Material incidents, deviations and safety concerns should be documented, escalated and reviewed against the agreed operational plan."],
  ["07", "Proportionate Security", "Resources and protective measures should reflect the assessed risk, lawful authority and actual operational requirement."],
  ["08", "Data Minimisation", "Only information reasonably necessary to assess, plan and coordinate an assignment should be collected and retained."],
];

export default function StandardsPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/coverage">Coverage</a><a href="/standards">Standards</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="standardsHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Standards & Compliance</span></nav>
          <p className="eyebrow">Professional responsibility</p>
          <h1>Security services built on lawful, accountable conduct.</h1>
          <p className="lead">Our operating principles are designed to support responsible decision-making, protect client confidentiality and establish clear expectations for personnel, partners and suppliers.</p>
        </div>
      </section>

      <section className="standardsIntro">
        <div><p className="eyebrow">Our commitment</p><h2>Clear expectations before any assignment begins.</h2></div>
        <p>Commercial urgency never removes the need for lawful authority, suitable resources, appropriate oversight and written confirmation. Where requirements cannot be verified or delivered responsibly, the service should not be confirmed.</p>
      </section>

      <section className="standardsGrid">
        {principles.map(([number, title, text]) => <article key={title}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}
      </section>

      <section className="standardsProcess">
        <div className="sectionHeading"><p className="eyebrow">Operational governance</p><h2>How standards are applied.</h2></div>
        <div className="processGrid">
          {[
            ["01", "Brief and screen", "Clarify the client, purpose, location, service requirement and lawful basis for support."],
            ["02", "Verify resources", "Confirm partner capacity, credentials, availability and any required permits or authority."],
            ["03", "Document scope", "Record assumptions, responsibilities, limitations, communications and escalation procedures."],
            ["04", "Review delivery", "Capture material changes, incidents and lessons that should improve future planning."],
          ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="standardsNotice">
        <div><p className="eyebrow">Development notice</p><h2>Policies must match the final legal and operating structure.</h2><p>This page states intended operating principles for the developing brand. Final policies, licensing statements, reporting channels and contractual language should be reviewed by qualified Nigerian legal and compliance advisers before commercial launch.</p></div>
        <a className="button primary" href="/contact">Contact our team</a>
      </section>
    </main>
  );
}
