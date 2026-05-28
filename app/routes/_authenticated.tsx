import { prefetchSession } from "@daveyplate/better-auth-tanstack/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { auth } from "@/lib/auth/server";
import { getServerQueryClient } from "@/lib/trpc/server.utils";
import type { Route } from "./+types/_authenticated";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const queryClient = getServerQueryClient();

	const { session } = await prefetchSession(
		// @ts-expect-error: TS issue with @daveyplate/better-auth-tanstack
		auth,
		queryClient,
		request,
	);

	if (!session) {
		throw redirect("/sign-in");
	}

	return {
		dehydratedState: dehydrate(queryClient),
	};
};

export default function AuthenticatedRouteLayout({
	loaderData,
}: Route.ComponentProps) {
	return (
		<HydrationBoundary state={loaderData.dehydratedState}>
			<AuthenticatedLayout />
		</HydrationBoundary>
	);
}
