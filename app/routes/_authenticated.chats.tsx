import { Chats } from "@/features/chats";
import { breadcrumb } from "@/lib/breadcrumbs";

export const handle = breadcrumb("Chats");

export default function ChatsPage() {
	return <Chats />;
}
