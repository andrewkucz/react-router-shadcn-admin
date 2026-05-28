import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { handleServerError } from "../handle-server-error";

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: (failureCount, error) => {
					if (import.meta.env.DEV) {
						return false;
					}
					if (failureCount > 3) {
						return false;
					}
					return !(
						error instanceof AxiosError &&
						[401, 403].includes(error.response?.status ?? 0)
					);
				},
				refetchOnWindowFocus: import.meta.env.PROD,
				staleTime: 10 * 1000,
			},
			mutations: {
				onError: (error) => {
					handleServerError(error);

					if (error instanceof AxiosError && error.response?.status === 304) {
						toast.error("Content not modified!");
					}
				},
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				if (!(error instanceof AxiosError)) {
					return;
				}

				if (error.response?.status === 401) {
					toast.error("Session expired!");
					const redirect = window.location.pathname + window.location.search;
					window.location.assign(
						`/sign-in?${new URLSearchParams({ redirect }).toString()}`,
					);
				}

				if (error.response?.status === 500) {
					toast.error("Internal Server Error!");
					if (import.meta.env.PROD) {
						window.location.assign("/500");
					}
				}
			},
		}),
	});
}
