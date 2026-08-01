"use client";

import { useState } from "react";

const locations = [
  { city: "Lagos", slug: "lagos", x: 31, y: 78, code: "LOS", text: "Airport arrivals, executive programmes, corporate travel and hospitality movements." },
  { city: "Abuja", slug: "abuja", x: 49, y: 51, code: "ABV", text: "Diplomatic, government, NGO and executive movement support in the federal capital." },
  { city: "Port Harcourt", slug: "port-harcourt", x: 57, y: 79, code: "PHC", text: "Energy-sector movements, project personnel and secure ground transportation." },
  { city: "Kano", slug: "kano", x: 56, y: 24, code: "KAN", text: "Northern Nigeria airport coordination, journey management and business travel support." },
  { city: "Uyo", slug: "uyo", x: 65, y: 82, code: "QUO", text: "Project visits, airport transfers, hospitality and regional personnel movements." },
  { city: "Calabar", slug: "calabar", x: 70, y: 78, code: "CBQ", text: "Cross River operations, hospitality programmes and project movement planning." },
  { city: "Enugu", slug: "enugu", x: 62, y: 66, code: "ENU", text: "South-east corporate travel, airport transfers and multi-stop schedules." },
  { city: "Warri", slug: "warri", x: 48, y: 76, code: "QRW", text: "Energy-linked travel, project mobility and route-specific operational planning." },
];

export default function InteractiveNigeriaMap() {
  const [active, setActive] = useState(locations[0]);

  return (
    <section className="interactiveMapSection" aria-label="Interactive Nigeria locations map">
      <div className="interactiveMapVisual">
        <div className="nigeriaMapShape" />
        <span className="interactiveMapLabel">Nigeria</span>
        {locations.map((location) => (
          <button
            key={location.slug}
            type="button"
            className={`locationPin ${active.slug === location.slug ? "isActive" : ""}`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => setActive(location)}
            onMouseEnter={() => setActive(location)}
            aria-label={`Show ${location.city}`}
          >
            <i />
            <span>{location.city}</span>
          </button>
        ))}
      </div>

      <div className="interactiveMapCard" aria-live="polite">
        <span className="mapCityCode">{active.code}</span>
        <p className="eyebrow">Priority location</p>
        <h2>{active.city}</h2>
        <p>{active.text}</p>
        <div className="mapCardActions">
          <a className="button primary" href={`/locations/${active.slug}`}>Explore {active.city}</a>
          <a className="textLink" href="/contact">Request an assessment →</a>
        </div>
        <small>Availability is confirmed only after operational, legal and partner-capacity assessment.</small>
      </div>
    </section>
  );
}
