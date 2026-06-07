import type { ReactNode } from "react";
import type { UIMatch } from "react-router";

export type BreadcrumbHandle = {
	breadcrumb:
		| ReactNode
		| ((match: UIMatch<unknown, BreadcrumbHandle>) => ReactNode);
};

export function breadcrumb(
	value: BreadcrumbHandle["breadcrumb"],
): BreadcrumbHandle {
	return { breadcrumb: value };
}

export function hasBreadcrumbHandle(
	match: UIMatch,
): match is UIMatch<unknown, BreadcrumbHandle> {
	return (
		typeof match.handle === "object" &&
		match.handle !== null &&
		"breadcrumb" in match.handle
	);
}

export function resolveBreadcrumb(
	match: UIMatch<unknown, BreadcrumbHandle>,
): ReactNode {
	return typeof match.handle.breadcrumb === "function"
		? match.handle.breadcrumb(match)
		: match.handle.breadcrumb;
}
