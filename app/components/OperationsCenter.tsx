"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "regional" | "nigeria" | "aviation";
type Region = { name:string; city:string; timezone:string; status:string; description:string; services:string[]; x:number; y:number };

const regions: Region[] = [
  { name:"Nigeria", city:"Lagos", timezone:"Africa/Lagos", status:"Primary operating market", description:"Core operational focus for executive movements, aviation support, secure transport and journey management.", services:["Executive Protection","Airport & Crew Security","Secure Transportation","Journey Management"], x:55, y:63 },
  { name:"Ghana", city:"Accra", timezone:"Africa/Accra", status:"Regional support market", description:"Selected assignments coordinated following capability, legal and partner assessment.", services:["Corporate Travel","Secure Transportation","Journey Planning"], x:43, y:61 },
  { name:"Benin", city:"Cotonou", timezone:"Africa/Porto-Novo", status:"Regional support market", description:"Assignment-based support for cross-border movement and corporate travel requirements.", services:["Secure Transportation","Journey Planning","Airport Support"], x:49, y:62 },
  { name:"Côte d’Ivoire", city:"Abidjan", timezone:"Africa/Abidjan", status:"Regional support market", description:"Regional coordination for corporate visitors, projects and aviation-related movements.", services:["Executive Movement Support","Corporate Travel","Risk Consulting"], x:35, y:64 },
  { name:"Senegal", city:"Dakar", timezone:"Africa/Dakar", status:"Regional support market", description:"Selected support for international travel, executive visits and project mobility.", services:["Travel Security","Journey Planning","Airport Coordination"], x:24, y:43 },
  { name:"Cameroon", city:"Douala", timezone:"Africa/Douala", status:"Regional support market", description:"Assignment-based coordination subject to local availability and operational review.", services:["Secure Transport","Journey Management","Corporate Support"], x:66, y:67 },
];

const modeContent: Record<Mode,{label:string;title:string;summary:string;items:string[]}> = {
  regional:{label:"Regional overview",title:"West Africa coordination",summary:"Assignment-based support across selected West African markets through assessed local capability and clear escalation pathways.",items:["Cross-border planning","Regional partner assessment","Executive mobility","Contingency coordination"]},
  nigeria:{label:"Nigeria focus",title:"National operating model",summary:"Focused support across priority Nigerian cities for executive travel, aviation, corporate mobility and project movements.",items:["Lagos operations","Abuja government travel","Port Harcourt project mobility","National journey management"]},
  aviation:{label:"Aviation support",title:"Crew and airport coordination",summary:"Structured support around airport arrivals, crew rotations, hotel transfers and aviation-linked executive movements.",items:["Airport meet coordination","Crew protection planning","Secure hotel transfers","Disruption response planning"]},
};

function cityTime(timezone:string){return new Intl.DateTimeFormat("en-GB",{timeZone:timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date())}

export default function OperationsCenter(){
  const [activeName,setActiveName]=useState("Nigeria");
  const [mode,setMode]=useState<Mode>("regional");
  const [,setTick]=useState(0);
  useEffect(()=>{const id=window.setInterval(()=>setTick(v=>v+1),1000);return()=>window.clearInterval(id)},[]);
  const active=useMemo(()=>regions.find(r=>r.name===activeName)||regions[0],[activeName]);
  const activeMode=modeContent[mode];

  return <div className="socShell">
    <section className="socHero">
      <div className="socHeroGrid"/><div className="socHeroGlow"/>
      <div className="socHeroCopy"><p className="eyebrow">Security Operations Centre</p><h1>Regional visibility.<br/>Controlled coordination.</h1><p>Explore our operating model across Nigeria and selected West African markets. Information shown here describes capability and coordination pathways, not live incident intelligence.</p><div className="socHeroActions"><a className="button primary" href="/contact">Request operational support</a><a className="button secondary" href="/emergency-response">Urgent request guidance</a></div></div>
      <div className="socStatusCard"><span className="socPulse"/><strong>Operations information</strong><small>Capability overview · not live incident data</small></div>
    </section>

    <section className="socModeBar" aria-label="Operations centre views">
      {(Object.keys(modeContent) as Mode[]).map(key=><button key={key} className={mode===key?"active":""} onClick={()=>setMode(key)}><span>{modeContent[key].label}</span><small>{modeContent[key].title}</small></button>)}
    </section>

    <section className="socModeSummary" aria-live="polite">
      <div><p className="eyebrow">{activeMode.label}</p><h2>{activeMode.title}</h2><p>{activeMode.summary}</p></div>
      <div className="socModeItems">{activeMode.items.map(item=><span key={item}>{item}</span>)}</div>
    </section>

    <section className="socDashboard" aria-label="Regional operations dashboard">
      <div className="socMapPanel"><div className="socPanelHeader"><div><span>Regional network</span><h2>West Africa coordination map</h2></div><small>Illustrative capability map</small></div>
        <div className="socMapCanvas"><div className="socAfricaShape"/><svg className="socRoutes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{regions.slice(1).map(r=><line key={r.name} x1="55" y1="63" x2={r.x} y2={r.y}/>)}</svg>{regions.map(r=><button key={r.name} className={`socPoint ${activeName===r.name?"active":""}`} style={{left:`${r.x}%`,top:`${r.y}%`}} onMouseEnter={()=>setActiveName(r.name)} onFocus={()=>setActiveName(r.name)} onClick={()=>setActiveName(r.name)} aria-label={`View ${r.name} capability`}><i/><span>{r.name}</span></button>)}</div>
        <p className="socMapNote">Lines indicate coordination relationships and do not represent permanent offices or guaranteed availability.</p>
      </div>

      <aside className="socInfoPanel"><div className="socPanelHeader"><div><span>Selected market</span><h2>{active.name}</h2></div><b>{active.status}</b></div><div className="socClock"><span>{active.city}</span><strong>{cityTime(active.timezone)}</strong><small>{active.timezone}</small></div><p>{active.description}</p><div className="socServiceList">{active.services.map(s=><span key={s}>{s}</span>)}</div><div className="socReadiness"><div><span>Availability</span><strong>Assessment required</strong></div><div><span>Confirmation</span><strong>Written scope</strong></div><div><span>Escalation</span><strong>Operations team</strong></div></div><div className="socInfoActions"><a href="/coverage">View coverage details →</a><a href={`/contact?market=${encodeURIComponent(active.name)}`}>Request assessment →</a></div></aside>
    </section>

    <section className="socTimeGrid">{regions.map(r=><article key={r.city}><span>{r.city}</span><strong>{cityTime(r.timezone)}</strong><small>{r.name}</small></article>)}</section>

    <section className="socCapabilityGrid">{[["01","Movement coordination","Airport arrivals, executive itineraries, secure transport and journey management."],["02","Operational assessment","Location, timing, traveller profile, route and local requirements reviewed before confirmation."],["03","Escalation pathways","Structured communication and contingency planning for time-sensitive assignments."],["04","Regional partner model","Selected assignments supported through assessed local capability where lawful and available."]].map(([n,t,x])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></article>)}</section>

    <section className="socBriefCta"><div><p className="eyebrow">Operational brief</p><h2>Prepare the essentials before contacting our team.</h2><p>Share the country, city, dates, traveller count, service requirement and known constraints. Sensitive operational details should follow through an agreed secure channel.</p></div><div className="socBriefActions"><a className="button primary" href="/contact">Start a request</a><a className="button secondary" href="/resources/journey-planning-guide">View planning guide</a></div></section>
  </div>
}
