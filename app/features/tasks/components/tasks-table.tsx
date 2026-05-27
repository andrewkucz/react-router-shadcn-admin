import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type OnChangeFn,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataTablePagination, DataTableToolbar } from "@/components/data-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTableGlobalFilterState } from "@/hooks/use-table-global-filter-state";
import { useTablePaginationState } from "@/hooks/use-table-pagination-state";
import { cn } from "@/lib/utils";
import { priorities, statuses } from "../data/data";
import type { Task } from "../data/schema";
import { DataTableBulkActions } from "./data-table-bulk-actions";
import { tasksColumns as columns } from "./tasks-columns";

type DataTableProps = {
	data: Task[];
};

export function TasksTable({ data }: DataTableProps) {
	// Local UI-only states
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	// Local state management for table (uncomment to use local-only state, not synced with URL)
	// const [globalFilter, onGlobalFilterChange] = useState('')
	// const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
	// const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

	const { pagination, resetPage, onPaginationChange, handlePageOutOfBounds } =
		useTablePaginationState({
			defaultPageSize: 10,
		});

	const { globalFilter, onGlobalFilterChange } =
		useTableGlobalFilterState(resetPage);

	const [statusFilter, setStatusFilter] = useQueryState(
		"status",
		parseAsNativeArrayOf(parseAsString),
	);
	const [priorityFilter, setPriorityFilter] = useQueryState(
		"priority",
		parseAsNativeArrayOf(parseAsString),
	);

	const columnFilters = useMemo<ColumnFiltersState>(() => {
		const nextColumnFilters: ColumnFiltersState = [];

		if (statusFilter.length > 0) {
			nextColumnFilters.push({ id: "status", value: statusFilter });
		}

		if (priorityFilter.length > 0) {
			nextColumnFilters.push({ id: "priority", value: priorityFilter });
		}

		return nextColumnFilters;
	}, [priorityFilter, statusFilter]);

	const onColumnFiltersChange = useCallback<OnChangeFn<ColumnFiltersState>>(
		(updater) => {
			const next =
				typeof updater === "function" ? updater(columnFilters) : updater;
			const nextStatusFilter = next.find((filter) => filter.id === "status");
			const nextPriorityFilter = next.find(
				(filter) => filter.id === "priority",
			);

			void resetPage();
			void setStatusFilter(
				Array.isArray(nextStatusFilter?.value)
					? nextStatusFilter.value.map(String)
					: [],
			);
			void setPriorityFilter(
				Array.isArray(nextPriorityFilter?.value)
					? nextPriorityFilter.value.map(String)
					: [],
			);
		},
		[columnFilters, resetPage, setPriorityFilter, setStatusFilter],
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			globalFilter,
			pagination,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		globalFilterFn: (row, _columnId, filterValue) => {
			const id = String(row.getValue("id")).toLowerCase();
			const title = String(row.getValue("title")).toLowerCase();
			const searchValue = String(filterValue).toLowerCase();

			return id.includes(searchValue) || title.includes(searchValue);
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onPaginationChange,
		onGlobalFilterChange,
		onColumnFiltersChange,
	});

	useEffect(() => {
		handlePageOutOfBounds(table.getPageCount(), pagination.pageIndex);
	}, [table, pagination.pageIndex, handlePageOutOfBounds]);

	return (
		<div
			className={cn(
				'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
				"flex flex-1 flex-col gap-4",
			)}
		>
			<DataTableToolbar
				table={table}
				searchPlaceholder="Filter by title or ID..."
				filters={[
					{
						columnId: "status",
						title: "Status",
						options: statuses,
					},
					{
						columnId: "priority",
						title: "Priority",
						options: priorities,
					},
				]}
			/>
			<div className="overflow-hidden rounded-md border">
				<Table className="min-w-xl">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(
												header.column.columnDef.meta?.className,
												header.column.columnDef.meta?.thClassName,
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={cn(
												cell.column.columnDef.meta?.className,
												cell.column.columnDef.meta?.tdClassName,
											)}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} className="mt-auto" />
			<DataTableBulkActions table={table} />
		</div>
	);
}
