import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Global Avia Solution",
  description: "Answers to common questions about security coordination, airport support, secure transportation, and operations across Nigeria.",
};

const questions = [
  ["Can international visitors arrange security support in Nigeria?", "Yes. We coordinate support for executives, airline crews, corporate teams, diplomats, NGOs, and other international visitors, subject to local requirements and partner availability."],
  ["How quickly can an operation be arranged?", "Urgent requests are assessed immediately. Final response time depends on the city, schedule, required resources, and complexity of the assignment."],
  ["Do you provide airport pickup and crew transportation?", "Yes. Airport meet-and-assist coordination, crew movements, hotel transfers, and aviation-focused support are core services."],
  ["Do you operate outside Lagos?", "Yes. Coordination is available in major Nigerian cities, including Abuja, Port Harcourt, Kano, Uyo, Calabar, Enugu, and Warri, subject to operational assessment."],
  ["Are your services confidential?", "Yes. Client privacy, route confidentiality, and discreet communications are treated as essential parts of every assignment."],
  ["Do you provide armed escorts?", "Where an assignment requires government-approved armed support, this must be coordinated through appropriately authorised local partners and relevant authorities."],
  ["What information is needed for a quotation?", "Please provide the city, date, arrival or departure time, passenger count, service type, route, duration, and any known operational concerns."],
  ["Can support be provided for events or corporate projects?", "Yes. We can assist with executive visits, conferences, project movements, site reviews, and other corporate security requirements."],
];

export default function FAQPage() {
  return (
    <main>
      <header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Global Avia Solution" /></a><nav><a href="/#services">Services</a><a href="/about">About</a><a href="/careers">Careers</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav></header>
      <section className="contentHero"><p className="eyebrow">Frequently asked questions</p><h1>Clear answers before you deploy.</h1><p className="lead">Practical information about planning security, transport, and aviation support in Nigeria.</p></section>
      <section className="faqPageGrid">{questions.map(([q,a],i)=><article key={q}><span>0{i+1}</span><h2>{q}</h2><p>{a}</p></article>)}</section>
      <section className="contactSection"><div><p className="eyebrow">Still need help?</p><h2>Speak with our team.</h2><p>Send the city, date, passenger count, and required service.</p></div><a className="button primary" href="/contact">Contact us</a></section>
    </main>
  );
}
