"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import RegionalNetwork from "./RegionalNetwork";

export default function RegionalNetworkMount() {
  useEffect(() => {
    const legacySection = document.querySelector<HTMLElement>(".coverageV2");
    if (!legacySection || document.querySelector(".regionalNetworkMount")) return;

    const mount = document.createElement("div");
    mount.className = "regionalNetworkMount";
    legacySection.insertAdjacentElement("beforebegin", mount);
    legacySection.hidden = true;

    const root: Root = createRoot(mount);
    root.render(<RegionalNetwork />);

    return () => {
      root.unmount();
      mount.remove();
      legacySection.hidden = false;
    };
  }, []);

  return null;
}
