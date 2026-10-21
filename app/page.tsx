import PageStructuredData from "./components/PageStructuredData";
import { pageMetadata } from "./lib/seo";
import type { Metadata } from "next";
import PremiumHome from "./components/PremiumHome";

export const metadata: Metadata = pageMetadata("/", {
  alternates: { canonical: "https://security-solutions.africa/" },
});

export default function HomePage(){
  return <><PageStructuredData path="/" metadata={metadata} /><PremiumHome/></>;
}
