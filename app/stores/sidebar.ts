import { atom } from "jotai";
import { atomCookie } from "@/lib/atom-cookie";

export const sidebarStateAtom = atomCookie("sidebar_state", true);
export const sidebarMobileOpenAtom = atom(false);
