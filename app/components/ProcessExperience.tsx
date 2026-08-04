"use client";

import { useState } from "react";

const stages = [
  {
    number: "01",
    title: "Assessment",
    label: "Define the operating picture",
    text: "We review the location, dates, traveller profile, itinerary, transport requirements and known operational constraints before proposing a scope.",
    outputs: ["Mission requirements", "Location and route review", "Initial feasibility check"],
  },
  {
    number: "02",
    title: "Planning",
    label: "Structure the assignment",
    text: "The recommended combination of protection, transport, airport support, communications and contingencies is organised into one operational brief.",
    outputs: ["Proposed service scope", "Movement and communication plan", "Confirmation requirements"],
  },
  {
    number: "03",
    title: "Coordination",
    label: "Align people and movements",
    text: "A single point of contact coordinates the confirmed resources, timing, local capability and changes to the programme.",
    outputs: ["Single operational contact", "Confirmed movement schedule", "Escalation pathways"],
  },
  {
    number: "04",
    title: "Support",
    label: "Maintain controlled delivery",
    text: "During the assignment, communication and agreed escalation pathways remain clear through completion and any required follow-up.",
    outputs: ["Assignment communication", "Change management", "Completion follow-up"],
  },
];

export default function ProcessExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <section className="processExperience" aria-labelledby="process-experience-title">
      <div className="processExperienceLead">
        <p className="eyebrow">How we coordinate</p>
        <h2 id="process-experience-title">From initial brief to controlled delivery.</h2>
        <p>Select each stage to see how an enquiry develops into a confirmed operational plan.</p>
        <div className="processExperienceActions">
          <a className="button secondary" href="/standards">View operating standards</a>
          <a className="textLink" href="/resources/journey-planning-guide">Journey planning guide →</a>
        </div>
      </div>

      <div className="processTimeline">
        <div className="processProgress" aria-hidden="true"><i style={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }} /></div>
        <div className="processStageTabs" role="tablist" aria-label="Operational planning stages">
          {stages.map((stage, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              key={stage.number}
            >
              <span>{stage.number}</span>
              <strong>{stage.title}</strong>
            </button>
          ))}
        </div>

        <article className="processStageDetail" aria-live="polite" key={active.number}>
          <div className="processStageNumber">{active.number}</div>
          <div>
            <p className="eyebrow">{active.label}</p>
            <h3>{active.title}</h3>
            <p>{active.text}</p>
            <div className="processOutputs">
              {active.outputs.map((output) => <span key={output}>{output}</span>)}
            </div>
          </div>
        </article>
      </div>

      <div className="operationsSpotlight">
        <div className="operationsSpotlightVisual" aria-hidden="true">
          <div className="operationsRadar"><i/><i/><i/></div>
          <span className="operationsNode nodeOne">Lagos</span>
          <span className="operationsNode nodeTwo">Abuja</span>
          <span className="operationsNode nodeThree">Accra</span>
          <svg viewBox="0 0 500 260" preserveAspectRatio="none"><path d="M90 190 C180 120 265 145 350 70"/><path d="M90 190 C220 210 300 195 425 150"/></svg>
        </div>
        <div className="operationsSpotlightCopy">
          <p className="eyebrow">Operations Centre</p>
          <h2>Regional visibility for complex movements.</h2>
          <p>Explore local times, coordination pathways and selected-market capability through the Security Operations Centre.</p>
          <div><a className="button primary" href="/operations-center">Open Operations Centre</a><a className="button secondary" href="/contact?source=operations-centre">Start an operational brief</a></div>
        </div>
      </div>
    </section>
  );
}
