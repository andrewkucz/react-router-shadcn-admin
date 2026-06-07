import { SettingsAccount } from "@/features/settings/account";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Account");

export default function SettingsAccountPage() {
	return <SettingsAccount />;
}
