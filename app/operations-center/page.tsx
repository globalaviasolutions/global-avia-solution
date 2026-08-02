import type { Metadata } from "next";
import OperationsCenter from "../components/OperationsCenter";

export const metadata: Metadata = {
  title: "Security Operations Centre",
  description: "Explore Africa Security Solutions' regional operating model, local times, capability pathways and operational support across Nigeria and selected West African markets.",
};

export default function OperationsCenterPage() {
  return <main id="main-content"><OperationsCenter /></main>;
}
