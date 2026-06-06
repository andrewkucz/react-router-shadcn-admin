import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { searchOpenAtom } from "@/stores/search";

export function SearchShortcut() {
	const setSearchOpen = useSetAtom(searchOpenAtom);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setSearchOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [setSearchOpen]);

	return null;
}
