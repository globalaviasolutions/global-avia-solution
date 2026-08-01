type LocationPageProps = {
  city: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroClass: string;
  focus: string[];
  services: string[];
  environments: string[];
};

export default function LocationPage({ city, eyebrow, title, intro, heroClass, focus, services, environments }: LocationPageProps) {
  return <main>
    <header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/coverage">Coverage</a><a href="/locations">Locations</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav></header>
    <section className={`locationHero ${heroClass}`}><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/locations">Locations</a><span>›</span><span>{city}</span></nav><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p><div className="actions"><a className="button primary" href="/contact">Request support in {city}</a><a className="button secondary" href="mailto:info@security-solutions.africa">Email operations</a></div></div></section>

    <section className="locationIntro"><div><p className="eyebrow">Local operating context</p><h2>Planning built around the city and the mission.</h2></div><p>Every request is reviewed against timing, route, traveller profile, destination, local operating conditions, lawful availability and the resources required to support the assignment.</p></section>

    <section className="locationColumns"><article><p className="eyebrow">Operational focus</p><h2>What we assess.</h2><div className="locationList">{focus.map((item)=><span key={item}>{item}</span>)}</div></article><article><p className="eyebrow">Available capabilities</p><h2>Services that can be combined.</h2><div className="locationList">{services.map((item)=><span key={item}>{item}</span>)}</div></article></section>

    <section className="locationEnvironments"><div className="sectionHeading"><p className="eyebrow">Typical environments</p><h2>Support for complex schedules and movements.</h2></div><div className="environmentGrid">{environments.map((item,index)=><article key={item}><span>0{index+1}</span><h3>{item}</h3><p>Scope and resources are confirmed only after operational assessment and written acceptance.</p></article>)}</div></section>

    <section className="darkSection"><div className="sectionHeading"><p className="eyebrow">Request process</p><h2>From initial brief to coordinated delivery.</h2></div><div className="processGrid">{[["01","Share the brief","Provide dates, locations, routes, traveller count and required service."],["02","Operational review","We assess logistics, constraints, availability and escalation requirements."],["03","Written scope","You receive a proposed service scope, assumptions and next steps."],["04","Coordination","Confirmed resources are briefed and supported through completion."]].map(([n,t,x])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></article>)}</div></section>

    <section className="contactSection"><div><p className="eyebrow">Planning support in {city}</p><h2>Send us the date, route and required service.</h2><p>Urgent requests are reviewed subject to lawful availability and operational feasibility.</p></div><div className="contactActions"><a className="button primary" href="/contact">Submit a request</a><a className="button secondary" href="/coverage">View coverage</a></div></section>
  </main>;
}
