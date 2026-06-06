import { atom } from "jotai";
import type { User } from "../data/schema";

export type UsersDialogType = "invite" | "add" | "edit" | "delete";

export const usersDialogAtom = atom<UsersDialogType | null>(null);

export const toggleUsersDialogAtom = atom(
	null,
	(get, set, dialog: UsersDialogType | null) => {
		set(usersDialogAtom, get(usersDialogAtom) === dialog ? null : dialog);
	},
);

export const currentUserRowAtom = atom<User | null>(null);
