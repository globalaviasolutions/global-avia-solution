import PageStructuredData from "../components/PageStructuredData";
import { pageMetadata } from "../lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About Africa Security Solutions",
  description: "Learn about Africa Security Solutions and our approach to executive protection, secure mobility, aviation support, and risk management across Nigeria and West Africa.",
});

export default function AboutPage() {
  return (
    <main><PageStructuredData path="/about" metadata={metadata} />
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/#services">Services</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="serviceHero aboutHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <p className="eyebrow">About Africa Security Solutions</p>
          <h1>African expertise. International standards.</h1>
          <p className="lead">A security and risk management company built for international organisations, executives, aviation teams, and project personnel operating across Nigeria and West Africa.</p>
        </div>
      </section>

      <section className="serviceIntroSection">
        <div><p className="eyebrow">Our purpose</p><h2>Making complex African operations safer and easier to manage.</h2></div>
        <p>We combine structured planning, discreet client service, local operating knowledge, and reliable communication to support people, assets, and business continuity.</p>
      </section>

      <section className="audienceSection">
        <div className="sectionHeading"><p className="eyebrow">Our principles</p><h2>Professional standards at every stage.</h2></div>
        <div className="audienceGrid">
          {[
            ["01", "Discretion", "Client privacy and operational confidentiality are treated as essential."],
            ["02", "Preparation", "Every assignment begins with a clear briefing and proportionate risk assessment."],
            ["03", "Communication", "Clients receive one reliable point of contact throughout the mission."],
            ["04", "Accountability", "Scope, responsibilities, reporting, and escalation procedures are defined in advance."],
            ["05", "Local Knowledge", "Planning reflects routes, infrastructure, logistics, and operating conditions on the ground."],
            ["06", "Continuous Support", "Our team remains available for changes, updates, and urgent coordination."],
          ].map(([number,title,text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>


      <section className="enterpriseIntro" id="capability">
        <div><p className="eyebrow">Company capability</p><h2>One point of coordination.</h2></div>
        <p>Our capability covers executive protection, airport and crew security, secure transportation, corporate security, journey management and risk consulting. Each assignment is scoped against local requirements, timing, available resources and written confirmation.</p>
      </section>
      <section className="enterpriseIntro" id="governance">
        <div><p className="eyebrow">Governance and leadership</p><h2>Clear responsibility for each operation.</h2></div>
        <p>Corporate direction, operational planning, regional coordination and security advice are distinct functions. Named personnel and credentials are published only after verification; every assignment requires an accountable operational lead.</p>
      </section>
      <section className="enterpriseIntro" id="standards">
        <div><p className="eyebrow">Standards and compliance</p><h2>Lawful, discreet and accountable delivery.</h2></div>
        <p>Operating principles include lawful authority, partner due diligence, confidentiality, anti-bribery, professional conduct, documented incident escalation and data minimisation. Final policies and licensing details must reflect verified local requirements.</p>
      </section>
      <section className="enterpriseIntro" id="careers">
        <div><p className="eyebrow">Partnerships and careers</p><h2>Work with Africa Security Solutions.</h2></div>
        <p>Qualified protection personnel, vetted transport operators and specialist partners may contact our team with their credentials and relevant areas of experience.</p>
      </section>
      <section className="enterpriseIntro" id="faq">
        <div><p className="eyebrow">Common questions</p><h2>What happens after a request?</h2></div>
        <p>We review locations, timing, traveller needs and lawful local capability before proposing a scope. Availability, personnel, vehicles and response times are not guaranteed until confirmed in writing. Urgent enquiries can be sent through WhatsApp.</p>
      </section>
      <section className="contactSection"><div><p className="eyebrow">Work with us</p><h2>Planning an operation in Africa?</h2><p>Tell us where, when, and what level of support is required.</p></div><a className="button primary" href="/contact">Contact our team</a></section>
    </main>
  );
}
