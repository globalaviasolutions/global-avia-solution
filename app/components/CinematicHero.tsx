"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const slides = [
  { eyebrow:"Executive protection", line1:"Protecting people.", line2:"Enabling critical movement.", summary:"Discreet protective planning for executives, VIP travellers and international teams operating across Nigeria and selected African markets.", href:"/executive-protection", action:"Explore executive protection" },
  { eyebrow:"Airport & crew security", line1:"From touchdown.", line2:"To secure onward movement.", summary:"Airport reception, crew coordination, secure hotel transfers and aviation-linked operational support.", href:"/airport-crew-security", action:"Explore aviation support" },
  { eyebrow:"Secure transportation", line1:"Controlled routes.", line2:"Confident arrival.", summary:"Professional secure transfers, route planning, movement coordination and contingency support for time-sensitive journeys.", href:"/secure-transportation", action:"Explore secure mobility" },
  { eyebrow:"Journey management", line1:"Regional visibility.", line2:"Clear coordination.", summary:"Structured movement planning, communication pathways and operational oversight for complex travel programmes.", href:"/journey-management", action:"Explore journey management" },
];

export default function CinematicHero(){
  const [index,setIndex]=useState(0);
  const [ready,setReady]=useState(false);
  const heroRef=useRef<HTMLElement>(null);
  const active=useMemo(()=>slides[index], [index]);

  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const readyTimer=window.setTimeout(()=>setReady(true), reduced?0:650);
    if(reduced) return ()=>window.clearTimeout(readyTimer);
    const timer=window.setInterval(()=>setIndex(v=>(v+1)%slides.length),6500);
    return ()=>{window.clearTimeout(readyTimer);window.clearInterval(timer)};
  },[]);

  const move=(event:React.PointerEvent<HTMLElement>)=>{
    const element=heroRef.current;
    if(!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect=element.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width;
    const y=(event.clientY-rect.top)/rect.height;
    element.style.setProperty("--cinema-x",`${x*100}%`);
    element.style.setProperty("--cinema-y",`${y*100}%`);
    element.style.setProperty("--cinema-tilt-x",`${(x-.5)*8}px`);
    element.style.setProperty("--cinema-tilt-y",`${(y-.5)*6}px`);
  };

  return <>
    <div className={`cinematicLoader ${ready?"isHidden":""}`} aria-hidden="true"><img src="/logo.svg" alt=""/><i/></div>
    <section ref={heroRef} onPointerMove={move} className={`cinematicHero slide${index+1}`} id="top" aria-label="Africa Security Solutions">
      <div className="cinematicScene" aria-hidden="true"><div className="cinematicSceneImage"/><div className="cinematicSceneGlow"/><div className="cinematicSceneGrid"/><div className="cinematicParticles"><i/><i/><i/><i/></div></div>
      <div className="cinematicCopy" key={active.eyebrow}>
        <p className="eyebrow">{active.eyebrow}</p>
        <h1>{active.line1}<br/><span>{active.line2}</span></h1>
        <p>{active.summary}</p>
        <div className="cinematicActions"><a className="button primary" href="/contact">Request consultation</a><a className="button secondary" href={active.href}>{active.action}</a></div>
        <div className="cinematicDots" role="tablist" aria-label="Hero capabilities">{slides.map((slide,i)=><button key={slide.eyebrow} type="button" role="tab" aria-label={`Show ${slide.eyebrow}`} aria-selected={i===index} className={i===index?"active":""} onClick={()=>setIndex(i)}><span>{String(i+1).padStart(2,"0")}</span></button>)}</div>
      </div>

      <aside className="cinematicOperations">
        <div className="cinematicPanelHead"><span><i/>Operations overview</span><small>Assignment-based model</small></div>
        <div className="cinematicPanelRows"><div><span>Operating focus</span><strong>Nigeria</strong></div><div><span>Regional capability</span><strong>West Africa</strong></div><div><span>Selected service</span><strong>{active.eyebrow}</strong></div></div>
        <div className="cinematicPanelLinks"><a href="/operations-center">Open Operations Centre →</a><a href="/coverage">View regional coverage →</a></div>
      </aside>

      <div className="cinematicFloatCard cardProtection"><span>01</span><strong>Executive Protection</strong></div>
      <div className="cinematicFloatCard cardAviation"><span>02</span><strong>Airport & Crew Security</strong></div>
      <div className="cinematicFloatCard cardJourney"><span>03</span><strong>Journey Management</strong></div>
      <div className="cinematicScroll"><i/>Explore the platform</div>
    </section>
  </>;
}
