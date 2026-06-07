import { useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import { CommandMenu } from "@/components/command-menu";
import { ConfigDrawer } from "@/components/config-drawer";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import type { TopNavLink } from "@/components/layout/top-nav";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { SearchShortcut } from "@/components/search-shortcut";
import { SkipToMain } from "@/components/skip-to-main";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarInset, SidebarWrapper } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type AuthenticatedLayoutProps = {
	children?: React.ReactNode;
};

type HeaderConfig = {
	matcher: (pathname: string) => boolean;
	hide?: boolean;
	fixed?: boolean;
	className?: string;
	topNav?: TopNavLink[];
};

const dashboardTopNav: TopNavLink[] = [
	{
		title: "Overview",
		href: "/",
		disabled: false,
	},
	{
		title: "Customers",
		href: "/dashboard/customers",
		disabled: true,
	},
	{
		title: "Products",
		href: "/dashboard/products",
		disabled: true,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		disabled: true,
	},
];

const headerConfigOverrides: HeaderConfig[] = [
	{
		matcher: (pathname) => pathname === "/",
		topNav: dashboardTopNav,
	},
	{
		matcher: (pathname) => pathname.startsWith("/tasks"),
		fixed: true,
	},
	{
		matcher: (pathname) => pathname.startsWith("/users"),
		fixed: true,
	},
	{
		matcher: (pathname) => pathname.startsWith("/errors/"),
		fixed: true,
		className: "border-b",
	},
	{
		matcher: (pathname) => pathname.startsWith("/help-center"),
		hide: true,
	},
];

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	const { pathname } = useLocation();
	const headerConfig = useMemo(() => {
		return headerConfigOverrides.find((config) => config.matcher(pathname));
	}, [pathname]);
	const hideHeader = headerConfig?.hide ?? false;
	const headerClassName = headerConfig?.className;
	const headerFixed = headerConfig?.fixed;
	const topNavLinks = headerConfig?.topNav;

	return (
		<SidebarWrapper>
			<SkipToMain />
			<AppSidebar />
			<SidebarInset
				className={cn(
					// Set content container, so we can use container queries
					"@container/content",

					// If layout is fixed, set the height
					// to 100svh to prevent overflow
					"has-data-[layout=fixed]:h-svh",

					// If layout is fixed and sidebar is inset,
					// set the height to 100svh - spacing (total margins) to prevent overflow
					"peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]",
				)}
			>
				{hideHeader ? null : (
					<Header fixed={headerFixed} className={headerClassName}>
						{topNavLinks ? (
							<TopNav links={topNavLinks} className="me-auto" />
						) : (
							<div className="me-auto">breadcrumbs here</div>
						)}
						<Search />
						<ThemeSwitch />
						<ConfigDrawer />
						<ProfileDropdown />
					</Header>
				)}
				{children ?? <Outlet />}
			</SidebarInset>
			<SearchShortcut />
			<CommandMenu />
		</SidebarWrapper>
	);
}
