import type { Metadata } from "next";
import MobileMenu from "./components/MobileMenu";
import "./globals.css";
import "./service-pages.css";
import "./additional.css";
import "./mobile-form.css";
import "./brand-v2.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://security-solutions.africa"),
  title: "Africa Security Solutions | Professional Security Across Africa",
  description:
    "Executive protection, secure transportation, corporate security, journey management, airport and crew security, and risk consulting across Nigeria and West Africa.",
  openGraph: {
    title: "Africa Security Solutions",
    description: "Securing Africa. Protecting global business.",
    url: "https://security-solutions.africa",
    siteName: "Africa Security Solutions",
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
