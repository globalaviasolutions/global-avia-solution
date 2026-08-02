"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const services = [
  ["Executive Protection", "/executive-protection"],
  ["Airport & Crew Security", "/airport-crew-security"],
  ["Secure Transportation", "/secure-transportation"],
  ["Corporate Security", "/corporate-security"],
  ["Journey Management", "/journey-management"],
  ["Security Consulting", "/security-consulting"],
];

const industries = [
  ["Aviation", "/industries/aviation"],
  ["Oil & Gas", "/industries/oil-gas"],
  ["Embassies & NGOs", "/industries/embassies-ngos"],
  ["Corporate Travel", "/industries/corporate-travel"],
  ["Construction", "/industries/construction"],
  ["Hospitality", "/industries/hospitality"],
];

const company = [
  ["Operations Centre", "/operations-center"],
  ["About Us", "/about"],
  ["Leadership", "/leadership"],
  ["Standards & Compliance", "/standards"],
  ["Resources Centre", "/resources"],
  ["Careers", "/careers"],
  ["FAQ", "/faq"],
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const menu = (label: string, items: string[][], overview: string) => (
    <div className={`megaGroup ${openMenu === label ? "isOpen" : ""}`}>
      <button type="button" className="megaTrigger" aria-expanded={openMenu === label} onClick={() => setOpenMenu(openMenu === label ? null : label)}>
        {label}<span aria-hidden="true">⌄</span>
      </button>
      <div className="megaPanel">
        <div className="megaIntro"><span>{label}</span><h2>Professional support built around the mission.</h2><a href={overview}>View all {label.toLowerCase()} →</a></div>
        <div className="megaLinks">{items.map(([title, href]) => <a className={isActive(pathname, href) ? "active" : ""} href={href} key={href}>{title}<span>→</span></a>)}</div>
      </div>
    </div>
  );

  return <header className={`globalSiteHeader ${scrolled ? "isScrolled" : ""}`}>
    <a className="globalBrand" href="/" aria-label="Africa Security Solutions home"><img src="/logo.svg" alt="Africa Security Solutions" /></a>
    <button className={`globalMenuButton ${mobileOpen ? "isOpen" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><span /><span /><span /></button>
    <nav className={`globalNav ${mobileOpen ? "isOpen" : ""}`} aria-label="Primary navigation">
      {menu("Services", services, "/services")}
      {menu("Industries", industries, "/industries")}
      <a className={isActive(pathname, "/coverage") ? "active" : ""} href="/coverage">Coverage</a>
      <a className={isActive(pathname, "/locations") ? "active" : ""} href="/locations">Locations</a>
      {menu("Company", company, "/about")}
      <a className={isActive(pathname, "/contact") ? "active" : ""} href="/contact">Contact</a>
      <a className="emergencyNav" href="/emergency-response">Emergency</a>
      <a className="consultationNav" href="/contact">Request Consultation</a>
    </nav>
  </header>;
}
