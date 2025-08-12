"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { DataTablePagination } from "./DataTablePagination";
import { InputSearch } from "./ui/input-search";
import { Button } from "./ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

export function EnhancedDataTable({
    columns,
    data = [],
    allowRowSelect = false,
    tableTitle = "",
}) {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnVisibility, setColumnVisibility] = React.useState(() =>
        Object.fromEntries(columns.map(column => [column.id, true])) // Initialize all columns as visible
    );
    const [rowSelection, setRowSelection] = React.useState({});

    const filteredData = React.useMemo(() => {
        return data.filter((row) => {
            return Object.entries(row).every(([key, value]) => {
                return value.toString().toLowerCase().includes(globalFilter.toLowerCase());
            });
        });
    }, [data, globalFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: allowRowSelect ? setRowSelection : undefined,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
    });

    const rows = table.getRowModel().rows || [];
    const hasRows = rows.length > 0;

    // Function to handle export actions
    const handleExport = (format) => {
        console.log(`Exporting to ${format}`);
    };

    const handleColumnVisibilityChange = (selectedColumns) => {
        const newVisibility = {};
        columns.forEach(column => {
            newVisibility[column.id] = selectedColumns.includes(column.id);
        });
        setColumnVisibility(newVisibility);
    };

    const columnOptions = columns.map(column => ({
        label: column.header,
        value: column.id,
    }));

    return (
        <div className="p-4 sm:p-6 sm:px-0">
            {tableTitle && (
                <div className="mb-3 sm:mb-[30px]">
                    <p className="text-[16px] font-[700] leading-[21.6px] text-blue-900">
                        {tableTitle}
                    </p>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="mb-2 md:mb-0">
                    <MultiSelect
                        id="column_visibility"
                        name="column_visibility"
                        options={columnOptions}
                        value={Object.entries(columnVisibility)
                            .filter(([key, visible]) => visible && key !== 'actions')
                            .map(([key]) => key)
                        }
                        onValueChange={handleColumnVisibilityChange}
                        className="w-full sm:w-[200px]" // Reduced width
                        placeholder="Select columns"
                        maxCount={1} // Limit badges shown
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-y-2 sm:space-x-2 mb-2 sm:mb-0">
                    <Button onClick={() => handleExport('copy')}>Copy</Button>
                    <Button onClick={() => handleExport('excel')}>Export to Excel</Button>
                    <Button onClick={() => handleExport('pdf')}>Export to PDF</Button>
                    <Button onClick={() => window.print()}>Print</Button>
                </div>

                <div className="flex items-start">
                    <InputSearch
                        placeholder={`Search`}
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="w-full bg-blue-50 sm:w-[185px] mr-2"
                    />
                </div>
            </div>

            <div>
                <Table className="min-w-full border-collapse border border-gray-300">
                    {hasRows && (
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    className="border-b border-gray-300 hover:bg-gray-100"
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            style={{
                                                minWidth: header?.column?.columnDef?.size,
                                                maxWidth: header?.column?.columnDef?.size,
                                            }}
                                            className="border border-gray-300 text-[16px] font-[700] leading-[16.8px] text-black-500 bg-gray-200"
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                    )}
                    <TableBody>
                        {hasRows ? (
                            rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-gray-50 border-b border-gray-300"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className="border border-gray-300 py-6 text-[16px] font-[400] leading-[16.8px] text-black"
                                            style={{
                                                minWidth: cell?.column?.columnDef?.size,
                                                maxWidth: cell?.column?.columnDef?.size,
                                            }}
                                            key={cell.id}
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
                                    className="pt-3 text-center"
                                >
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-[30px] flex items-center justify-end">
                {hasRows && <DataTablePagination table={table} />}
            </div>
        </div>
    );
}
