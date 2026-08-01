import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Africa Security Solutions",
  description: "Register interest in security operations, executive protection, professional driving, aviation support, and risk management roles with Africa Security Solutions.",
};

const roles = ["Security Operations Coordinators","Close Protection Professionals","Professional Security Drivers","Airport & Crew Support Officers","Risk and Journey Management Specialists","Corporate Security Supervisors"];

export default function CareersPage() {
  return (
    <main>
      <header className="siteHeader"><a className="brand" href="/"><img src="/logo.svg" alt="Africa Security Solutions" /></a><nav><a href="/#services">Services</a><a href="/about">About</a><a href="/faq">FAQ</a><a href="/contact">Contact</a><a className="navCta" href="mailto:info@security-solutions.africa?subject=Career%20interest">Apply</a></nav></header>
      <section className="contentHero careersHero"><p className="eyebrow">Careers</p><h1>Professional people. Serious responsibility.</h1><p className="lead">We welcome expressions of interest from experienced professionals who value discretion, discipline, accountability, communication, and client service.</p></section>
      <section className="legalContent"><p className="eyebrow">Future opportunities</p><h2>Roles we may recruit for.</h2><div className="roleGrid">{roles.map((role,i)=><article key={role}><span>0{i+1}</span><h3>{role}</h3><p>Relevant experience, verifiable credentials, professional references, and legal eligibility to work may be required.</p></article>)}</div><div className="careerNotice"><h2>Register your interest</h2><p>Email your CV, current location, qualifications, licences, languages, availability, and the role you are interested in. Submission does not guarantee employment, deployment, or placement.</p><a className="button primary" href="mailto:info@security-solutions.africa?subject=Career%20interest%20-%20Africa%20Security%20Solutions">Email your CV</a></div></section>
    </main>
  );
}
