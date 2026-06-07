import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type TopNavLink = {
	title: string;
	href: string;
	disabled?: boolean;
};

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
	links: TopNavLink[];
};

export function TopNav({ className, links, ...props }: TopNavProps) {
	const { pathname } = useLocation();

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						size="icon"
						variant="outline"
						className={cn("md:size-7 lg:hidden", className)}
					>
						<Menu />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" align="start">
					{links.map(({ title, href, disabled }) => (
						<DropdownMenuItem
							key={`${title}-${href}`}
							disabled={disabled}
							asChild
						>
							<Link
								to={href}
								className="text-sm aria-disabled:text-muted-foreground"
							>
								{title}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<nav
				className={cn(
					"hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6",
					className,
				)}
				{...props}
			>
				{links.map(({ title, href, disabled }) => (
					<AppLink
						key={`${title}-${href}`}
						to={href}
						active={href === pathname}
						disabled={disabled}
						className="text-sm"
					>
						{title}
					</AppLink>
				))}
			</nav>
		</>
	);
}
