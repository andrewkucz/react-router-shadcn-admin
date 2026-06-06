import { useAtomValue } from "jotai";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { layoutCollapsibleAtom, layoutVariantAtom } from "@/stores/layout";
// import { AppTitle } from './app-title'
import { sidebarData } from "./data/sidebar-data";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar() {
	const collapsible = useAtomValue(layoutCollapsibleAtom);
	const variant = useAtomValue(layoutVariantAtom);

	return (
		<Sidebar collapsible={collapsible} variant={variant}>
			<SidebarHeader>
				<TeamSwitcher teams={sidebarData.teams} />

				{/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
				{/* <AppTitle /> */}
			</SidebarHeader>
			<SidebarContent>
				{sidebarData.navGroups.map((props) => (
					<NavGroup key={props.title} {...props} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
