import { Apps } from "@/features/apps";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Apps");

export default function AppsPage() {
	return <Apps />;
}
