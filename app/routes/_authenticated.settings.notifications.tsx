import { SettingsNotifications } from "@/features/settings/notifications";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Notifications");

export default function SettingsNotificationsPage() {
	return <SettingsNotifications />;
}
