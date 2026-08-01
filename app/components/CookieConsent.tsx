"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "essential" | null;
const STORAGE_KEY = "ass-cookie-consent";

function loadAnalytics(measurementId: string) {
  if (document.getElementById("google-analytics-script")) return;

  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  const config = document.createElement("script");
  config.id = "google-analytics-config";
  config.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`;
  document.head.appendChild(config);
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored === "accepted" || stored === "essential" ? stored : null);
    setReady(true);
    if (stored === "accepted" && measurementId) loadAnalytics(measurementId);
  }, [measurementId]);

  function save(choice: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setConsent(choice);
    if (choice === "accepted" && measurementId) loadAnalytics(measurementId);
  }

  useEffect(() => {
    const reopen = () => setConsent(null);
    window.addEventListener("open-cookie-preferences", reopen);
    return () => window.removeEventListener("open-cookie-preferences", reopen);
  }, []);

  if (!ready || consent) return null;

  return (
    <aside className="cookieBanner" role="dialog" aria-label="Cookie preferences" aria-live="polite">
      <div>
        <p className="cookieEyebrow">Privacy choices</p>
        <h2>We respect your privacy.</h2>
        <p>
          Essential storage keeps the website working. Optional analytics, when configured, helps us understand website usage and is loaded only after consent.
          Read our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
      <div className="cookieActions">
        <button type="button" className="button secondary" onClick={() => save("essential")}>Essential only</button>
        <button type="button" className="button primary" onClick={() => save("accepted")}>Accept analytics</button>
      </div>
    </aside>
  );
}
