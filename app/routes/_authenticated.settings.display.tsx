import { SettingsDisplay } from "@/features/settings/display";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Display");

export default function SettingsDisplayPage() {
	return <SettingsDisplay />;
}
