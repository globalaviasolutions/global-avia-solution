import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Africa Security Solutions",
  description: "Learn about Africa Security Solutions and our approach to executive protection, secure mobility, aviation support, and risk management across Nigeria and West Africa.",
};

export default function AboutPage() {
  return (
    <main>
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

      <section className="contactSection"><div><p className="eyebrow">Work with us</p><h2>Planning an operation in Africa?</h2><p>Tell us where, when, and what level of support is required.</p></div><a className="button primary" href="/contact">Contact our team</a></section>
    </main>
  );
}
