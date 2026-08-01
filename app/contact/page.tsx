import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Global Avia Solution",
  description: "Request executive protection, airport and crew security, secure transportation, or security consulting in Nigeria.",
};

export default function ContactPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><img src="/logo.svg" alt="Global Avia Solution" /></a>
        <nav><a href="/#services">Services</a><a href="/#coverage">Coverage</a><a href="/about">About</a><a href="/contact">Contact</a><a className="navCta" href="#request">Request Protection</a></nav>
      </header>

      <section className="serviceHero contactHero">
        <div className="serviceHeroOverlay" />
        <div className="serviceHeroContent">
          <p className="eyebrow">Contact our operations team</p>
          <h1>Request security assistance in Nigeria.</h1>
          <p className="lead">Share the location, date, number of travellers, and required service. We will review the request and respond with the next steps.</p>
        </div>
      </section>

      <section className="contactPageSection" id="request">
        <div className="contactPageCopy">
          <p className="eyebrow">Operational request</p>
          <h2>Tell us about the assignment.</h2>
          <p>For urgent enquiries, include arrival time, city, passenger count, schedule, and any known operational constraints.</p>
          <div className="contactDetails">
            <a href="mailto:globalaviasolutions@gmail.com">globalaviasolutions@gmail.com</a>
            <span>Lagos, Nigeria</span>
            <span>24/7 requests reviewed subject to availability</span>
          </div>
        </div>

        <form className="contactForm" action="mailto:globalaviasolutions@gmail.com" method="post" encType="text/plain">
          <label><span>Name *</span><input name="name" required /></label>
          <label><span>Company</span><input name="company" /></label>
          <label><span>Email *</span><input type="email" name="email" required /></label>
          <label><span>Phone / WhatsApp</span><input name="phone" /></label>
          <label className="full"><span>Service</span><select name="service"><option>Executive Protection</option><option>Airport & Crew Security</option><option>Secure Transportation</option><option>Corporate Security</option><option>Journey Management</option><option>Security Consulting</option></select></label>
          <label><span>City / Location</span><input name="location" /></label>
          <label><span>Required Date</span><input type="date" name="date" /></label>
          <label className="full"><span>Assignment Details *</span><textarea name="details" rows={7} required /></label>
          <button className="button primary full" type="submit">Prepare Email Request</button>
        </form>
      </section>
    </main>
  );
}
