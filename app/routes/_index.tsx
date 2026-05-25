import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/auth/server-utils";
import { useTRPC } from "@/lib/trpc/client";
import type { Route } from "./+types/_index";

export const loader = async (args: Route.LoaderArgs) => {
	const user = await getUser(args.request);
	return user;
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const trpc = useTRPC();
	const { data = [] } = useQuery(trpc.posts.list.queryOptions());

	return (
		<div>
			<h1>Home</h1>
			<div>User: {loaderData?.name ?? "(null)"}</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
