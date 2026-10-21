import { track, type BeforeSendEvent } from "@vercel/analytics";
import { PUBLIC_ROUTES, SITE_URL } from "./seo";

const publicPaths = new Set<string>(PUBLIC_ROUTES);
const services = new Set(["Executive Protection", "Airport & Crew Security", "Secure Transportation", "Corporate Security", "Journey Management", "Security Consulting", "Multiple Services"]);

type LeadEvent = "whatsapp_click" | "contact_request_success";

// Do not include query strings, portal references, form fields or message text.
export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url, SITE_URL);
    if (!publicPaths.has(url.pathname)) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}

export function trackLeadEvent(name: LeadEvent, detail: string): void {
  try {
    if (typeof window === "undefined" || window.localStorage.getItem("ass-cookie-consent") !== "accepted") return;
    const page = window.location.pathname;
    if (!publicPaths.has(page)) return;
    const properties = name === "contact_request_success"
      ? { page, service: services.has(detail) ? detail : "Other" }
      : { page, placement: ["header", "footer", "floating", "content"].includes(detail) ? detail : "content" };
    // Measurement must never interrupt navigation or a successfully saved request.
    try { track(name, properties); } catch { /* Analytics may be unavailable. */ }
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
    if (typeof analyticsWindow.gtag === "function") analyticsWindow.gtag("event", name, properties);
  } catch { /* Storage or analytics may be blocked by the browser. */ }
}
