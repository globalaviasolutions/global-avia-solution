"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import HomeOperationsMap from "./HomeOperationsMap";

export default function HomeOperationsMapMount() {
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const existing = document.querySelector<HTMLElement>(".regionalNetwork");
    if (!existing || document.querySelector(".home3dMapMount")) return;

    const mount = document.createElement("div");
    mount.className = "home3dMapMount";
    existing.insertAdjacentElement("beforebegin", mount);
    existing.hidden = true;

    const root: Root = createRoot(mount);
    root.render(<HomeOperationsMap />);

    return () => {
      root.unmount();
      mount.remove();
      existing.hidden = false;
    };
  }, []);

  return null;
}
