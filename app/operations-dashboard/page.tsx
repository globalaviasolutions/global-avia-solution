import type { Metadata } from "next";
import OperationsDashboard from "../components/OperationsDashboard";

export const metadata: Metadata = {
  title: "Operations Dashboard",
  description: "Internal request-management dashboard for Africa Security Solutions.",
  robots: { index: false, follow: false },
};

export default function OperationsDashboardPage() {
  return <main id="main-content" className="opsAdminPage"><OperationsDashboard /></main>;
}
