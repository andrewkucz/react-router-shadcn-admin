import { useMutation } from "@tanstack/react-query";
import { redirect } from "react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/browser";
import { auth } from "@/lib/auth/server";
import type { Route } from "./+types/login";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	if (session) {
		throw redirect("/");
	}
};

export default function LoginPage() {
	const { mutate: login } = useMutation({
		mutationFn: async () => {
			const result = await authClient.signIn.social({ provider: "discord" });
			if (result.error) {
				throw result.error;
			}
			return result.data;
		},
		onError(error) {
			console.error(error);
		},
	});

	return (
		<div>
			<Button onClick={() => login()}>Login with Discord</Button>
		</div>
	);
}
