"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import HomeOperationsMap from "./HomeOperationsMap";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function HomeOperationsMapMount() {
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const existing = document.querySelector<HTMLElement>(".regionalNetwork");
    if (!existing || document.querySelector(".home3dMapMount")) return;

    const mount = document.createElement("div");
    mount.className = "home3dMapMount home3dMapPending";
    mount.innerHTML = `<section class="mapLoadPlaceholder" aria-label="Operations map loading">
      <div class="mapLoadGrid"></div>
      <div class="mapLoadCopy"><span>Operations network</span><strong>Regional capability map</strong><small>Interactive layers load as this section enters view.</small></div>
      <div class="mapLoadPulse" aria-hidden="true"></div>
    </section>`;
    existing.insertAdjacentElement("beforebegin", mount);
    existing.hidden = true;

    let root: Root | null = null;
    let observer: IntersectionObserver | null = null;
    let idleId: number | null = null;
    const idleWindow = window as IdleWindow;

    const renderMap = () => {
      if (root) return;
      mount.classList.remove("home3dMapPending");
      mount.innerHTML = "";
      root = createRoot(mount);
      root.render(<HomeOperationsMap />);
      observer?.disconnect();
    };

    if (!("IntersectionObserver" in window)) {
      renderMap();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) renderMap();
      }, { rootMargin: "500px 0px", threshold: 0.01 });
      observer.observe(mount);
      idleId = idleWindow.requestIdleCallback?.(renderMap, { timeout: 4500 }) ?? null;
    }

    return () => {
      observer?.disconnect();
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId);
      root?.unmount();
      mount.remove();
      existing.hidden = false;
    };
  }, []);

  return null;
}
