import type { OnChangeFn } from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";

type UseTableGlobalFilterOptions = {
	param?: string;
};

export function useTableGlobalFilterState(
	resetPage: () => Promise<URLSearchParams>,
	options?: UseTableGlobalFilterOptions,
) {
	const key = options?.param ?? "filter";

	const [globalFilter, setGlobalFilter] = useQueryState(
		key,
		parseAsString.withDefault(""),
	);

	const onGlobalFilterChange = useCallback<OnChangeFn<string>>(
		(updater) => {
			const next =
				typeof updater === "function" ? updater(globalFilter) : updater;

			void resetPage();
			void setGlobalFilter(next.trim());
		},
		[globalFilter, setGlobalFilter, resetPage],
	);

	return {
		globalFilter,
		onGlobalFilterChange,
	};
}
