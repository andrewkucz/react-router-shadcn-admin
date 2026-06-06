import { atom } from "jotai";
import type { Task } from "../data/schema";

export type TasksDialogType = "create" | "update" | "delete" | "import";

export const tasksDialogAtom = atom<TasksDialogType | null>(null);

export const toggleTasksDialogAtom = atom(
	null,
	(get, set, dialog: TasksDialogType | null) => {
		set(tasksDialogAtom, get(tasksDialogAtom) === dialog ? null : dialog);
	},
);

export const currentTaskRowAtom = atom<Task | null>(null);
