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
      <a href="/" className={isActive(pathname, "/") ? "active" : ""}>Home</a>
      {menu("Services", services, "/services")}
      <a className={isActive(pathname, "/industries") ? "active" : ""} href="/industries">Industries</a>
      <a className={isActive(pathname, "/coverage") ? "active" : ""} href="/coverage">West Africa</a>
      <a className={isActive(pathname, "/about") ? "active" : ""} href="/about">About Us</a>
      <a className={isActive(pathname, "/contact") ? "active" : ""} href="/contact">Contact</a>
      <a className="consultationNav" href="https://wa.me/15028539373?text=Hello%2C%20I%20would%20like%20to%20request%20security%20services%20in%20West%20Africa.%20Please%20contact%20me%20with%20further%20details." target="_blank" rel="noopener noreferrer">Request Consultation</a>
    </nav>
  </header>;
}
