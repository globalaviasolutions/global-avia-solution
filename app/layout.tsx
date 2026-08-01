import type { Metadata } from "next";
import MobileMenu from "./components/MobileMenu";
import "./globals.css";
import "./service-pages.css";
import "./additional.css";
import "./mobile-form.css";
import "./brand-v2.css";
import "./professional-images.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://security-solutions.africa"),
  title: {
    default: "Africa Security Solutions | Professional Security Across Africa",
    template: "%s | Africa Security Solutions",
  },
  description:
    "Executive protection, secure transportation, corporate security, journey management, airport and crew security, and risk consulting across Nigeria and West Africa.",
  keywords: [
    "security services Africa",
    "executive protection Nigeria",
    "secure transportation Lagos",
    "airport crew security",
    "journey management Africa",
    "corporate security Nigeria",
  ],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Africa Security Solutions",
    description: "Securing Africa. Protecting global business.",
    url: "https://security-solutions.africa",
    siteName: "Africa Security Solutions",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Africa Security Solutions" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Africa Security Solutions",
    description: "Securing Africa. Protecting global business.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileMenu />
      </body>
    </html>
  );
}
