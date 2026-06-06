import {
	META_THEME_COLOR,
	PREFERS_LIGHT_MEDIA_QUERY,
	type Theme,
} from "@/lib/theme";

const clientThemeCode = `
(() => {
  const theme = window.matchMedia("${PREFERS_LIGHT_MEDIA_QUERY}").matches
    ? 'light'
    : 'dark';
  
  const cl = document.documentElement.classList;
  const dataAttr = document.documentElement.dataset.theme;

  if (dataAttr != null) {
    const themeAlreadyApplied = dataAttr === 'light' || dataAttr === 'dark';
    if (!themeAlreadyApplied) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  }
  
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;

type ThemeScriptProps = {
	nonce?: string;
	theme: Theme;
};

export function ThemeScript({ nonce, theme }: ThemeScriptProps) {
	return (
		<>
			<meta
				name="color-scheme"
				content={theme === "dark" ? "dark light" : "light dark"}
			/>
			<meta
				name="theme-color"
				content={
					theme === "system" ? META_THEME_COLOR.light : META_THEME_COLOR[theme]
				}
			/>
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: okay for client theme code
				dangerouslySetInnerHTML={{ __html: clientThemeCode }}
				nonce={nonce}
				suppressHydrationWarning
			/>
		</>
	);
}
