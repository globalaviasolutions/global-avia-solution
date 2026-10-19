import type { Metadata, Viewport } from "next";
import GlobalEffects from "./components/GlobalEffects";
import StructuredData from "./components/StructuredData";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import CookieConsent from "./components/CookieConsent";
import CinematicHeroMount from "./components/CinematicHeroMount";
import SitePolish from "./components/SitePolish";
import "./globals.css";
import "./service-pages.css";
import "./additional.css";
import "./mobile-form.css";
import "./brand-v2.css";
import "./professional-images.css";
import "./professional-imagery.css";
import "./photo-upgrade.css";
import "./motion.css";
import "./industry-pages.css";
import "./trust.css";
import "./services-overview.css";
import "./coverage.css";
import "./locations.css";
import "./standards.css";
import "./enterprise.css";
import "./interactive-map.css";
import "./global-footer.css";
import "./global-header.css";
import "./contact-upgrade.css";
import "./cookie-consent.css";
import "./capability-statement.css";
import "./client-portal.css";
import "./security-assistant.css";
import "./regional-network.css";
import "./premium-motion.css";
import "./operations-center.css";
import "./home-premium.css";
import "./process-experience.css";
import "./home-quick-brief.css";
import "./cinematic-hero.css";
import "./home-3d-map.css";
import "./site-polish.css";
import "./operations-dashboard.css";
import "./contractor-dispatch.css";
import "./security-photography.css";

export const viewport: Viewport = { width:"device-width", initialScale:1, maximumScale:5, themeColor:"#0b0b0b", colorScheme:"dark" };
export const metadata: Metadata = {
  metadataBase:new URL("https://security-solutions.africa"), applicationName:"Africa Security Solutions", manifest:"/manifest.webmanifest",
  title:{default:"Security Services in West Africa | Africa Security Solutions",template:"%s | Africa Security Solutions"},
  description:"Security services across West Africa, including Lagos and Abuja: executive protection, secure transportation, airport and crew security, corporate security and journey management.",
  keywords:["security services West Africa","executive protection Nigeria","secure transportation Lagos","airport crew security","journey management Africa","corporate security Nigeria"],
  authors:[{name:"Africa Security Solutions"}],creator:"Africa Security Solutions",publisher:"Africa Security Solutions",category:"Business Services",
  icons:{icon:"/brand-icon.png",shortcut:"/brand-icon.png",apple:"/brand-icon.png"},appleWebApp:{capable:true,title:"Africa Security",statusBarStyle:"black-translucent"},
  formatDetection:{telephone:false,email:false,address:false},robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph:{title:"Africa Security Solutions",description:"Securing Africa. Protecting global business.",url:"https://security-solutions.africa",siteName:"Africa Security Solutions",images:[{url:"/opengraph-image",width:1200,height:630,alt:"Africa Security Solutions"}],locale:"en_GB",type:"website"},
  twitter:{card:"summary_large_image",title:"Africa Security Solutions",description:"Securing Africa. Protecting global business.",images:["/opengraph-image"]},
  verification:{google:"ZP2dGhYt2g5i-iRSQ7jnlybSaiOJY6K5HRHQkcQotmc"},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="skipLink" href="#main-content">Skip to main content</a><StructuredData/><SiteHeader/>{children}<SiteFooter/><CookieConsent/><CinematicHeroMount/><SitePolish/><GlobalEffects/></body></html>}
