import type { Metadata } from "next";
import PremiumHome from "./components/PremiumHome";

export const metadata: Metadata = {
  alternates: { canonical: "https://security-solutions.africa/" },
};

export default function HomePage(){
  return <PremiumHome/>;
}
