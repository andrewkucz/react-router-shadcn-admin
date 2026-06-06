import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";
import { atomCookie } from "@/lib/atom-cookie";
import {
	DEFAULT_THEME,
	META_THEME_COLOR,
	PREFERS_LIGHT_MEDIA_QUERY,
	type ResolvedTheme,
} from "@/lib/theme";

export const themeAtom = atomCookie("theme", DEFAULT_THEME);

const applyTheme = (theme: ResolvedTheme) => {
	if (typeof window === "undefined") {
		return;
	}

	const root = window.document.documentElement;
	root.classList.remove("light", "dark"); // Remove existing theme classes
	root.classList.add(theme); // Add the new theme class
};

const resolvedThemeAtom = atom((get) => {
	const theme = get(themeAtom);

	if (theme === "system" && typeof window !== "undefined") {
		return window.matchMedia(PREFERS_LIGHT_MEDIA_QUERY).matches
			? "light"
			: "dark";
	}

	if (typeof window === "undefined") return "light";

	return theme as ResolvedTheme;
});

export const useResolvedTheme = () => useAtomValue(resolvedThemeAtom);
export const useTheme = () => useAtom(themeAtom);
export const useSetTheme = () => useSetAtom(themeAtom);
export const useResetTheme = () => useResetAtom(themeAtom);

export function ThemeSync() {
	const [theme] = useTheme();
	const resolvedTheme = useResolvedTheme();

	const isSystem = theme === "system";

	// apply theme & update <meta name="theme-color"> on change
	useEffect(() => {
		applyTheme(resolvedTheme);

		const metaThemeColor = document.querySelector("meta[name='theme-color']");
		if (metaThemeColor)
			metaThemeColor.setAttribute("content", META_THEME_COLOR[resolvedTheme]);
	}, [resolvedTheme]);

	// when theme is "system" - attach window event listener
	useEffect(() => {
		if (!isSystem) return;

		const mediaQuery = window.matchMedia(PREFERS_LIGHT_MEDIA_QUERY);

		const handleChange = () => {
			applyTheme(mediaQuery.matches ? "light" : "dark");
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [isSystem]);

	return null;
}
