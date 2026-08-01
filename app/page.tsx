const services = [
  { number: "01", title: "Executive Protection", text: "Discreet close protection for executives, diplomats, VIP guests, and international teams.", className: "serviceExecutive", href: "/executive-protection" },
  { number: "02", title: "Airport & Crew Security", text: "Airport coordination, crew protection, secure hotel transfers, and aviation support.", className: "serviceAirport", href: "/airport-crew-security" },
  { number: "03", title: "Secure Transportation", text: "Professional drivers, secure transfers, route planning, and convoy coordination.", className: "serviceTransport", href: "/secure-transportation" },
  { number: "04", title: "Corporate Security", text: "Security planning for offices, projects, conferences, and visiting business teams.", className: "serviceCorporate", href: "/corporate-security" },
  { number: "05", title: "Journey Management", text: "Route assessment, movement tracking, contingency planning, and emergency support.", className: "serviceJourney", href: "/journey-management" },
  { number: "06", title: "Security Consulting", text: "Risk assessments, travel security plans, security audits, and crisis preparedness.", className: "serviceConsulting", href: "/security-consulting" },
];

const industries = ["Aviation", "Oil & Gas", "Embassies & NGOs", "Corporate Travel", "Construction", "Hospitality"];
const cities = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Uyo", "Calabar", "Enugu", "Warri"];

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="#services">Services</a><a href="#process">How It Works</a><a href="#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">African expertise · International standards</p>
          <h1>Trusted security for <span>people, assets and operations.</span></h1>
          <p className="lead">Africa Security Solutions delivers executive protection, secure transportation, aviation support and risk management for organisations operating across Nigeria and West Africa.</p>
          <div className="actions"><a className="button primary" href="/contact">Request Protection</a><a className="button secondary" href="mailto:globalaviasolutions@gmail.com">Talk to an Expert</a></div>
          <div className="trustRow"><span>24/7 operational support</span><span>Regional coordination</span><span>Discreet service delivery</span></div>
        </div>
        <div className="emergencyBadge"><strong>24/7</strong><span>Emergency support</span></div>
      </section>

      <section className="stats" aria-label="Service highlights"><div><strong>24/7</strong><span>Operations Support</span></div><div><strong>6</strong><span>Core Services</span></div><div><strong>WA</strong><span>West Africa Focus</span></div><div><strong>100%</strong><span>Discretion Focus</span></div></section>

      <section className="section" id="services"><div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Our services</p><h2>Protection built around the mission.</h2></div><p>Every assignment is planned around location, timing, client profile, route, operational requirements and assessed risk.</p></div><div className="serviceGrid">{services.map((service)=><article className={`serviceCard ${service.className}`} key={service.title}><div className="serviceShade" /><div className="serviceBody"><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href={service.href}>Explore service →</a></div></article>)}</div></section>

      <section className="darkSection" id="process"><div className="sectionHeading"><p className="eyebrow">How it works</p><h2>Clear planning. Controlled delivery.</h2><p>One point of contact from the first briefing through mission completion.</p></div><div className="processGrid">{[["01","Briefing","Share the location, timing, passenger profile, and required support."],["02","Assessment","We review routes, operational constraints, and local conditions."],["03","Planning","A tailored security and movement plan is prepared for approval."],["04","Deployment","Resources are coordinated and supported throughout the assignment."]].map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="industriesSection"><div className="sectionHeading"><p className="eyebrow">Industry support</p><h2>Built for demanding African operations.</h2></div><div className="industryGrid">{industries.map((industry,index)=><article key={industry}><span>0{index+1}</span><h3>{industry}</h3></article>)}</div></section>

      <section className="coverageSection" id="coverage"><div className="coverageVisual"><div className="mapGlow" /><div className="mapLabel">Africa</div></div><div className="coverageCopy"><p className="eyebrow">Regional capability</p><h2>Starting in Nigeria. Built for Africa.</h2><p>Security coordination is available in major Nigerian commercial and aviation hubs, with regional expansion planned across West Africa.</p><div className="cityGrid">{cities.map((city)=><span key={city}>{city}</span>)}</div><a className="textLink" href="/contact">Plan an operation →</a></div></section>

      <section className="splitSection" id="about"><div className="imagePanel"><div className="imageCaption">Regional security coordination</div></div><div className="copyPanel"><p className="eyebrow">Why Africa Security Solutions</p><h2>African expertise with international standards.</h2><p>We support international and regional clients who require clear communication, discretion, reliable local coordination and operational accountability.</p><ul><li>Executive and VIP protection</li><li>Airport and crew movement coordination</li><li>Secure transportation planning</li><li>Corporate and project security support</li></ul><p><a className="textLink" href="/about">Learn more about us →</a></p></div></section>

      <section className="contactSection" id="contact"><div><p className="eyebrow">Available 24/7</p><h2>Need security assistance in Africa?</h2><p>Send the assignment location, date, team size and required service.</p></div><div className="contactActions"><a className="button primary" href="/contact">Request Assistance</a><a className="button secondary" href="mailto:globalaviasolutions@gmail.com">Email our team</a></div></section>

      <footer><div className="footerGrid"><div><img src="/logo.svg" alt="Africa Security Solutions" /><p>Executive protection, secure transportation and risk management across Nigeria and West Africa.</p></div><div><h4>Services</h4><a href="/executive-protection">Executive Protection</a><a href="/airport-crew-security">Airport & Crew Security</a><a href="/secure-transportation">Secure Transportation</a><a href="/corporate-security">Corporate Security</a><a href="/journey-management">Journey Management</a><a href="/security-consulting">Security Consulting</a></div><div><h4>Company</h4><a href="/about">About Us</a><a href="#process">How It Works</a><a href="/contact">Contact</a></div><div><h4>Contact</h4><a href="mailto:globalaviasolutions@gmail.com">globalaviasolutions@gmail.com</a><span>Lagos, Nigeria</span><a href="https://security-solutions.africa">security-solutions.africa</a></div></div><div className="footerBottom"><small>© 2026 Africa Security Solutions. All rights reserved.</small><small>Temporary development website. Licensing and service claims must be verified before commercial launch.</small></div></footer>
    </main>
  );
}
