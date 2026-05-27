import type { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs";
import { useCallback, useMemo } from "react";

type UseTablePaginationStateOptions = {
	defaultPageSize?: number;
};

export function useTablePaginationState(
	options: UseTablePaginationStateOptions = {},
) {
	const defaultPageSize = options.defaultPageSize ?? 10;

	const parsers = useMemo(
		() => ({
			pageIndex: parseAsIndex.withDefault(0),
			pageSize: parseAsInteger.withDefault(defaultPageSize),
		}),
		[defaultPageSize],
	);

	const [pagination, setPagination] = useQueryStates(parsers, {
		urlKeys: {
			pageIndex: "page",
			pageSize: "perPage",
		},
	});

	const onPaginationChange = useCallback<OnChangeFn<PaginationState>>(
		(updater) => {
			const next =
				typeof updater === "function" ? updater(pagination) : updater;

			void setPagination(next);
		},
		[pagination, setPagination],
	);

	const resetPage = useCallback(() => {
		return setPagination({ pageIndex: 0 });
	}, [setPagination]);

	const handlePageOutOfBounds = useCallback(
		(pageCount: number, pageIndex: number) => {
			if (pageCount > 0 && pageIndex >= pageCount) {
				void setPagination({ pageIndex: 0 }, { history: "replace" });
			}
		},
		[setPagination],
	);

	return {
		pagination,
		setPagination,
		resetPage,
		onPaginationChange,
		handlePageOutOfBounds,
	};
}
