"use client";

import { useEffect } from "react";

const revealSelector = [
  ".sectionHeading", ".serviceCard", ".scenarioCard", ".processGrid article", ".industryGrid article",
  ".reasonsGrid article", ".audienceGrid article", ".faqPageGrid article",
  ".roleGrid article", ".serviceIntroSection > *", ".serviceFeaturePanel > *",
  ".coverageCopy > *", ".copyPanel > *", ".contactPageCopy > *", ".contactForm",
  ".legalContent > *", ".careerNotice", ".leadershipGrid article", ".resourceGrid article",
  ".enterpriseIntro > *", ".enterpriseSplit > *", ".globalFooterGrid > *", ".footerLead > *",
  ".stats", ".interactiveRegionalMap", ".regionalMarketGrid article",
].join(",");

export default function GlobalEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const main = document.querySelector<HTMLElement>("main");
    if (main && !main.id) main.id = "main-content";

    const header = document.querySelector<HTMLElement>(".globalSiteHeader, .siteHeader");
    const updateScrollEffects = () => {
      header?.classList.toggle("headerScrolled", window.scrollY > 24);
      if (!reducedMotion) root.style.setProperty("--parallax-y", `${Math.min(window.scrollY, 900)}px`);
    };

    const updatePointer = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === "touch") return;
      root.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight) * 100}%`);

      const card = (event.target as HTMLElement).closest<HTMLElement>(".serviceCard, .scenarioCard, .industryGrid article");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
      }
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    let emergencyLink = document.querySelector<HTMLAnchorElement>(".globalEmergencyLink");
    if (!emergencyLink && window.location.pathname !== "/emergency-response") {
      emergencyLink = document.createElement("a");
      emergencyLink.className = "globalEmergencyLink";
      emergencyLink.href = "/emergency-response";
      emergencyLink.textContent = "Urgent request";
      emergencyLink.setAttribute("aria-label", "Open urgent operational request information");
      document.body.appendChild(emergencyLink);
    }

    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    items.forEach((item, index) => {
      item.classList.add("revealItem");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("isRevealed"));
      return () => {
        window.removeEventListener("scroll", updateScrollEffects);
        window.removeEventListener("pointermove", updatePointer);
        emergencyLink?.remove();
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isRevealed");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -7%", threshold: 0.08 });

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollEffects);
      window.removeEventListener("pointermove", updatePointer);
      emergencyLink?.remove();
    };
  }, []);

  return null;
}
