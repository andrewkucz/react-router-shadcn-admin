import { Fragment } from "react";
import { Link, useMatches } from "react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { hasBreadcrumbHandle, resolveBreadcrumb } from "@/lib/breadcrumbs";

export function RouteBreadcrumbs() {
	const breadcrumbMatches = useMatches().filter(hasBreadcrumbHandle);

	if (!breadcrumbMatches.length) {
		return null;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbMatches.map((match, index) => {
					const label = resolveBreadcrumb(match);
					const isCurrentPage = index === breadcrumbMatches.length - 1;

					return (
						<Fragment key={match.id}>
							<BreadcrumbItem>
								{isCurrentPage ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link to={match.pathname}>{label}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{isCurrentPage ? null : <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
