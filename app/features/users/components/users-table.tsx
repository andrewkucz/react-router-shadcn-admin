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
import { useTablePaginationState } from "@/hooks/use-table-pagination-state";
import { cn } from "@/lib/utils";
import { roles } from "../data/data";
import type { User } from "../data/schema";
import { DataTableBulkActions } from "./data-table-bulk-actions";
import { usersColumns as columns } from "./users-columns";

type DataTableProps = {
	data: User[];
};

export function UsersTable({ data }: DataTableProps) {
	// Local UI-only states
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>([]);

	// Local state management for table (uncomment to use local-only state, not synced with URL)
	// const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
	// const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

	const { pagination, resetPage, onPaginationChange, handlePageOutOfBounds } =
		useTablePaginationState({
			defaultPageSize: 10,
		});

	const [usernameFilter, setUsernameFilter] = useQueryState(
		"username",
		parseAsString.withDefault(""),
	);
	const [statusFilter, setStatusFilter] = useQueryState(
		"status",
		parseAsNativeArrayOf(parseAsString),
	);
	const [roleFilter, setRoleFilter] = useQueryState(
		"role",
		parseAsNativeArrayOf(parseAsString),
	);

	const columnFilters = useMemo<ColumnFiltersState>(() => {
		const nextColumnFilters: ColumnFiltersState = [];

		if (usernameFilter.trim() !== "") {
			nextColumnFilters.push({ id: "username", value: usernameFilter.trim() });
		}

		if (statusFilter.length > 0) {
			nextColumnFilters.push({ id: "status", value: statusFilter });
		}

		if (roleFilter.length > 0) {
			nextColumnFilters.push({ id: "role", value: roleFilter });
		}

		return nextColumnFilters;
	}, [roleFilter, statusFilter, usernameFilter]);

	const onColumnFiltersChange = useCallback<OnChangeFn<ColumnFiltersState>>(
		(updater) => {
			const next =
				typeof updater === "function" ? updater(columnFilters) : updater;
			const nextUsernameFilter = next.find(
				(filter) => filter.id === "username",
			);
			const nextStatusFilter = next.find((filter) => filter.id === "status");
			const nextRoleFilter = next.find((filter) => filter.id === "role");

			void resetPage();
			void setUsernameFilter(
				typeof nextUsernameFilter?.value === "string"
					? nextUsernameFilter.value.trim()
					: "",
			);
			void setStatusFilter(
				Array.isArray(nextStatusFilter?.value)
					? nextStatusFilter.value.map(String)
					: [],
			);
			void setRoleFilter(
				Array.isArray(nextRoleFilter?.value)
					? nextRoleFilter.value.map(String)
					: [],
			);
		},
		[
			columnFilters,
			resetPage,
			setRoleFilter,
			setStatusFilter,
			setUsernameFilter,
		],
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			pagination,
			rowSelection,
			columnFilters,
			columnVisibility,
		},
		enableRowSelection: true,
		onPaginationChange,
		onColumnFiltersChange,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	useEffect(() => {
		handlePageOutOfBounds(table.getPageCount(), pagination.pageIndex);
	}, [pagination.pageIndex, table, handlePageOutOfBounds]);

	return (
		<div
			className={cn(
				'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
				"flex flex-1 flex-col gap-4",
			)}
		>
			<DataTableToolbar
				table={table}
				searchPlaceholder="Filter users..."
				searchKey="username"
				filters={[
					{
						columnId: "status",
						title: "Status",
						options: [
							{ label: "Active", value: "active" },
							{ label: "Inactive", value: "inactive" },
							{ label: "Invited", value: "invited" },
							{ label: "Suspended", value: "suspended" },
						],
					},
					{
						columnId: "role",
						title: "Role",
						options: roles.map((role) => ({ ...role })),
					},
				]}
			/>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="group/row">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(
												"bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
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
									className="group/row"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={cn(
												"bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
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
