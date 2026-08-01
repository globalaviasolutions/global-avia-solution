import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Services by Location",
  description: "Explore executive protection, secure transportation, airport support and journey management capabilities across eight priority Nigerian locations.",
};

const locations = [
  { city:"Lagos", href:"/locations/lagos", code:"LOS", text:"Airport movements, executive visits, corporate schedules, hospitality and maritime-linked operations." },
  { city:"Abuja", href:"/locations/abuja", code:"ABV", text:"Diplomatic, government, NGO, executive and international delegation support in the federal capital." },
  { city:"Port Harcourt", href:"/locations/port-harcourt", code:"PHC", text:"Energy-sector movements, airport transfers, project personnel and remote-site journey coordination." },
  { city:"Kano", href:"/locations/kano", code:"KAN", text:"Airport arrivals, commercial visits, northern Nigeria programmes and intercity journey planning." },
  { city:"Uyo", href:"/locations/uyo", code:"QUO", text:"Executive arrivals, hospitality schedules, project movements and regional support across Akwa Ibom." },
  { city:"Calabar", href:"/locations/calabar", code:"CBQ", text:"Airport transfers, events, hospitality programmes, corporate visits and regional road movements." },
  { city:"Enugu", href:"/locations/enugu", code:"ENU", text:"Corporate visits, government-facing programmes, airport support and south-eastern regional movements." },
  { city:"Warri", href:"/locations/warri", code:"WRI", text:"Energy and industrial movements, technical teams, personnel rotations and journey management." },
];

export default function LocationsPage(){return <main>
<header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/coverage">Coverage</a><a href="/locations">Locations</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav></header>
<section className="locationsHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Locations</span></nav><p className="eyebrow">Nigeria operations</p><h1>Security support shaped around local operating conditions.</h1><p className="lead">Explore eight priority operating locations and the services that can be structured around airport arrivals, executive programmes, project movements and corporate schedules.</p></div></section>
<section className="locationsOverview"><div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Priority locations</p><h2>Local planning. One operational standard.</h2></div><p>Availability is assessed case by case. No service, resource or armed support is confirmed until lawful arrangements, partner capacity and operational scope have been verified.</p></div><div className="locationCardGrid">{locations.map((location)=><article key={location.city}><span>{location.code}</span><h2>{location.city}</h2><p>{location.text}</p><a href={location.href}>Explore {location.city} →</a></article>)}</div></section>
<section className="locationNotice"><div><p className="eyebrow">Other destinations</p><h2>Requests for additional Nigerian and West African locations can be assessed individually.</h2><p>Feasibility depends on timing, route, required resources, local arrangements, licensing and operational risk.</p></div><a className="button primary" href="/contact">Request a location assessment</a></section>
</main>}
