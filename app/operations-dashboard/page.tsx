import type { Metadata } from "next";
import OperationsDashboard from "../components/OperationsDashboard";
import { seedVerifiedContractors } from "../lib/seedVerifiedContractors";

export const metadata: Metadata = {
  title: "Operations Dashboard",
  description: "Internal request-management dashboard for Africa Security Solutions.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OperationsDashboardPage() {
  await seedVerifiedContractors();
  return <main id="main-content" className="opsAdminPage"><OperationsDashboard /></main>;
}
