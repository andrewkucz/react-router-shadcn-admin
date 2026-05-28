type Team = {
	name: string;
	logo: React.ElementType;
	plan: string;
};

type BaseNavItem = {
	title: string;
	badge?: string;
	icon?: React.ElementType;
};

// LinkProps["to"] | (string & {});
type PossibleUrl = string;

type NavLink = BaseNavItem & {
	url: PossibleUrl;
	items?: never;
};

type NavCollapsible = BaseNavItem & {
	items: (BaseNavItem & { url: PossibleUrl })[];
	url?: never;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
	title: string;
	items: NavItem[];
};

type SidebarData = {
	teams: Team[];
	navGroups: NavGroup[];
};

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData };
