export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;

export const DEFAULT_THEME: Theme = "system";

export const META_THEME_COLOR: Record<ResolvedTheme, string> = {
	dark: "#020817",
	light: "#fff",
};

export const PREFERS_LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
