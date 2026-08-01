const services = [
  ["Executive Protection", "Discreet protection for executives, diplomats, and international visitors."],
  ["Airport & Crew Security", "Secure airport coordination, crew movements, and hotel transfers."],
  ["Secure Transportation", "Professional drivers, route planning, and movement support."],
  ["Corporate Security", "Security planning for offices, projects, events, and visiting teams."],
];

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Global Avia Solution home">
          <img src="/logo.svg" alt="Global Avia Solution" />
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#process">How It Works</a>
          <a href="#about">About</a>
          <a className="navCta" href="#contact">Request Protection</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Nigeria · Security · Aviation · Mobility</p>
          <h1>Security solutions tailored for international operations.</h1>
          <p className="lead">
            Professional protection, secure transportation, and aviation security coordination for clients operating across Nigeria.
          </p>
          <div className="actions">
            <a className="button primary" href="#contact">Request Protection</a>
            <a className="button secondary" href="#services">Explore Services</a>
          </div>
          <div className="trustRow">
            <span>24/7 operational support</span>
            <span>Nationwide coordination</span>
            <span>Discreet service delivery</span>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Service highlights">
        <div><strong>24/7</strong><span>Operations</span></div>
        <div><strong>4</strong><span>Core services</span></div>
        <div><strong>NG</strong><span>Nationwide network</span></div>
        <div><strong>100%</strong><span>Confidentiality focus</span></div>
      </section>

      <section className="section" id="services">
        <div className="sectionHeading">
          <p className="eyebrow">Our services</p>
          <h2>Protection built around the mission.</h2>
          <p>Every assignment is planned around location, timing, client profile, route, and assessed risk.</p>
        </div>
        <div className="serviceGrid">
          {services.map(([title, text], index) => (
            <article className={`serviceCard service${index + 1}`} key={title}>
              <div className="serviceShade" />
              <div className="serviceBody">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact">Discuss this service →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="darkSection" id="process">
        <div className="sectionHeading">
          <p className="eyebrow">How it works</p>
          <h2>Clear planning. Controlled delivery.</h2>
        </div>
        <div className="processGrid">
          {[
            ["01", "Briefing", "Share location, schedule, passenger profile, and required support."],
            ["02", "Assessment", "We review routes, operational constraints, and local conditions."],
            ["03", "Planning", "A tailored security and movement plan is prepared for approval."],
            ["04", "Deployment", "Resources are coordinated and supported throughout the assignment."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="splitSection" id="about">
        <div className="imagePanel" />
        <div className="copyPanel">
          <p className="eyebrow">Why Global Avia Solution</p>
          <h2>Security coordination with an aviation mindset.</h2>
          <p>
            We are building a premium Nigerian security and aviation support brand for international clients who require clear communication, discretion, and reliable local coordination.
          </p>
          <ul>
            <li>Executive and VIP support</li>
            <li>Airport and crew movement coordination</li>
            <li>Secure transportation planning</li>
            <li>Corporate and project security support</li>
          </ul>
        </div>
      </section>

      <section className="contactSection" id="contact">
        <div>
          <p className="eyebrow">Start planning</p>
          <h2>Need security assistance in Nigeria?</h2>
          <p>Send the assignment location, date, team size, and required service.</p>
        </div>
        <a className="button primary" href="mailto:globalaviasolutions@gmail.com">Email our team</a>
      </section>

      <footer>
        <img src="/logo.svg" alt="Global Avia Solution" />
        <p>Temporary development website. Legal, licensing, and service claims must be verified before public launch.</p>
        <small>© 2026 Global Avia Solution</small>
      </footer>
    </main>
  );
}
