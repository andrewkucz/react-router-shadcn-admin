import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { NavigationProgress } from "./components/navigation-progress";
import { Toaster } from "./components/ui/sonner";
import { DirectionProvider } from "./context/direction-provider";
import { FontProvider } from "./context/font-provider";
import { ThemeProvider } from "./context/theme-provider";
import { GeneralError } from "./features/errors/general-error";
import { NotFoundError } from "./features/errors/not-found-error";
import "./styles/index.css";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import AuthProvider from "./lib/auth/provider";
import { TRPCQueryClientProvider } from "./lib/trpc/provider";

export function meta(args: Route.MetaArgs) {
	return [{ title: "Shadcn Admin Remix" }];
}

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<NuqsAdapter>
					<TRPCQueryClientProvider>
						<AuthProvider>
							<ThemeProvider>
								<FontProvider>
									<DirectionProvider>
										<NavigationProgress />
										{children}
										<Toaster duration={5000} />
									</DirectionProvider>
								</FontProvider>
							</ThemeProvider>
						</AuthProvider>
					</TRPCQueryClientProvider>
				</NuqsAdapter>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <NotFoundError />;
		}
	}

	if (import.meta.env.DEV && error instanceof Error) {
		return (
			<main className="container mx-auto p-4 pt-16">
				<GeneralError minimal />
				<pre className="mt-4 w-full overflow-x-auto rounded-md border p-4 text-sm">
					<code>{error.stack}</code>
				</pre>
			</main>
		);
	}

	return <GeneralError />;
}
