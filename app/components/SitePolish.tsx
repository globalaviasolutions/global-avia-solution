"use client";

import { useEffect } from "react";

export default function SitePolish() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency || 4;
    const lowPower = Boolean((memory && memory <= 4) || cores <= 4);

    root.classList.toggle("coarsePointer", coarse);
    root.classList.toggle("lowPowerDevice", lowPower);
    root.classList.toggle("motionReduced", reduced);

    const progress = document.createElement("div");
    progress.className = "siteScrollProgress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    sections.forEach((section, index) => {
      section.style.setProperty("--section-index", String(index));
      if (!section.hasAttribute("data-polished")) section.setAttribute("data-polished", "true");
    });

    let observer: IntersectionObserver | null = null;
    if (!reduced && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("sectionInView", entry.isIntersecting));
      }, { rootMargin: "-12% 0px -18%", threshold: 0.08 });
      sections.forEach((section) => observer?.observe(section));
    } else {
      sections.forEach((section) => section.classList.add("sectionInView"));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    requestAnimationFrame(() => root.classList.add("siteReady"));

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      progress.remove();
      root.classList.remove("coarsePointer", "lowPowerDevice", "motionReduced", "siteReady");
    };
  }, []);

  return null;
}
