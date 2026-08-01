import type { Metadata } from "next";
import MobileMenu from "./components/MobileMenu";
import "./globals.css";
import "./service-pages.css";
import "./additional.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://global-avia-solution.vercel.app"),
  title: "Global Avia Solution | Security Services in Nigeria",
  description:
    "Executive protection, airport and crew security, secure transportation, corporate security, journey management, and security consulting across Nigeria.",
  openGraph: {
    title: "Global Avia Solution",
    description: "Premium security coordination and aviation support across Nigeria.",
    url: "https://global-avia-solution.vercel.app",
    siteName: "Global Avia Solution",
    type: "website",
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
