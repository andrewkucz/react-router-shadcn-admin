import { atom } from "jotai";
import { atomCookie } from "@/lib/atom-cookie";

export type Collapsible = "offcanvas" | "icon" | "none";
const DEFAULT_COLLAPSIBLE: Collapsible = "icon";
export const layoutCollapsibleAtom = atomCookie<Collapsible>(
	"layout_collapsible",
	DEFAULT_COLLAPSIBLE,
);
export type Variant = "inset" | "sidebar" | "floating";

const DEFAULT_VARIANT: Variant = "inset";
export const layoutVariantAtom = atomCookie<Variant>(
	"layout_variant",
	DEFAULT_VARIANT,
);
export const layoutVariantDirtyAtom = atom(
	(get) => get(layoutVariantAtom) !== DEFAULT_VARIANT,
);
