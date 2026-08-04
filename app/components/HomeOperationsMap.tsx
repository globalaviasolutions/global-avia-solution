"use client";

import { useMemo, useState } from "react";

type Location = {
  name: string;
  country: string;
  type: "city" | "airport";
  status: string;
  description: string;
  services: string[];
  x: number;
  y: number;
  href: string;
};

const locations: Location[] = [
  { name:"Lagos", country:"Nigeria", type:"city", status:"Primary operating focus", description:"Executive movements, airport coordination, secure transportation and journey management across Nigeria's principal commercial hub.", services:["Executive Protection","Airport & Crew Security","Secure Transportation","Journey Management"], x:55, y:65, href:"/locations/lagos" },
  { name:"Abuja", country:"Nigeria", type:"city", status:"Priority city", description:"Support for government, diplomatic, corporate and executive programmes in the federal capital.", services:["Executive Protection","Corporate Security","Secure Transportation"], x:56, y:54, href:"/locations/abuja" },
  { name:"Port Harcourt", country:"Nigeria", type:"city", status:"Priority city", description:"Project and personnel movement support for energy-linked operations and visiting corporate teams.", services:["Journey Management","Project Mobility","Secure Transportation"], x:58, y:72, href:"/locations/port-harcourt" },
  { name:"Accra", country:"Ghana", type:"city", status:"Regional support market", description:"Assignment-based coordination for corporate travel, executive visits and secure mobility.", services:["Corporate Travel","Secure Transportation","Journey Planning"], x:43, y:65, href:"/coverage" },
  { name:"Cotonou", country:"Benin", type:"city", status:"Regional support market", description:"Cross-border and city-based support subject to legal, route and local capability assessment.", services:["Cross-border Planning","Secure Transport","Airport Support"], x:50, y:64, href:"/coverage" },
  { name:"Abidjan", country:"Côte d’Ivoire", type:"city", status:"Regional support market", description:"Selected support for executive travel, corporate visits and aviation-related movements.", services:["Executive Travel","Operational Coordination","Risk Review"], x:35, y:67, href:"/coverage" },
  { name:"Dakar", country:"Senegal", type:"city", status:"Regional support market", description:"Selected aviation-linked and corporate travel assignments following assessment and confirmation.", services:["Airport Coordination","Executive Visits","Journey Support"], x:23, y:47, href:"/coverage" },
  { name:"Douala", country:"Cameroon", type:"city", status:"Regional support market", description:"Assignment-based project and corporate mobility support, dependent on location-specific review.", services:["Project Mobility","Corporate Travel","Risk Review"], x:67, y:70, href:"/coverage" },
  { name:"LOS", country:"Lagos Airport", type:"airport", status:"Aviation gateway", description:"Airport and crew movement coordination linked to Lagos operations.", services:["Meet & Assist","Crew Transfers","Arrival Coordination"], x:53, y:67, href:"/airport-crew-security" },
  { name:"ABV", country:"Abuja Airport", type:"airport", status:"Aviation gateway", description:"Arrival, departure and onward movement planning for Abuja-based programmes.", services:["Airport Coordination","Secure Transfer","Journey Support"], x:58, y:55, href:"/airport-crew-security" },
];

export default function HomeOperationsMap() {
  const [activeName, setActiveName] = useState("Lagos");
  const [zoom, setZoom] = useState(1);
  const [layer, setLayer] = useState<"all" | "cities" | "airports">("all");
  const active = useMemo(() => locations.find((item) => item.name === activeName) || locations[0], [activeName]);
  const visible = locations.filter((item) => layer === "all" || (layer === "cities" && item.type === "city") || (layer === "airports" && item.type === "airport"));

  return <section className="home3dMap" aria-label="Interactive operations map">
    <div className="home3dHeader">
      <div><p className="eyebrow">Interactive operations map</p><h2>Explore cities, gateways and coordination routes.</h2></div>
      <p>Select a city or airport to view illustrative capability. Availability, local requirements and final scope remain subject to assessment and written confirmation.</p>
    </div>

    <div className="home3dWorkspace">
      <div className="home3dStage">
        <div className="home3dToolbar" aria-label="Map controls">
          <div className="home3dLayers">
            {(["all","cities","airports"] as const).map((value)=><button key={value} className={layer===value?"active":""} type="button" onClick={()=>setLayer(value)}>{value === "all" ? "All layers" : value}</button>)}
          </div>
          <div className="home3dZoom"><button type="button" aria-label="Zoom out" onClick={()=>setZoom((value)=>Math.max(.86, Number((value-.08).toFixed(2))))}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Zoom in" onClick={()=>setZoom((value)=>Math.min(1.22, Number((value+.08).toFixed(2))))}>+</button></div>
        </div>

        <div className="home3dPerspective">
          <div className="home3dPlane" style={{transform:`rotateX(55deg) rotateZ(-8deg) scale(${zoom})`}}>
            <div className="home3dLand" />
            <div className="home3dTerrain" />
            <svg className="home3dRoutes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M55 65 C49 63 46 64 43 65"/><path d="M55 65 C53 61 54 57 56 54"/><path d="M55 65 C51 60 39 55 23 47"/><path d="M55 65 C58 66 63 68 67 70"/><path d="M55 65 C49 66 41 67 35 67"/><path d="M55 65 C54 64 52 64 50 64"/>
            </svg>
            {visible.map((item)=>{
              const selected = active.name === item.name;
              return <button key={item.name} type="button" className={`home3dPoint ${item.type} ${selected?"active":""}`} style={{left:`${item.x}%`,top:`${item.y}%`}} onClick={()=>setActiveName(item.name)} onMouseEnter={()=>setActiveName(item.name)} onFocus={()=>setActiveName(item.name)} aria-pressed={selected}>
                <i/><span>{item.name}</span>
              </button>;
            })}
          </div>
        </div>
        <div className="home3dLegend"><span><i className="city"/>City capability</span><span><i className="airport"/>Airport gateway</span><span><i className="route"/>Coordination route</span></div>
      </div>

      <aside className="home3dDetail" aria-live="polite">
        <div className="home3dDetailTop"><span>{active.type === "airport" ? "Airport gateway" : active.country}</span><small>{active.status}</small></div>
        <h3>{active.name}</h3>
        <p>{active.description}</p>
        <div className="home3dServices">{active.services.map((service)=><span key={service}>{service}</span>)}</div>
        <div className="home3dActions"><a className="button primary" href={active.href}>View capability</a><a className="button secondary" href={`/contact?location=${encodeURIComponent(active.name)}&market=${encodeURIComponent(active.country)}`}>Request assessment</a></div>
        <p className="home3dNote">Map routes are illustrative and do not represent live movements, permanent offices or guaranteed availability.</p>
      </aside>
    </div>
  </section>;
}
