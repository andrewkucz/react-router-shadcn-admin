import type { WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { ReactNode } from "react";

// biome-ignore lint/suspicious/noExplicitAny: generic
type AtomsInit = Array<[WritableAtom<any, any, any>, unknown]>;

export const HydrateAtoms = ({
	children,
	init,
}: {
	children: ReactNode;
	init: AtomsInit;
}) => {
	const filtered = init.filter((v) => typeof v[1] !== "undefined");
	useHydrateAtoms(filtered, {
		dangerouslyForceHydrate: true,
	});
	return children;
};
