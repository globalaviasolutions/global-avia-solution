"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import CinematicHero from "./CinematicHero";

export default function CinematicHeroMount(){
  useEffect(()=>{
    if(window.location.pathname!=="/") return;
    const legacy=document.querySelector<HTMLElement>(".premiumHero");
    if(!legacy || document.querySelector(".cinematicHeroMount")) return;
    const mount=document.createElement("div");
    mount.className="cinematicHeroMount";
    legacy.insertAdjacentElement("beforebegin",mount);
    legacy.hidden=true;
    const root:Root=createRoot(mount);
    root.render(<CinematicHero/>);
    return()=>{root.unmount();mount.remove();legacy.hidden=false};
  },[]);
  return null;
}
