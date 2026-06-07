import { Tasks } from "@/features/tasks";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Tasks");

export default function TasksPage() {
	return <Tasks />;
}
