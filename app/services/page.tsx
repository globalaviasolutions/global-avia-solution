import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Services",
  description: "Explore executive protection, airport and crew security, secure transportation, corporate security, journey management and security consulting across Nigeria and West Africa.",
};

const services = [
  { title: "Executive Protection", href: "/executive-protection", code: "01", summary: "Discreet close protection for executives, diplomats, VIP guests and international teams.", bestFor: "Executive visits, delegations and high-profile movements", features: ["Protective advance", "Close protection", "Venue coordination", "Secure movements"] },
  { title: "Airport & Crew Security", href: "/airport-crew-security", code: "02", summary: "Aviation-focused coordination from aircraft arrival through hotel transfer and onward movement.", bestFor: "Airline crews, private aviation and technical teams", features: ["Airport liaison", "Crew escort", "Hotel transfers", "Schedule coordination"] },
  { title: "Secure Transportation", href: "/secure-transportation", code: "03", summary: "Professional secure mobility with route planning, vetted drivers and operational oversight.", bestFor: "Corporate travellers, VIPs and project personnel", features: ["Secure vehicles", "Route planning", "Driver coordination", "Movement tracking"] },
  { title: "Corporate Security", href: "/corporate-security", code: "04", summary: "Practical security support for offices, projects, events, visiting teams and business operations.", bestFor: "Companies, conferences and temporary projects", features: ["Site review", "Access planning", "Event support", "Visitor security"] },
  { title: "Journey Management", href: "/journey-management", code: "05", summary: "Structured planning and oversight for personnel movements across complex operating environments.", bestFor: "Multi-city travel, remote sites and staff rotations", features: ["Route assessment", "Check-in procedures", "Contingency plans", "Escalation support"] },
  { title: "Security Consulting", href: "/security-consulting", code: "06", summary: "Risk assessments, security audits, travel plans and crisis preparedness for organisations.", bestFor: "Market entry, project planning and governance", features: ["Risk assessment", "Security audit", "Policy review", "Crisis planning"] },
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Africa Security Solutions services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://security-solutions.africa${service.href}`,
      name: service.title,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="contentHero servicesOverviewHero">
        <p className="eyebrow">Integrated security capability</p>
        <h1>One partner for protection, mobility and risk management.</h1>
        <p className="lead">Select the service that best matches your operational requirement. Complex assignments can combine several capabilities under one coordinated plan.</p>
      </section>

      <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Services</span></nav>

      <section className="servicesOverviewSection">
        <div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Service portfolio</p><h2>Support built around the assignment.</h2></div><p>Scope, resources and communication procedures are defined after an initial briefing and operational assessment.</p></div>
        <div className="servicesOverviewGrid">
          {services.map((service) => (
            <article key={service.title}>
              <span className="serviceCode">{service.code}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <div className="bestFor"><strong>Best suited for</strong><span>{service.bestFor}</span></div>
              <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a className="textLink" href={service.href}>Explore service →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="emergencyRequestSection">
        <div><p className="eyebrow">Time-sensitive request</p><h2>Need support for an urgent arrival or movement?</h2><p>Send the city, date, arrival time, traveller count and required service. Availability depends on location, timing and operational assessment.</p></div>
        <div className="contactActions"><a className="button primary" href="/contact">Submit urgent request</a><a className="button secondary" href="mailto:info@security-solutions.africa?subject=Urgent%20security%20request">Email operations</a></div>
      </section>

      <footer><div className="footerGrid"><div><img src="/logo.svg" alt="Africa Security Solutions"/><p>Executive protection, secure transportation and risk management across Nigeria and West Africa.</p></div><div><h4>Services</h4>{services.slice(0,4).map(s=><a key={s.title} href={s.href}>{s.title}</a>)}</div><div><h4>Explore</h4><a href="/industries">Industries</a><a href="/about">About Us</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></div><div><h4>Contact</h4><a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a><span>Lagos, Nigeria</span><a href="https://security-solutions.africa">security-solutions.africa</a></div></div><div className="footerBottom"><small>© 2026 Africa Security Solutions. All rights reserved.</small><small><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></small></div></footer>
    </main>
  );
}
