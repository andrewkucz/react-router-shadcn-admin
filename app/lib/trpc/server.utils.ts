import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./router";
import { createContext } from "./server";

export const getServerQueryClient = cache(makeQueryClient);

export const getServerTRPC = (request: Request) =>
	createTRPCOptionsProxy({
		ctx: () => createContext({ req: request }),
		router: appRouter,
		queryClient: getServerQueryClient,
	});
