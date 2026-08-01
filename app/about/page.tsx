import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Global Avia Solution",
  description: "Learn about Global Avia Solution and our approach to security coordination, aviation support, and secure mobility in Nigeria.",
};

export default function AboutPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Global Avia Solution" /></a>
        <nav><a href="/#services">Services</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="serviceHero aboutHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <p className="eyebrow">About Global Avia Solution</p>
          <h1>Security coordination with an aviation mindset.</h1>
          <p className="lead">A premium Nigerian security and aviation support brand built for international clients who value clarity, discretion, and dependable local coordination.</p>
        </div>
      </section>

      <section className="serviceIntroSection">
        <div><p className="eyebrow">Our purpose</p><h2>Making complex operations easier to manage.</h2></div>
        <p>We support executives, aviation teams, corporate visitors, and project personnel through structured planning, reliable communication, and carefully coordinated local capability.</p>
      </section>

      <section className="audienceSection">
        <div className="sectionHeading"><p className="eyebrow">Our principles</p><h2>Professional standards at every stage.</h2></div>
        <div className="audienceGrid">
          {[
            ["01", "Discretion", "Client privacy and operational confidentiality are treated as essential."],
            ["02", "Preparation", "Every assignment begins with a clear briefing and operational assessment."],
            ["03", "Communication", "Clients receive one reliable point of contact throughout the mission."],
            ["04", "Accountability", "Scope, responsibilities, and escalation procedures are defined in advance."],
            ["05", "Local Knowledge", "Planning reflects local routes, logistics, and operating conditions."],
            ["06", "Continuous Support", "We remain available for changes, updates, and urgent coordination."],
          ].map(([number,title,text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="contactSection"><div><p className="eyebrow">Work with us</p><h2>Planning an operation in Nigeria?</h2><p>Tell us what you need and when support is required.</p></div><a className="button primary" href="/contact">Contact our team</a></section>
    </main>
  );
}
