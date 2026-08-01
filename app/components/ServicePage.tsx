type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  imageClass: string;
  features: string[];
  audiences: string[];
};

export default function ServicePage({ eyebrow, title, intro, imageClass, features, audiences }: ServicePageProps) {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/#services">Services</a><a href="/#process">How It Works</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="#contact">Request Protection</a></nav>
      </header>

      <section className={`serviceHero ${imageClass}`}><div className="serviceHeroOverlay" /><div className="serviceHeroContent"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p><div className="actions"><a className="button primary" href="#contact">Request Protection</a><a className="button secondary" href="mailto:info@security-solutions.africa">Speak to an Expert</a></div></div></section>

      <section className="serviceIntroSection"><div><p className="eyebrow">Professional support</p><h2>Protection tailored to every mission.</h2></div><p>Every assignment is planned around the client profile, schedule, route, location, operational constraints and assessed risk level.</p></section>

      <section className="serviceDetailGrid"><div className={`serviceDetailVisual ${imageClass}`} /><div className="serviceFeaturePanel"><p className="eyebrow">What is included</p><h2>Comprehensive operational support.</h2><div className="featureList">{features.map((feature)=><span key={feature}>{feature}</span>)}</div></div></section>

      <section className="audienceSection"><div className="sectionHeading"><p className="eyebrow">Who we support</p><h2>Designed for demanding African operations.</h2></div><div className="audienceGrid">{audiences.map((audience,index)=><article key={audience}><span>0{index+1}</span><h3>{audience}</h3><p>Tailored planning, discreet coordination and professional support for each assignment.</p></article>)}</div></section>

      <section className="darkSection"><div className="sectionHeading"><p className="eyebrow">How it works</p><h2>Clear planning. Controlled delivery.</h2></div><div className="processGrid">{[["01","Briefing","Share the location, timing, passenger profile and required support."],["02","Assessment","We review routes, local conditions and operational constraints."],["03","Planning","A tailored plan is prepared with resources and contingencies."],["04","Deployment","The operation is coordinated and supported from start to finish."]].map(([number,stepTitle,text])=><article key={number}><span>{number}</span><h3>{stepTitle}</h3><p>{text}</p></article>)}</div></section>

      <section className="contactSection" id="contact"><div><p className="eyebrow">Available 24/7</p><h2>Need {title.toLowerCase()}?</h2><p>Send the assignment location, date, team size and required service.</p></div><div className="contactActions"><a className="button primary" href="/contact">Request Assistance</a><a className="button secondary" href="mailto:info@security-solutions.africa">Email our team</a></div></section>

      <footer><div className="footerGrid"><div><img src="/logo.svg" alt="Africa Security Solutions" /><p>Executive protection, secure transportation and risk management across Nigeria and West Africa.</p></div><div><h4>Services</h4><a href="/executive-protection">Executive Protection</a><a href="/airport-crew-security">Airport & Crew Security</a><a href="/secure-transportation">Secure Transportation</a></div><div><h4>Company</h4><a href="/about">About Us</a><a href="/#process">How It Works</a><a href="/contact">Contact</a></div><div><h4>Contact</h4><a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a><span>Lagos, Nigeria</span><a href="https://security-solutions.africa">security-solutions.africa</a></div></div><div className="footerBottom"><small>© 2026 Africa Security Solutions. All rights reserved.</small><small><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></small></div></footer>
    </main>
  );
}
