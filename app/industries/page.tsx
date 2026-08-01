import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Security support for aviation, energy, diplomatic, corporate travel, construction and hospitality operations across Nigeria and West Africa.",
};

const industries = [
  ["Aviation", "/industries/aviation", "Airport, crew, passenger and ground-movement security coordination."],
  ["Oil & Gas", "/industries/oil-gas", "Journey management, site movements and protective support for energy operations."],
  ["Embassies & NGOs", "/industries/embassies-ngos", "Discreet mobility and security planning for diplomatic and humanitarian teams."],
  ["Corporate Travel", "/industries/corporate-travel", "Executive protection and secure transport for visiting business personnel."],
  ["Construction", "/industries/construction", "Project-site movement planning, personnel support and risk coordination."],
  ["Hospitality", "/industries/hospitality", "VIP arrivals, event movements and guest security support."],
];

export default function IndustriesPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/#services">Services</a><a href="/industries">Industries</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="contentHero industriesOverviewHero">
        <p className="eyebrow">Industry expertise</p>
        <h1>Security designed around how your organisation operates.</h1>
        <p className="lead">Different sectors face different movement, access, personnel and continuity risks. Our planning begins with the operational context.</p>
      </section>

      <section className="industryOverviewGrid">
        {industries.map(([title, href, text], index) => (
          <a href={href} key={title} className="industryOverviewCard">
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <strong>Explore industry →</strong>
          </a>
        ))}
      </section>

      <section className="contactSection">
        <div><p className="eyebrow">Tailored planning</p><h2>Discuss your operating environment.</h2><p>Share the country, city, schedule, traveller profile and operational requirements.</p></div>
        <a className="button primary" href="/contact">Request a consultation</a>
      </section>
    </main>
  );
}
