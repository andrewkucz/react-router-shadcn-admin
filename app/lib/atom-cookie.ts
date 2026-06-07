import * as Cookies from "es-cookie";
import type { Atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const createCookieStorage = <T>(ops?: Cookies.CookieAttributes) =>
	createJSONStorage<T>(() => ({
		getItem(key) {
			return Cookies.get(key) ?? null;
		},
		setItem: (key, newValue) => {
			Cookies.set(key, newValue, ops);
		},
		removeItem(key) {
			Cookies.remove(key, ops);
		},
	}));

export const atomCookie = <T>(key: string, defaultValue: T) => {
	const a = atomWithStorage(
		key,
		defaultValue,
		typeof window === "undefined" ? createJSONStorage() : createCookieStorage(),
	);
	a.debugLabel = key;
	return a;
};

export const getAtomServerValue = <T>(
	req: Request,
	atom: Atom<T>,
	defaultValue?: T,
) => {
	const key = atom.debugLabel;
	if (!key) throw new Error("Server atoms must have a debugLabel set");
	const cookieString = req.headers.get("cookie");
	if (!cookieString) return defaultValue;
	const parsed = Cookies.parse(cookieString);

	if (!(key in parsed)) {
		return defaultValue;
	}

	try {
		return JSON.parse(parsed[key]) as T;
	} catch {
		console.error("Unable to parse cookie as json", key, parsed[key]);
		return defaultValue;
	}
};
