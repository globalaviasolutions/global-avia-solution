const whatsapp="https://wa.me/15028539373?text=Hello%2C%20I%20would%20like%20to%20request%20security%20services%20in%20West%20Africa.%20Please%20contact%20me%20with%20further%20details.";
const services = [
  ["01","Executive Protection","Discreet protective planning for executives, diplomats and private clients.","/executive-protection","serviceExecutive"],
  ["02","Airport & Crew Security","Airport reception, aviation coordination and secure crew movements.","/airport-crew-security","serviceAirport"],
  ["03","Secure Transportation","Secure transfers, drivers and route planning for critical movements.","/secure-transportation","serviceTransport"],
  ["04","Corporate Security","Protection planning for companies, events and visiting teams.","/corporate-security","serviceCorporate"],
  ["05","Journey Management","Travel planning, route assessment and operational coordination.","/journey-management","serviceJourney"],
  ["06","Security Consulting","Risk assessments, reviews and crisis-preparedness advice.","/security-consulting","serviceConsulting"],
];
const industries = [
  ["Aviation","/industries#aviation"],
  ["Oil & Gas","/industries#oil-gas"],
  ["Embassies & NGOs","/industries#embassies-ngos"],
  ["Corporate Travel","/industries#corporate-travel"],
  ["Construction","/industries#construction"],
  ["Hospitality","/industries#hospitality"],
];
export default function PremiumHome(){
  return <main id="main-content" className="premiumHome">
    <section className="premiumHero heroV2" id="top">
      <div className="premiumHeroVeil"/><div className="premiumHeroGrid"/>
      <div className="premiumHeroCopy">
        <p className="eyebrow">Africa Security Solutions</p>
        <h1>Security for people and operations <span>across West Africa.</span></h1>
        <p className="premiumHeroLead">Executive protection, secure transportation, airport support and risk management for international organisations and private clients.</p>
        <div className="premiumHeroActions"><a className="button primary" href={whatsapp} target="_blank" rel="noopener noreferrer">Request consultation</a><a className="button secondary" href="/services">Explore services</a></div>
      </div>
    </section>

    <section className="premiumServices" id="services">
      <div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Our services</p><h2>Professional security, coordinated around your requirements.</h2></div><p>Choose one service or combine capabilities under a single operational brief. Availability is subject to assessment.</p></div>
      <div className="serviceGrid">{services.map(([n,t,x,href,cls])=><article className={`serviceCard ${cls}`} key={t}><div className="serviceShade"/><div className="serviceBody"><span>{n}</span><h3>{t}</h3><p>{x}</p><a href={href}>Explore service →</a></div></article>)}</div>
    </section>

    <section className="sectorPathways" id="industries">
      <div className="sectorLead"><p className="eyebrow">Industries</p><h2>Security aligned with your operating environment.</h2><p>From aviation and energy operations to diplomatic missions and business travel, requirements differ by sector.</p><a className="textLink" href="/industries">Explore all industries →</a></div>
      <div className="sectorList">{industries.map(([name,href],i)=><a href={href} key={name}><span>0{i+1}</span><div><h3>{name}</h3></div><i>→</i></a>)}</div>
    </section>

    <section className="premiumIntro" id="coverage">
      <div><p className="eyebrow">West Africa</p><h2>Regional coordination. Location-specific planning.</h2><a className="textLink" href="/coverage">Explore our coverage →</a></div>
      <p>We assess security assignments across West Africa. Our priority city pages cover <a href="/locations/lagos">Lagos</a> and <a href="/locations/abuja">Abuja</a>; other locations are assessed according to lawful availability and confirmed partner capability.</p>
    </section>

    <section className="premiumWhy" id="about">
      <div className="premiumWhyLead"><p className="eyebrow">Why work with us</p><h2>Clear planning.<br/>Discreet service.<br/>Accountable coordination.</h2><a className="button secondary" href="/about">About the company</a></div>
      <div className="premiumWhySteps">{[
        ["01","Assessment","We review the traveller, location, timing and risk profile."],
        ["02","Planning","Routes, resources and lawful requirements are evaluated."],
        ["03","Coordination","One operational point of contact aligns the assignment."],
        ["04","Confirmation","Scope and availability are confirmed before delivery."],
      ].map(([n,t,x])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{x}</p></div></article>)}</div>
    </section>

    <section className="premiumFinalCta"><div><p className="eyebrow">Contact our team</p><h2>Planning security support in West Africa?</h2><p>Send your location, date and requirements. We will assess availability and the next steps.</p></div><div><a className="button primary" href={whatsapp} target="_blank" rel="noopener noreferrer">Request consultation on WhatsApp</a><a className="button secondary" href="/contact">Contact form</a><a className="textLink" href="/client-portal">Track an existing request →</a></div></section>
  </main>;
}
