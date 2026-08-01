import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Africa Security Solutions",
  description: "Answers to common questions about executive protection, airport support, secure transportation, journey management, and security operations across Nigeria and West Africa.",
};

const questions = [
  ["Can international organisations arrange security support in Nigeria?", "Yes. We support executives, airline crews, corporate teams, diplomats, NGOs, project personnel, and other international visitors, subject to local requirements and operational availability."],
  ["How quickly can an operation be arranged?", "Urgent requests are reviewed as soon as possible. Final response time depends on the city, timing, required resources, risk profile, and complexity of the assignment."],
  ["Do you provide airport pickup and crew transportation?", "Yes. Airport coordination, crew movements, hotel transfers, aviation-focused support, and secure ground transportation are core services."],
  ["Where do you operate?", "Our initial operational focus is Nigeria, including Lagos, Abuja, Port Harcourt, Kano, Uyo, Calabar, Enugu, and Warri. Regional support is assessed case by case across West Africa."],
  ["Are your services confidential?", "Yes. Client privacy, route confidentiality, operational details, and discreet communications are treated as essential parts of every assignment."],
  ["Do you provide armed escorts?", "Where an assignment requires government-approved armed support, it must be coordinated through appropriately authorised local partners and relevant authorities."],
  ["What information is needed for a quotation?", "Please provide the location, date, arrival or departure time, passenger count, service type, route, expected duration, and any known operational concerns."],
  ["Can support be provided for projects, events, or corporate sites?", "Yes. We can assess executive visits, conferences, infrastructure projects, site movements, corporate facilities, and other security requirements."],
];

export default function FAQPage() {
  return (
    <main>
      <header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/#services">Services</a><a href="/about">About</a><a href="/careers">Careers</a><a href="/contact">Contact</a><a className="navCta" href="/contact">Request Protection</a></nav></header>
      <section className="contentHero"><p className="eyebrow">Frequently asked questions</p><h1>Clear answers before you deploy.</h1><p className="lead">Practical information about planning security, transport, aviation support, and risk management in Africa.</p></section>
      <section className="faqPageGrid">{questions.map(([q,a],i)=><article key={q}><span>0{i+1}</span><h2>{q}</h2><p>{a}</p></article>)}</section>
      <section className="contactSection"><div><p className="eyebrow">Still need help?</p><h2>Speak with our operations team.</h2><p>Send the location, date, passenger count, and required service.</p></div><a className="button primary" href="/contact">Contact us</a></section>
    </main>
  );
}
