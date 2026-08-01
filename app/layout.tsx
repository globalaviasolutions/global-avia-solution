import type { Metadata } from "next";
import "./globals.css";
import "./service-pages.css";

export const metadata: Metadata = {
  title: "Global Avia Solution | Security Services in Nigeria",
  description:
    "Executive protection, airport and crew security, secure transportation, and corporate security support across Nigeria.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
