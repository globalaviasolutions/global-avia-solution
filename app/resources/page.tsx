import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Resources Centre",
  description: "Practical security planning guides for executive travel, airport arrivals, crews, journeys and corporate operations in Nigeria and West Africa.",
};

const resources = [
  ["Travel Security", "Nigeria travel security planning", "A practical framework for preparing travellers, routes, communications and contingencies before arrival.", "/resources/travel-security-nigeria"],
  ["Executive Protection", "Executive protection checklist", "The information required to assess protective coverage, secure mobility, privacy and operational complexity.", "/resources/executive-protection-checklist"],
  ["Airport Operations", "Airport arrival security guide", "A structured approach to meet-and-assist coordination, traveller verification and secure onward transfers.", "/resources/airport-arrival-guide"],
  ["Journey Management", "Journey planning guide", "How route assessment, check-ins, escalation triggers and alternatives support controlled road movements.", "/resources/journey-planning-guide"],
  ["Corporate Security", "Project security planning", "Questions to address when preparing offices, sites, events, visiting teams and project movements.", "/corporate-security"],
  ["Crisis Preparation", "Urgent response information", "The minimum information needed when requesting urgent operational review or incident coordination.", "/emergency-response"],
];

export default function ResourcesPage(){return <main>
<header className="siteHeader enterpriseHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/locations">Locations</a><a href="/resources">Resources</a><a href="/standards">Standards</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Consultation</a></nav></header>
<section className="enterpriseHero resourcesHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs"><a href="/">Home</a><span>›</span><span>Resources</span></nav><p className="eyebrow">Resources centre</p><h1>Practical guidance for security-conscious operations.</h1><p className="lead">Planning notes, checklists and operational frameworks for organisations and travellers preparing movements across Nigeria and West Africa.</p></div></section>
<section className="enterpriseIntro"><div><p className="eyebrow">Planning library</p><h2>Useful before the first operational call.</h2></div><p>Resources provide general preparation guidance only. They do not replace a location-specific risk assessment, legal advice or a confirmed service plan.</p></section>
<section className="resourceGrid">{resources.map(([tag,title,text,href],index)=><article key={title}><div className="resourceNumber">0{index+1}</div><span>{tag}</span><h2>{title}</h2><p>{text}</p><a href={href}>Open resource →</a></article>)}</section>
<section className="enterpriseSplit"><div><p className="eyebrow">Custom briefings</p><h2>Need guidance for a specific trip or project?</h2><p>Send the locations, dates, traveller profile and operational purpose. We can assess whether a tailored planning brief is appropriate.</p></div><div className="contactActions"><a className="button primary" href="/contact">Request a briefing</a><a className="button secondary" href="/standards">Read our standards</a></div></section>
</main>}
