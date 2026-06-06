import * as Cookies from "es-cookie";
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

export const atomCookie = <T>(key: string, defaultValue: T) =>
	atomWithStorage(key, defaultValue, createCookieStorage<T>());
