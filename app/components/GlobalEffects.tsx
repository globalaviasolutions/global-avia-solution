"use client";

import { useEffect } from "react";

const revealSelector = [
  ".sectionHeading", ".serviceCard", ".processGrid article", ".industryGrid article",
  ".reasonsGrid article", ".audienceGrid article", ".faqPageGrid article",
  ".roleGrid article", ".serviceIntroSection > *", ".serviceFeaturePanel > *",
  ".coverageCopy > *", ".copyPanel > *", ".contactPageCopy > *", ".contactForm",
  ".legalContent > *", ".careerNotice", ".leadershipGrid article", ".resourceGrid article",
  ".enterpriseIntro > *", ".enterpriseSplit > *",
].join(",");

export default function GlobalEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>(".siteHeader");
    const updateHeader = () => header?.classList.toggle("headerScrolled", window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

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
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("isRevealed"));
      return () => {
        window.removeEventListener("scroll", updateHeader);
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
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHeader);
      emergencyLink?.remove();
    };
  }, []);

  return null;
}
