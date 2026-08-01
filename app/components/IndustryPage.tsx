type IndustryPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  imageClass: string;
  challenges: string[];
  capabilities: string[];
};

export default function IndustryPage({ eyebrow, title, intro, imageClass, challenges, capabilities }: IndustryPageProps) {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/#services">Services</a><a href="/#industries">Industries</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className={`industryHero ${imageClass}`}>
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p><div className="actions"><a className="button primary" href="/contact">Discuss your requirements</a><a className="button secondary" href="mailto:info@security-solutions.africa">Email our team</a></div></div>
      </section>

      <section className="serviceIntroSection"><div><p className="eyebrow">Sector support</p><h2>Security aligned with operational reality.</h2></div><p>We structure support around the site, traveller profile, schedule, regulatory environment, route conditions and business priorities of each assignment.</p></section>

      <section className="industryDetailGrid"><div><p className="eyebrow">Operational challenges</p><h2>What we help clients manage.</h2><div className="featureList">{challenges.map((item)=><span key={item}>{item}</span>)}</div></div><div><p className="eyebrow">Our capabilities</p><h2>Practical, coordinated support.</h2><div className="featureList">{capabilities.map((item)=><span key={item}>{item}</span>)}</div></div></section>

      <section className="darkSection"><div className="sectionHeading"><p className="eyebrow">Delivery model</p><h2>From assessment to execution.</h2></div><div className="processGrid">{[["01","Understand","Confirm people, locations, timings and objectives."],["02","Assess","Review exposure, routes, dependencies and contingencies."],["03","Coordinate","Align personnel, transport, communications and escalation."],["04","Support","Maintain oversight and adapt as conditions change."]].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

      <section className="contactSection"><div><p className="eyebrow">Plan with confidence</p><h2>Operating in the {title.toLowerCase()} sector?</h2><p>Share the location, schedule and scope. Our team will review the requirement.</p></div><a className="button primary" href="/contact">Contact operations</a></section>
    </main>
  );
}
