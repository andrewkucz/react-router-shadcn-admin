import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
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
import { ThemeScript } from "@/components/layout/theme-script";
import AuthProvider from "./lib/auth/provider";
import { getCookieFromReq } from "./lib/cookies";
import { DEFAULT_THEME, THEME_COOKIE_NAME } from "./lib/theme/utils";
import { TRPCQueryClientProvider } from "./lib/trpc/provider";

export function meta(args: Route.MetaArgs) {
	return [
		{ title: "Shadcn Admin React Router" },
		{
			name: "description",
			content: "Admin Dashboard UI built with Shadcn and React Router.",
		},
		{ name: "apple-mobile-web-app-title", content: "Admin" },
	];
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
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "/favicon.svg",
		media: "(prefers-color-scheme: light)",
	},
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "/favicon_light.svg",
		media: "(prefers-color-scheme: dark)",
	},
	{
		rel: "icon",
		type: "image/png",
		href: "/favicon.png",
		media: "(prefers-color-scheme: light)",
	},
	{
		rel: "icon",
		type: "image/png",
		href: "/favicon_light.png",
		media: "(prefers-color-scheme: dark)",
	},
];

export const loader = ({ request }: Route.LoaderArgs) => {
	const theme = getCookieFromReq(request, THEME_COOKIE_NAME, DEFAULT_THEME);

	return {
		theme,
	};
};

export function Layout({ children }: { children: React.ReactNode }) {
	const { theme } = useLoaderData<typeof loader>();
	const className = theme !== "system" ? theme : undefined;

	return (
		<html lang="en" className={className} suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<ThemeScript theme={theme} />
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
