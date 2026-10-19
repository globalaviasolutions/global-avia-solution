import CookiePreferencesButton from "./CookiePreferencesButton";
const whatsapp="https://wa.me/15028539373?text=Hello%2C%20I%20would%20like%20to%20request%20security%20services%20in%20West%20Africa.%20Please%20contact%20me%20with%20further%20details.";
export default function SiteFooter(){
  const year=new Date().getFullYear();
  return <footer className="globalSiteFooter">
    <div className="footerLead"><div><p className="eyebrow">Africa Security Solutions</p><h2>Security planning for people, travel and operations across West Africa.</h2></div><div className="footerLeadActions"><a className="button primary" href={whatsapp} target="_blank" rel="noopener noreferrer">Request consultation</a><a className="button secondary" href="/client-portal">Client portal</a></div></div>
    <div className="globalFooterGrid">
      <div className="footerBrandColumn"><a href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions"/></a><p>Executive protection, secure mobility, airport support and risk consulting across West Africa. All assignments subject to assessment and confirmation.</p><a href="mailto:info@security-solutions.africa">info@security-solutions.africa</a></div>
      <div><h3>Explore</h3><a href="/services">Security Services</a><a href="/industries">Industries</a><a href="/coverage">West Africa Coverage</a><a href="/locations/lagos">Lagos</a><a href="/locations/abuja">Abuja</a></div>
      <div><h3>Client Services</h3><a href="/contact">Contact</a><a href="/emergency-response">Emergency Requests</a><a href="/client-portal">Client Portal</a><a href="/operations-center">Operations Centre</a><a href="/resources">Planning Resources</a></div>
      <div><h3>Company</h3><a href="/about">About Us</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a><CookiePreferencesButton/></div>
    </div>
    <div className="globalFooterBottom"><small>© {year} Africa Security Solutions. All rights reserved.</small><small>Services remain subject to lawful availability, local requirements and written confirmation.</small><a href="#main-content">Back to top ↑</a></div>
  </footer>;
}