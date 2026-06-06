import { ensureSession } from "@better-auth-ui/react/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { sidebarStateAtom } from "@/components/ui/sidebar";
import { getAtomServerValue } from "@/lib/atom-cookie";
import { auth } from "@/lib/auth/server";
import { HydrateAtoms } from "@/lib/hydrate-atoms";
import { getServerQueryClient } from "@/lib/trpc/server.utils";
import type { Route } from "./+types/_authenticated";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const queryClient = getServerQueryClient();

	const session = await ensureSession(queryClient, auth, {
		headers: request.headers,
	});

	if (!session) {
		const currentPath = new URL(request.url).pathname;
		const redirectPath =
			currentPath && currentPath !== "/" ? `?redirect=${currentPath}` : "";

		throw redirect(`/sign-in${redirectPath}`);
	}

	return {
		dehydratedState: dehydrate(queryClient),
		sidebarState: getAtomServerValue(request, sidebarStateAtom),
	};
};

export default function AuthenticatedRouteLayout({
	loaderData,
}: Route.ComponentProps) {
	return (
		<HydrationBoundary state={loaderData.dehydratedState}>
			<HydrateAtoms init={[[sidebarStateAtom, loaderData.sidebarState]]}>
				<AuthenticatedLayout />
			</HydrateAtoms>
		</HydrationBoundary>
	);
}
