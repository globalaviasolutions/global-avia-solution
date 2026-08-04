"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import HomeQuickBrief from "./HomeQuickBrief";

export default function HomeQuickBriefMount() {
  useEffect(() => {
    const finalCta = document.querySelector<HTMLElement>(".premiumFinalCta");
    if (!finalCta || document.querySelector(".homeQuickBriefMount")) return;

    const mount = document.createElement("div");
    mount.className = "homeQuickBriefMount";
    finalCta.insertAdjacentElement("beforebegin", mount);

    const root: Root = createRoot(mount);
    root.render(<HomeQuickBrief />);

    return () => {
      root.unmount();
      mount.remove();
    };
  }, []);

  return null;
}
