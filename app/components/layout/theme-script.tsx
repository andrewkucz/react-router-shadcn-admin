export const prefersLightMQ = "(prefers-color-scheme: light)";

const clientThemeCode = `
(() => {
  const theme = window.matchMedia("${prefersLightMQ}").matches
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
};

export function ThemeScript({ nonce }: ThemeScriptProps) {
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: okay for client theme code
			dangerouslySetInnerHTML={{ __html: clientThemeCode }}
			nonce={nonce}
			suppressHydrationWarning
		/>
	);
}
