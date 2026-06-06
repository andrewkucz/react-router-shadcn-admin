import { useAtom } from "jotai";
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { searchOpenAtom } from "@/stores/search";
import { useSetTheme } from "@/stores/theme";
import { sidebarData } from "./layout/data/sidebar-data";
import { ScrollArea } from "./ui/scroll-area";

export function CommandMenu() {
	const navigate = useNavigate();
	const setTheme = useSetTheme();
	const [open, setOpen] = useAtom(searchOpenAtom);

	const runCommand = React.useCallback(
		(command: () => unknown) => {
			setOpen(false);
			command();
		},
		[setOpen],
	);

	return (
		<CommandDialog modal open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<ScrollArea type="hover" className="h-72 pe-1">
					<CommandEmpty>No results found.</CommandEmpty>
					{sidebarData.navGroups.map((group) => (
						<CommandGroup key={group.title} heading={group.title}>
							{group.items.map((navItem, i) => {
								if (navItem.url)
									return (
										<CommandItem
											// biome-ignore lint/suspicious/noArrayIndexKey: needed
											key={`${navItem.url}-${i}`}
											value={navItem.title}
											onSelect={() => {
												runCommand(() => navigate({ pathname: navItem.url }));
											}}
										>
											<div className="flex size-4 items-center justify-center">
												<ArrowRight className="size-2 text-muted-foreground/80" />
											</div>
											{navItem.title}
										</CommandItem>
									);

								return navItem.items?.map((subItem, i) => (
									<CommandItem
										// biome-ignore lint/suspicious/noArrayIndexKey: needed
										key={`${navItem.title}-${subItem.url}-${i}`}
										value={`${navItem.title}-${subItem.url}`}
										onSelect={() => {
											runCommand(() => navigate({ pathname: subItem.url }));
										}}
									>
										<div className="flex size-4 items-center justify-center">
											<ArrowRight className="size-2 text-muted-foreground/80" />
										</div>
										{navItem.title} <ChevronRight /> {subItem.title}
									</CommandItem>
								));
							})}
						</CommandGroup>
					))}
					<CommandSeparator />
					<CommandGroup heading="Theme">
						<CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
							<Sun /> <span>Light</span>
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
							<Moon className="scale-90" />
							<span>Dark</span>
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
							<Laptop />
							<span>System</span>
						</CommandItem>
					</CommandGroup>
				</ScrollArea>
			</CommandList>
		</CommandDialog>
	);
}
