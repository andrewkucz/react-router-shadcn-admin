import { createContext, useContext, useEffect, useState } from "react";
import {
	DEFAULT_FONT,
	FONT_COOKIE_NAME,
	type Font,
	fonts,
} from "@/config/fonts";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";

const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type FontContextType = {
	font: Font;
	setFont: (font: Font) => void;
	resetFont: () => void;
};

const FontContext = createContext<FontContextType | null>(null);

function applyFontClass(font: Font) {
	const root = document.documentElement;
	root.classList.forEach((cls) => {
		if (cls.startsWith("font-")) root.classList.remove(cls);
	});
	if (font !== "system") {
		root.classList.add(`font-${font}`);
	}
}

export function FontProvider({
	children,
	initialFont = DEFAULT_FONT,
}: {
	children: React.ReactNode;
	initialFont?: Font;
}) {
	const [font, _setFont] = useState(() => {
		const savedFont = getCookie(FONT_COOKIE_NAME, initialFont);
		return fonts.includes(savedFont) ? savedFont : initialFont;
	});

	useEffect(() => {
		applyFontClass(font);
	}, [font]);

	const setFont = (font: Font) => {
		setCookie(FONT_COOKIE_NAME, font, FONT_COOKIE_MAX_AGE);
		_setFont(font);
	};

	const resetFont = () => {
		removeCookie(FONT_COOKIE_NAME);
		_setFont(DEFAULT_FONT);
	};

	return (
		<FontContext value={{ font, setFont, resetFont }}>{children}</FontContext>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error("useFont must be used within a FontProvider");
	}
	return context;
};
