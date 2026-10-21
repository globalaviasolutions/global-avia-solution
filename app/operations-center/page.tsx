import PageStructuredData from "../components/PageStructuredData";
import { pageMetadata } from "../lib/seo";
import type { Metadata } from "next";
import OperationsCenter from "../components/OperationsCenter";

export const metadata: Metadata = pageMetadata("/operations-center", {
  title: "Security Operations Centre",
  description: "Explore Africa Security Solutions' regional operating model, local times, capability pathways and operational support across Nigeria and selected West African markets.",
});

export default function OperationsCenterPage() {
  return <main id="main-content"><PageStructuredData path="/operations-center" metadata={metadata} /><OperationsCenter /></main>;
}
