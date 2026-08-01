import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Africa Security Solutions",
    short_name: "Africa Security",
    description: "Professional operational support across Nigeria and West Africa.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#0b0b0b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
