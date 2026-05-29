import { Link, useNavigate } from "react-router";
import { AuthProvider as BetterAuthUIProvider } from "@/components/auth/auth-provider";
import { authClient } from "./browser";

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigate = useNavigate();

	return (
		<BetterAuthUIProvider
			authClient={authClient}
			redirectTo="/settings/account"
			socialProviders={["github"]}
			navigate={navigate}
			Link={Link}
		>
			{children}
		</BetterAuthUIProvider>
	);
}
