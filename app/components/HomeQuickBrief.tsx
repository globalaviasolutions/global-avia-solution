"use client";

import { useMemo, useState } from "react";

const missionOptions = [
  "Executive Visit",
  "Corporate Delegation",
  "Flight Crew Rotation",
  "Energy Project",
  "NGO Mission",
  "VIP Airport Arrival",
];

const marketOptions = ["Nigeria", "Ghana", "Benin", "Côte d’Ivoire", "Senegal", "Cameroon", "Other African market"];
const urgencyOptions = ["Planning stage", "Within 30 days", "Within 7 days", "Time-sensitive request"];

export default function HomeQuickBrief() {
  const [mission, setMission] = useState(missionOptions[0]);
  const [market, setMarket] = useState(marketOptions[0]);
  const [urgency, setUrgency] = useState(urgencyOptions[0]);

  const href = useMemo(() => {
    const params = new URLSearchParams({ mission, market, urgency });
    return `/contact?${params.toString()}`;
  }, [mission, market, urgency]);

  return (
    <section className="quickBriefSection" aria-labelledby="quick-brief-title">
      <div className="quickBriefLead">
        <p className="eyebrow">Quick brief builder</p>
        <h2 id="quick-brief-title">Start with the essentials.</h2>
        <p>Select the mission, market and timing. The contact form will open with this context ready for your operational brief.</p>
      </div>

      <div className="quickBriefPanel">
        <label>
          <span>Mission</span>
          <select value={mission} onChange={(event) => setMission(event.target.value)}>
            {missionOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label>
          <span>Market</span>
          <select value={market} onChange={(event) => setMarket(event.target.value)}>
            {marketOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label>
          <span>Timing</span>
          <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            {urgencyOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <div className="quickBriefSummary" aria-live="polite">
          <small>Prepared brief</small>
          <strong>{mission}</strong>
          <span>{market} · {urgency}</span>
        </div>

        <a className="button primary" href={href}>Continue to request</a>
        <p>Availability, scope and lawful delivery remain subject to assessment and written confirmation.</p>
      </div>
    </section>
  );
}
