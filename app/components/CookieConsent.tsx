"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import LeadTracking from "./LeadTracking";
import { sanitizeAnalyticsEvent } from "../lib/leadAnalytics";

type Consent = "accepted" | "essential" | null;
const STORAGE_KEY = "ass-cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pageView() {
  if (!window.gtag || !GA_ID) return;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
    send_to: GA_ID,
  });
}

function loadAnalytics(measurementId: string) {
  if (document.getElementById("google-analytics-script")) return;

  window.dataLayer = window.dataLayer || [];
  // Google's standard gtag bootstrap queues the native arguments object.
  // This is important for compatibility with the Google tag event processor.
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Let GA4 send the initial page_view after consent; SPA navigation remains tracked separately.
  window.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored === "accepted" || stored === "essential" ? stored : null);
    setReady(true);
    if (stored === "accepted" && GA_ID) loadAnalytics(GA_ID);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !GA_ID) return;
    let lastUrl = window.location.href;
    const trackNavigation = () => {
      const nextUrl = window.location.href;
      if (nextUrl === lastUrl) return;
      lastUrl = nextUrl;
      pageView();
    };
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);
      trackNavigation();
      return result;
    };
    history.replaceState = function (...args) {
      const result = originalReplaceState.apply(this, args);
      trackNavigation();
      return result;
    };
    window.addEventListener("popstate", trackNavigation);
    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", trackNavigation);
    };
  }, [consent]);

  function save(choice: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setConsent(choice);
    if (choice === "accepted" && GA_ID) loadAnalytics(GA_ID);
    if (choice === "essential" && consent === "accepted") window.location.reload();
  }

  useEffect(() => {
    const reopen = () => setConsent(null);
    window.addEventListener("open-cookie-preferences", reopen);
    return () => window.removeEventListener("open-cookie-preferences", reopen);
  }, []);

  if (!ready) return null;
  return (
    <>
      {consent === "accepted" && <><Analytics beforeSend={sanitizeAnalyticsEvent} /><LeadTracking /></>}
      {!consent && (
        <aside className="cookieBanner" role="dialog" aria-label="Cookie preferences" aria-live="polite">
          <div>
            <p className="cookieEyebrow">Privacy choices</p>
            <h2>We respect your privacy.</h2>
            <p>Essential storage keeps the website working. Optional Google and Vercel analytics help us understand website usage and are loaded only after consent. Read our <a href="/privacy">Privacy Policy</a>.</p>
          </div>
          <div className="cookieActions">
            <button type="button" className="button secondary" onClick={() => save("essential")}>Essential only</button>
            <button type="button" className="button primary" onClick={() => save("accepted")}>Accept analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}
