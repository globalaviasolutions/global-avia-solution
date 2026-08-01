import type { Metadata } from "next";
import PrintCapabilityButton from "../components/PrintCapabilityButton";

export const metadata: Metadata = {
  title: "Corporate Capability Statement",
  description: "Corporate capability statement for Africa Security Solutions covering services, industries, operating locations, standards and contact information.",
  alternates: { canonical: "/capability-statement" },
};

const services = [
  "Executive protection and protective accompaniment",
  "Airport, crew and aviation security coordination",
  "Secure ground transportation and driver coordination",
  "Journey management and movement monitoring",
  "Corporate, project and event security planning",
  "Risk assessments, audits and security consulting",
];

const industries = ["Aviation", "Oil & Gas", "Embassies & NGOs", "Corporate Travel", "Construction", "Hospitality"];
const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Uyo", "Calabar", "Enugu", "Warri"];
const principles = [
  "Lawful delivery and verification of local requirements",
  "Confidential handling of client and operational information",
  "Clear written scope, assumptions and escalation arrangements",
  "Proportionate security measures based on assessed requirements",
  "Partner and supplier review before confirmed deployment",
  "Professional conduct, accountability and incident reporting",
];

export default function CapabilityStatementPage() {
  return (
    <main id="main-content" className="capabilityPage">
      <section className="capabilityCover">
        <div className="capabilityCoverTop"><img src="/logo.svg" alt="Africa Security Solutions" /><span>Corporate Capability Statement · 2026</span></div>
        <div className="capabilityCoverCopy">
          <p className="eyebrow">African expertise · International standards</p>
          <h1>Security planning for people, travel and operations across Africa.</h1>
          <p>Africa Security Solutions supports organisations requiring executive protection, secure mobility, aviation support, journey management and risk consulting in Nigeria and selected West African markets.</p>
          <div className="capabilityActions"><PrintCapabilityButton /><a className="button secondary" href="/contact">Request consultation</a></div>
        </div>
        <div className="capabilityCoverFooter"><span>security-solutions.africa</span><span>info@security-solutions.africa</span><span>Lagos, Nigeria</span></div>
      </section>

      <section className="capabilitySection capabilityOverview">
        <div><p className="eyebrow">Company overview</p><h2>One point of coordination for complex movements and assignments.</h2></div>
        <div><p>Our operating model begins with a detailed brief, followed by assessment of location, schedule, traveller profile, routes, communications, lawful availability and required resources. Services are confirmed only after written scope and operational feasibility have been agreed.</p><p>We are building a scalable African security platform designed for international companies, aviation operators, project teams, diplomatic organisations and executive travellers.</p></div>
      </section>

      <section className="capabilitySection"><div className="capabilityHeading"><p className="eyebrow">Core capabilities</p><h2>Services structured around the mission.</h2></div><div className="capabilityGrid">{services.map((service,index)=><article key={service}><span>0{index+1}</span><h3>{service}</h3></article>)}</div></section>

      <section className="capabilityBand"><div><p className="eyebrow">Industry experience model</p><h2>Support designed for demanding operating environments.</h2></div><div className="capabilityTags">{industries.map(item=><span key={item}>{item}</span>)}</div></section>

      <section className="capabilitySection capabilityTwoColumn">
        <article><p className="eyebrow">Nigeria coverage</p><h2>Priority operating locations.</h2><div className="capabilityList">{locations.map(item=><span key={item}>{item}</span>)}</div><p className="capabilityNote">Additional locations and selected West African assignments are assessed case by case, subject to timing, local requirements and confirmed partner capacity.</p></article>
        <article><p className="eyebrow">Operating principles</p><h2>Professional standards embedded in planning.</h2><div className="capabilityList">{principles.map(item=><span key={item}>{item}</span>)}</div></article>
      </section>

      <section className="capabilitySection capabilityProcess"><div className="capabilityHeading"><p className="eyebrow">Engagement process</p><h2>From briefing to coordinated delivery.</h2></div><div className="capabilitySteps">{[
        ["01","Initial brief","Dates, locations, routes, traveller profile and required support."],
        ["02","Assessment","Operational constraints, risk factors, resources and lawful availability."],
        ["03","Written proposal","Scope, assumptions, pricing basis, communications and next steps."],
        ["04","Coordination","Confirmed personnel and resources briefed through assignment completion."],
      ].map(([n,t,x])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></article>)}</div></section>

      <section className="capabilityContact"><div><p className="eyebrow">Contact</p><h2>Discuss an assignment or supplier registration request.</h2><p>Provide the location, date, service requirement, number of travellers or personnel and any procurement documentation that must be completed.</p></div><div><a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a><a href="https://security-solutions.africa">security-solutions.africa</a><span>Lagos, Nigeria</span><a className="button primary" href="/contact">Submit a request</a></div></section>

      <p className="capabilityDisclaimer">This capability statement describes the intended service model of Africa Security Solutions. Specific services, licences, personnel, equipment, response times and geographical availability remain subject to due diligence, applicable law, operational assessment and written confirmation. Company registration, licences, insurance details and verified references should be inserted before use in formal procurement.</p>
    </main>
  );
}
