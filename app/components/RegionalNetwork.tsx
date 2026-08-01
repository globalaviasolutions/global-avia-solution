"use client";

import { useMemo, useState } from "react";

type Market = {
  name: string;
  status: string;
  description: string;
  services: string[];
  href: string;
  pointClass: string;
};

const markets: Market[] = [
  {
    name: "Nigeria",
    status: "Primary operating market",
    description: "Our core operational focus, supporting executive movements, aviation, corporate travel and project mobility across major Nigerian cities.",
    services: ["Executive Protection", "Airport & Crew Security", "Secure Transportation", "Journey Management"],
    href: "/coverage",
    pointClass: "networkNigeria",
  },
  {
    name: "Ghana",
    status: "Regional support market",
    description: "Selected assignments may be coordinated through assessed local capability and confirmed operational partners.",
    services: ["Corporate Travel", "Secure Transportation", "Journey Planning"],
    href: "/coverage",
    pointClass: "networkGhana",
  },
  {
    name: "Côte d’Ivoire",
    status: "Regional support market",
    description: "Assignment-based coordination for executive travel, corporate visits and secure mobility requirements.",
    services: ["Executive Travel", "Secure Mobility", "Operational Coordination"],
    href: "/coverage",
    pointClass: "networkIvoryCoast",
  },
  {
    name: "Senegal",
    status: "Regional support market",
    description: "Selected support for aviation-linked movements, executive visits and corporate programmes, subject to assessment.",
    services: ["Airport Coordination", "Executive Visits", "Journey Support"],
    href: "/coverage",
    pointClass: "networkSenegal",
  },
  {
    name: "Benin",
    status: "Regional support market",
    description: "Cross-border and city-based assignments can be reviewed against route, timing and confirmed local capacity.",
    services: ["Cross-border Planning", "Secure Transport", "Journey Management"],
    href: "/coverage",
    pointClass: "networkBenin",
  },
  {
    name: "Cameroon",
    status: "Regional support market",
    description: "Operational support for selected corporate and project movements, dependent on location-specific review.",
    services: ["Project Mobility", "Corporate Travel", "Risk Review"],
    href: "/coverage",
    pointClass: "networkCameroon",
  },
];

export default function RegionalNetwork() {
  const [activeName, setActiveName] = useState("Nigeria");
  const active = useMemo(() => markets.find((market) => market.name === activeName) || markets[0], [activeName]);

  return (
    <section className="regionalNetwork" id="coverage" aria-label="Regional capability map">
      <div className="regionalMapPanel">
        <div className="regionalMapHeader">
          <p className="eyebrow">West Africa</p>
          <span>Interactive coordination network</span>
        </div>

        <div className="regionalMapCanvas">
          <div className="regionalMapShape" aria-hidden="true" />
          <svg className="regionalRoutes" viewBox="0 0 800 620" aria-hidden="true" preserveAspectRatio="none">
            <path d="M410 430 C350 390 300 390 250 410" />
            <path d="M410 430 C360 350 310 280 220 210" />
            <path d="M410 430 C390 385 375 365 360 370" />
            <path d="M410 430 C445 390 470 380 490 390" />
            <path d="M410 430 C500 430 555 445 620 455" />
          </svg>

          {markets.map((market) => {
            const selected = active.name === market.name;
            return (
              <button
                key={market.name}
                type="button"
                className={`regionalPoint ${market.pointClass} ${selected ? "isActive" : ""}`}
                onMouseEnter={() => setActiveName(market.name)}
                onFocus={() => setActiveName(market.name)}
                onClick={() => setActiveName(market.name)}
                aria-pressed={selected}
                aria-label={`Show ${market.name} capability`}
              >
                <span className="pointPulse" />
                <span className="pointLabel">{market.name}</span>
                <span className="pointTooltip" role="tooltip">
                  <strong>{market.name}</strong>
                  <small>{market.status}</small>
                  <em>Explore capability →</em>
                </span>
              </button>
            );
          })}
        </div>

        <div className="regionalMobileTabs" aria-label="Select market">
          {markets.map((market) => (
            <button
              key={market.name}
              type="button"
              className={active.name === market.name ? "isActive" : ""}
              onClick={() => setActiveName(market.name)}
            >
              {market.name}
            </button>
          ))}
        </div>
      </div>

      <div className="regionalDetailPanel" aria-live="polite">
        <p className="eyebrow">Regional capability</p>
        <div className="regionalStatusRow">
          <span>{active.status}</span>
          <i>Assessment required</i>
        </div>
        <h2>{active.name}</h2>
        <p className="regionalLead">{active.description}</p>
        <div className="regionalServices">
          {active.services.map((service) => <span key={service}>{service}</span>)}
        </div>
        <div className="regionalActions">
          <a className="button primary" href={active.href}>View coverage</a>
          <a className="button secondary" href={`/contact?market=${encodeURIComponent(active.name)}`}>Request assessment</a>
        </div>
        <p className="regionalDisclaimer">Regional lines illustrate coordination capability and do not represent permanent offices or guaranteed availability.</p>
      </div>
    </section>
  );
}
