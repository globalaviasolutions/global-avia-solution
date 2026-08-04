"use client";

import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import ProcessExperience from "./ProcessExperience";

export default function ProcessExperienceMount() {
  useEffect(() => {
    const legacySection = document.querySelector<HTMLElement>(".premiumWhy");
    if (!legacySection || document.querySelector(".processExperienceMount")) return;

    const mount = document.createElement("div");
    mount.className = "processExperienceMount";
    legacySection.insertAdjacentElement("beforebegin", mount);
    legacySection.hidden = true;

    const root: Root = createRoot(mount);
    root.render(<ProcessExperience />);

    return () => {
      root.unmount();
      mount.remove();
      legacySection.hidden = false;
    };
  }, []);

  return null;
}
