import { Settings } from "@/features/settings";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Settings");

export default function SettingsLayoutPage() {
	return <Settings />;
}
