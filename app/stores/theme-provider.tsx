import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { getCookie, removeCookie, setCookie } from "@/lib/cookies";
import {
	DEFAULT_THEME,
	PREFERS_LIGHT_MEDIA_QUERY,
	type ResolvedTheme,
	THEME_COOKIE_MAX_AGE,
	THEME_COOKIE_NAME,
	type Theme,
} from "@/lib/theme/utils";

type ThemeProviderProps = {
	children: React.ReactNode;
};

type ThemeProviderState = {
	resolvedTheme: ResolvedTheme;
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resetTheme: () => void;
};

const initialState: ThemeProviderState = {
	resolvedTheme: "light",
	theme: DEFAULT_THEME,
	setTheme: () => null,
	resetTheme: () => null,
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, _setTheme] = useState(() =>
		getCookie(THEME_COOKIE_NAME, DEFAULT_THEME),
	);

	// Optimized: Memoize the resolved theme calculation to prevent unnecessary re-computations
	const resolvedTheme = useMemo((): ResolvedTheme => {
		if (theme === "system" && typeof window !== "undefined") {
			return window.matchMedia(PREFERS_LIGHT_MEDIA_QUERY).matches
				? "light"
				: "dark";
		}
		return theme as ResolvedTheme;
	}, [theme]);

	useEffect(() => {
		const root = window.document.documentElement;
		const mediaQuery = window.matchMedia(PREFERS_LIGHT_MEDIA_QUERY);

		const applyTheme = (currentResolvedTheme: ResolvedTheme) => {
			root.classList.remove("light", "dark"); // Remove existing theme classes
			root.classList.add(currentResolvedTheme); // Add the new theme class
		};

		const handleChange = () => {
			if (theme === "system") {
				const systemTheme = mediaQuery.matches ? "dark" : "light";
				applyTheme(systemTheme);
			}
		};

		applyTheme(resolvedTheme);

		mediaQuery.addEventListener("change", handleChange);

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme, resolvedTheme]);

	const setTheme = useCallback((theme: Theme) => {
		setCookie(THEME_COOKIE_NAME, theme, THEME_COOKIE_MAX_AGE);
		_setTheme(theme);
	}, []);

	const resetTheme = useCallback(() => {
		removeCookie(THEME_COOKIE_NAME);
		_setTheme(DEFAULT_THEME);
	}, []);

	const contextValue = useMemo(
		() => ({
			resolvedTheme,
			resetTheme,
			theme,
			setTheme,
		}),
		[resolvedTheme, resetTheme, theme, setTheme],
	);

	return <ThemeContext value={contextValue}>{children}</ThemeContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
