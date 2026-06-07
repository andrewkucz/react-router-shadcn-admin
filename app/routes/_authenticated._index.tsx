import { Dashboard } from "@/features/dashboard";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Dashboard");

export default function DashboardPage() {
	return <Dashboard />;
}
