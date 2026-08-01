import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description: "Leadership structure, governance principles and operational accountability at Africa Security Solutions.",
};

const functions = [
  ["01", "Managing Director", "Corporate direction, client accountability, governance and strategic partnerships."],
  ["02", "Operations Director", "Operational planning, resource coordination, quality control and escalation oversight."],
  ["03", "Regional Coordination", "Local partner communication, location readiness and assignment support across operating markets."],
  ["04", "Security Advisors", "Risk assessment, protective planning, journey management and client-specific advisory support."],
];

const principles = ["Clear lines of accountability", "No fictional biographies or credentials", "Written scope before deployment", "Confidential client handling", "Lawful and proportionate service delivery", "Continuous operational review"];

export default function LeadershipPage() {
  return <main>
    <header className="siteHeader enterpriseHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/locations">Locations</a><a href="/resources">Resources</a><a href="/standards">Standards</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Consultation</a></nav></header>
    <section className="enterpriseHero leadershipHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs"><a href="/">Home</a><span>›</span><span>Leadership</span></nav><p className="eyebrow">Leadership & governance</p><h1>Accountability built into every assignment.</h1><p className="lead">Our organisational structure is designed around clear responsibility, disciplined communication and documented operational control.</p></div></section>
    <section className="enterpriseIntro"><div><p className="eyebrow">Organisational structure</p><h2>Roles before personalities.</h2></div><p>Until named executives and verified biographies are approved for publication, this page presents the functions required to govern the company responsibly without inventing people, experience or credentials.</p></section>
    <section className="leadershipGrid">{functions.map(([n,t,x])=><article key={t}><span>{n}</span><h2>{t}</h2><p>{x}</p></article>)}</section>
    <section className="enterpriseSplit"><div><p className="eyebrow">Governance principles</p><h2>Professional decisions must be traceable.</h2><p>Assignments should move through briefing, assessment, approval, coordination and review with an identifiable owner at every stage.</p></div><div className="enterpriseList">{principles.map(item=><span key={item}>{item}</span>)}</div></section>
    <section className="contactSection"><div><p className="eyebrow">Corporate enquiries</p><h2>Speak with the company about capability or partnerships.</h2></div><div className="contactActions"><a className="button primary" href="/contact">Contact leadership</a><a className="button secondary" href="/standards">View standards</a></div></section>
  </main>;
}
