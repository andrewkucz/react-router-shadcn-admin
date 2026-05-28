import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { authPlugin } from "./auth-plugin";
import { makeQueryClient } from "./query-client";

export const createContext = async (opts: { req: Request }) => {
	return opts;
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const authProcedure = publicProcedure.concat(authPlugin.authRequired);

export const getServerQueryClient = cache(makeQueryClient);
