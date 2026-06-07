import { Users } from "@/features/users";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Users");

export default function UsersPage() {
	return <Users />;
}
