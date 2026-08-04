"use client";

import { useMemo, useState } from "react";
import RegionalNetwork from "./RegionalNetwork";

const missions = [
  { title:"Executive Visit", label:"Executive mobility", text:"Protective planning for a senior visitor moving between airport, hotel, meetings and private engagements.", services:["Executive Protection","Airport Meet & Assist","Secure Transportation","Journey Management"], href:"/executive-protection" },
  { title:"Corporate Delegation", label:"Business programme", text:"Coordinated support for visiting teams, multi-vehicle movements, venues and changing itineraries.", services:["Corporate Security","Secure Transportation","Journey Planning","Single Point of Contact"], href:"/corporate-security" },
  { title:"Flight Crew Rotation", label:"Aviation support", text:"Airport reception, secure hotel transfer and movement coordination for operating crew and aviation teams.", services:["Airport & Crew Security","Secure Transfers","Hotel Coordination","Operational Escalation"], href:"/airport-crew-security" },
  { title:"Energy Project", label:"Project mobility", text:"Structured movement support for personnel rotations, remote-site access and time-sensitive project requirements.", services:["Journey Management","Route Assessment","Secure Transportation","Contingency Planning"], href:"/industries/oil-gas" },
  { title:"NGO Mission", label:"Field movement", text:"Proportionate travel-security support for programme teams, visiting specialists and field movements.", services:["Travel Security","Journey Planning","Risk Review","Local Coordination"], href:"/industries/embassies-ngos" },
  { title:"VIP Airport Arrival", label:"Arrival support", text:"Discreet airport-side coordination and secure onward movement for private and corporate travellers.", services:["Airport Coordination","Executive Protection","Secure Vehicle","Arrival Briefing"], href:"/airport-crew-security" },
];

const services = [
  ["01","Executive Protection","Discreet protection for executives, diplomats, VIP guests and international teams.","/executive-protection","serviceExecutive"],
  ["02","Airport & Crew Security","Airport coordination, crew movements, secure transfers and aviation support.","/airport-crew-security","serviceAirport"],
  ["03","Secure Transportation","Professional drivers, route planning, secure transfers and convoy coordination.","/secure-transportation","serviceTransport"],
  ["04","Corporate Security","Security planning for offices, events, projects and visiting business teams.","/corporate-security","serviceCorporate"],
  ["05","Journey Management","Movement planning, route assessment, tracking and contingency coordination.","/journey-management","serviceJourney"],
  ["06","Security Consulting","Risk assessments, audits, travel-security planning and crisis preparedness.","/security-consulting","serviceConsulting"],
];

export default function PremiumHome(){
  const [activeMission,setActiveMission]=useState(missions[0].title);
  const active=useMemo(()=>missions.find(m=>m.title===activeMission) || missions[0],[activeMission]);

  return <main id="main-content" className="premiumHome">
    <section className="premiumHero heroV2" id="top">
      <div className="premiumHeroVeil"/>
      <div className="premiumHeroGrid"/>
      <div className="premiumHeroCopy">
        <p className="eyebrow">Africa Security Solutions</p>
        <h1>Securing critical<br/>operations <span>across Africa.</span></h1>
        <p className="premiumHeroLead">Executive protection, secure transportation, airport and crew security, journey management and operational coordination for international organisations and private clients.</p>
        <div className="premiumHeroActions"><a className="button primary" href="/contact">Request consultation</a><a className="button secondary" href="/operations-center">Explore operations centre</a></div>
      </div>
      <aside className="premiumHeroPanel">
        <div><span>Operating focus</span><strong>Nigeria</strong></div>
        <div><span>Regional model</span><strong>West Africa</strong></div>
        <div><span>Coordination</span><strong>Assignment based</strong></div>
        <a href="/coverage">View regional capability →</a>
      </aside>
      <div className="premiumScrollCue"><i/>Scroll to explore</div>
    </section>

    <section className="premiumStatus" aria-label="Service availability information">
      {["Nigeria operating focus","Airport & crew support","Executive protection","Regional coordination","Urgent request guidance"].map((item,i)=><span key={item}><i className={i===0?"primary":""}/>{item}</span>)}
    </section>

    <section className="premiumIntro">
      <div><p className="eyebrow">Mission-led security</p><h2>Protection designed around the movement, not a standard package.</h2></div>
      <p>Every request is assessed against the traveller profile, route, timing, local requirements and operational environment before scope and availability are confirmed.</p>
    </section>

    <section className="missionSection">
      <div className="missionHeading"><p className="eyebrow">Select your mission</p><h2>What are you planning?</h2><p>Choose a scenario to see a recommended combination of services. The final solution remains subject to assessment and written confirmation.</p></div>
      <div className="missionWorkspace">
        <div className="missionTabs" role="tablist" aria-label="Mission scenarios">{missions.map(m=><button type="button" role="tab" aria-selected={active.title===m.title} className={active.title===m.title?"active":""} onClick={()=>setActiveMission(m.title)} key={m.title}><small>{m.label}</small><strong>{m.title}</strong><span>→</span></button>)}</div>
        <article className="missionDetail" aria-live="polite"><p className="eyebrow">Recommended structure</p><h3>{active.title}</h3><p>{active.text}</p><div className="missionServices">{active.services.map((s,i)=><div key={s}><span>0{i+1}</span>{s}</div>)}</div><div className="missionActions"><a className="button primary" href={`/contact?mission=${encodeURIComponent(active.title)}`}>Build this request</a><a className="textLink" href={active.href}>Explore related capability →</a></div></article>
      </div>
    </section>

    <section className="premiumServices"><div className="sectionHeading twoColumnHeading"><div><p className="eyebrow">Core capability</p><h2>One coordinated security partner.</h2></div><p>Combine protection, transportation, aviation support and journey management under one operational brief.</p></div><div className="serviceGrid">{services.map(([n,t,x,href,cls])=><article className={`serviceCard ${cls}`} key={t}><div className="serviceShade"/><div className="serviceBody"><span>{n}</span><h3>{t}</h3><p>{x}</p><a href={href}>Explore service →</a></div></article>)}</div></section>

    <section className="premiumWhy"><div className="premiumWhyLead"><p className="eyebrow">Why Africa Security Solutions</p><h2>Clear command.<br/>Local coordination.<br/>Discreet execution.</h2><a className="button secondary" href="/standards">View operating standards</a></div><div className="premiumWhySteps">{[["01","Assess","Location, timing, traveller profile and operational constraints."],["02","Plan","Routes, resources, communications and contingencies structured for approval."],["03","Coordinate","One point of contact aligns movements and selected local capability."],["04","Support","Communication and escalation pathways remain clear throughout the assignment."]].map(([n,t,x])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{x}</p></div></article>)}</div></section>

    <RegionalNetwork/>

    <section className="premiumFinalCta"><div><p className="eyebrow">Start an operational brief</p><h2>Planning travel or operations in Africa?</h2><p>Share the country, city, dates, traveller profile and required support. Our team will review the request before confirming scope and availability.</p></div><div><a className="button primary" href="/contact">Request consultation</a><a className="button secondary" href="/client-portal">Track an existing request</a></div></section>
  </main>;
}
