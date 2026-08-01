import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Services by Location",
  description: "Explore executive protection, secure transportation, airport support and journey management capabilities in Lagos, Abuja, Port Harcourt and other Nigerian locations.",
};

const locations = [
  { city:"Lagos", href:"/locations/lagos", code:"LOS", text:"Airport movements, executive visits, corporate schedules, hospitality and maritime-linked operations." },
  { city:"Abuja", href:"/locations/abuja", code:"ABV", text:"Diplomatic, government, NGO, executive and international delegation support in the federal capital." },
  { city:"Port Harcourt", href:"/locations/port-harcourt", code:"PHC", text:"Energy-sector movements, airport transfers, project personnel and remote-site journey coordination." },
];

export default function LocationsPage(){return <main>
<header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/coverage">Coverage</a><a href="/locations">Locations</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav></header>
<section className="locationsHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Locations</span></nav><p className="eyebrow">Nigeria operations</p><h1>Security support shaped around local operating conditions.</h1><p className="lead">Explore our priority operating locations and the services that can be structured around airport arrivals, executive programmes, project movements and corporate schedules.</p></div></section>
<section className="locationsOverview"><div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Priority locations</p><h2>Local planning. One operational standard.</h2></div><p>Availability is assessed case by case. No service, resource or armed support is confirmed until lawful arrangements, partner capacity and operational scope have been verified.</p></div><div className="locationCardGrid">{locations.map((location)=><article key={location.city}><span>{location.code}</span><h2>{location.city}</h2><p>{location.text}</p><a href={location.href}>Explore {location.city} →</a></article>)}</div></section>
<section className="locationNotice"><div><p className="eyebrow">Additional Nigerian locations</p><h2>Support requests can also be assessed for Kano, Uyo, Calabar, Enugu and Warri.</h2><p>Feasibility depends on timing, route, required resources, local arrangements and operational risk.</p></div><a className="button primary" href="/contact">Request a location assessment</a></section>
</main>}
