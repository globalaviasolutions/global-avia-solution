import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Response Requests",
  description: "Submit urgent security coordination, journey recovery and incident support requests in Nigeria and West Africa.",
};

const capabilities = [
  ["01", "Urgent operational review", "Rapid assessment of location, people affected, immediate exposure and available communication channels."],
  ["02", "Journey recovery", "Support planning for disrupted routes, delayed arrivals, vehicle issues or movement changes."],
  ["03", "Incident coordination", "Structured communication, stakeholder updates, escalation tracking and next-step planning."],
  ["04", "Evacuation planning support", "Assessment and coordination support where relocation or evacuation options must be considered."],
  ["05", "Airport and hotel movement", "Time-sensitive review of arrivals, departures, transfers and temporary accommodation movements."],
  ["06", "Crisis communications", "A single point of contact for collecting facts, documenting decisions and coordinating agreed actions."],
];

export default function EmergencyResponsePage() {
  return <main>
    <header className="siteHeader enterpriseHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/coverage">Coverage</a><a href="/locations">Locations</a><a href="/resources">Resources</a><a href="/standards">Standards</a><a href="/contact">Contact</a><a className="emergencyNav" href="/contact">Urgent Request</a></nav></header>
    <section className="enterpriseHero emergencyHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs"><a href="/">Home</a><span>›</span><span>Emergency Response</span></nav><p className="eyebrow emergencyEyebrow">Urgent operational requests</p><h1>Clear information. Rapid assessment. Controlled coordination.</h1><p className="lead">This channel is intended for urgent security and movement requests. Assistance remains subject to communication, lawful availability, operational feasibility and written confirmation.</p><div className="actions"><a className="button emergencyButton" href="/contact">Submit urgent request</a><a className="button secondary" href="mailto:info@security-solutions.africa?subject=URGENT%20Operational%20Request">Email urgent details</a></div></div></section>
    <section className="urgentNotice"><strong>Important</strong><p>This website is not a replacement for police, fire, ambulance or other public emergency services. Contact the appropriate local authority first where there is an immediate threat to life.</p></section>
    <section className="enterpriseIntro"><div><p className="eyebrow">Information to prepare</p><h2>Help us understand the situation quickly.</h2></div><div className="enterpriseList"><span>Exact current location</span><span>Number and condition of people involved</span><span>Immediate threat or disruption</span><span>Safe callback number and email</span><span>Vehicles, route and destination</span><span>Authorities or organisations already contacted</span></div></section>
    <section className="leadershipGrid emergencyGrid">{capabilities.map(([n,t,x])=><article key={t}><span>{n}</span><h2>{t}</h2><p>{x}</p></article>)}</section>
    <section className="enterpriseSplit"><div><p className="eyebrow">Response workflow</p><h2>Assessment before commitment.</h2></div><div className="processGrid compactProcess">{[["01","Receive","Collect verified facts and contact details."],["02","Assess","Review urgency, location, legality and feasibility."],["03","Confirm","Set out available support and limitations in writing."],["04","Coordinate","Maintain agreed communication and action tracking."]].map(([n,t,x])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></article>)}</div></section>
  </main>;
}
