"use client";

import { useEffect } from "react";

export default function MobileMenu() {
  useEffect(() => {
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".siteHeader"));
    const cleanups: Array<() => void> = [];

    headers.forEach((header) => {
      const nav = header.querySelector<HTMLElement>("nav");
      if (!nav || header.querySelector(".mobileMenuButton")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "mobileMenuButton";
      button.setAttribute("aria-label", "Open navigation menu");
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = "<span></span><span></span><span></span>";

      const closeMenu = () => {
        nav.classList.remove("mobileNavOpen");
        button.classList.remove("isOpen");
        button.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menuOpen");
      };

      const toggleMenu = () => {
        const open = !nav.classList.contains("mobileNavOpen");
        nav.classList.toggle("mobileNavOpen", open);
        button.classList.toggle("isOpen", open);
        button.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menuOpen", open);
      };

      const handleLink = () => closeMenu();
      button.addEventListener("click", toggleMenu);
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", handleLink));
      header.appendChild(button);

      cleanups.push(() => {
        button.removeEventListener("click", toggleMenu);
        nav.querySelectorAll("a").forEach((link) => link.removeEventListener("click", handleLink));
        button.remove();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
