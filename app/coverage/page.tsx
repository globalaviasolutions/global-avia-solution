import PageStructuredData from "../components/PageStructuredData";
import { pageMetadata } from "../lib/seo";
import type { Metadata } from "next";
import InteractiveNigeriaMap from "../components/InteractiveNigeriaMap";

export const metadata: Metadata = pageMetadata("/coverage", {
  title: "Security Coverage in Nigeria and West Africa",
  description:
    "Explore Africa Security Solutions coverage in Nigeria and our regional coordination model for selected assignments across West Africa.",
});

const regionalMarkets = ["Ghana", "Côte d’Ivoire", "Senegal", "Benin", "Cameroon"];

export default function CoveragePage() {
  return (
    <main><PageStructuredData path="/coverage" metadata={metadata} />
      <header className="siteHeader enterpriseHeader">
        <a className="brand" href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
        <nav><a href="/services">Services</a><a href="/industries">Industries</a><a href="/coverage">Coverage</a><a href="/locations">Locations</a><a href="/resources">Resources</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Plan an Operation</a></nav>
      </header>

      <section className="coveragePageHero">
        <div className="coveragePageOverlay" />
        <div className="serviceHeroContent">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Coverage</span></nav>
          <p className="eyebrow">Regional capability</p>
          <h1>Security coordination across West Africa.</h1>
          <p className="lead">We assess security requirements across West Africa, with city-specific planning for Lagos and Abuja and regional coordination for other markets.</p>
          <div className="actions"><a className="button primary" href="/contact">Plan an Operation</a><a className="button secondary" href="mailto:info@security-solutions.africa">Email Operations</a></div>
        </div>
      </section>

      <section className="coverageIntro">
        <div><p className="eyebrow">Operating model</p><h2>Coverage depends on assessment, timing and lawful availability.</h2></div>
        <p>Every request is reviewed against location, route, timing, traveller profile, partner capability and local requirements. Website coverage information does not constitute automatic service confirmation.</p>
      </section>

      <section id="cities" className="coverageIntro">
        <div><p className="eyebrow">Priority locations</p><h2>City-specific security planning.</h2></div>
        <p>Explore operational considerations in <a href="/locations/lagos">Lagos</a> and <a href="/locations/abuja">Abuja</a>. Requests for Port Harcourt, Kano, Enugu, Calabar, Uyo, Warri and other markets are assessed through our West Africa coordination model.</p>
      </section>
      <InteractiveNigeriaMap />

      <section className="regionalCoverage">
        <div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">West Africa</p><h2>Regional coordination for selected assignments.</h2></div><p>Cross-border capability is developed assignment by assignment and may involve vetted local providers, specialist advisers and legally authorised partners.</p></div>
        <div className="regionalMarketGrid">{regionalMarkets.map((market, index) => <article key={market}><span>0{index + 1}</span><h3>{market}</h3><p>Availability subject to operational assessment, local legal requirements and confirmed partner capacity.</p></article>)}</div>
      </section>

      <section className="coverageProcess">
        <div className="sectionHeading"><p className="eyebrow">Before deployment</p><h2>What we confirm before accepting an assignment.</h2></div>
        <div className="processGrid">{[
          ["01", "Location", "Cities, routes, airports, hotels, sites and planned movements."],
          ["02", "Timing", "Arrival windows, programme duration and response time available."],
          ["03", "Requirements", "Traveller profile, vehicles, protection level and communications."],
          ["04", "Legal availability", "Licensing, authorised support, local restrictions and partner capacity."],
        ].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="contactSection"><div><p className="eyebrow">Planning a movement?</p><h2>Send us the route, dates and required support.</h2><p>Our team will review the request and confirm the next steps.</p></div><div className="contactActions"><a className="button primary" href="/contact">Request Assessment</a><a className="button secondary" href="mailto:info@security-solutions.africa">Email Operations</a></div></section>
    </main>
  );
}
