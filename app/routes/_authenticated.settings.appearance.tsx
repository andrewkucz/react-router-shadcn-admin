import { SettingsAppearance } from "@/features/settings/appearance";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Appearance");

export default function SettingsAppearancePage() {
	return <SettingsAppearance />;
}
