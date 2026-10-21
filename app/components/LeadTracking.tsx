"use client";

import { useEffect } from "react";
import { trackLeadEvent } from "../lib/leadAnalytics";

export default function LeadTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      try {
        const url = new URL(link.href);
        if (url.protocol !== "https:" || !["wa.me", "api.whatsapp.com"].includes(url.hostname)) return;
      } catch { return; }
      const placement = link.closest("header") ? "header" : link.closest("footer") ? "footer" : link.classList.contains("globalEmergencyLink") ? "floating" : "content";
      trackLeadEvent("whatsapp_click", placement);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
