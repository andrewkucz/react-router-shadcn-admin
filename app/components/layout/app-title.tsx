import { useSetAtom } from "jotai";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { sidebarMobileOpenAtom, sidebarStateAtom } from "@/stores/sidebar";
import { Button } from "../ui/button";

export function AppTitle() {
	const setSidebarMobileOpen = useSetAtom(sidebarMobileOpenAtom);
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="gap-0 py-0 hover:bg-transparent active:bg-transparent"
					asChild
				>
					<div>
						<Link
							to="/"
							onClick={() => setSidebarMobileOpen(false)}
							className="grid flex-1 text-start text-sm leading-tight"
						>
							<span className="truncate font-bold">Shadcn-Admin</span>
							<span className="truncate text-xs">Vite + ShadcnUI</span>
						</Link>
						<ToggleSidebar />
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function ToggleSidebar({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const isMobile = useIsMobile();
	const setSidebarOpen = useSetAtom(sidebarStateAtom);
	const setSidebarMobileOpen = useSetAtom(sidebarMobileOpenAtom);

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			className={cn("aspect-square size-8 max-md:scale-125", className)}
			onClick={(event) => {
				onClick?.(event);
				if (isMobile) {
					setSidebarMobileOpen((open) => !open);
					return;
				}
				setSidebarOpen((open) => !open);
			}}
			{...props}
		>
			<X className="md:hidden" />
			<Menu className="max-md:hidden" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
