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
import Image from "next/image";
import * as React from "react";
import { DataTablePagination } from "./DataTablePagination";
import { TableSortComboBox } from "./TableSortComboBox";
import { InputSearch } from "./ui/input-search";
import { Button } from "./ui/button";

export function DataTable({
  columns,
  data = [],
  allowRowSelect = false,
  alumniContent = false,
  tableTitle = "",
}) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [filterValues, setFilterValues] = React.useState({
    batch: "",
    blood_group: "",
    city: "",
    country: "",
    industry: "",
    company: "",
    profession: "",
    degree: "",
  });

  // Function to handle filter changes from dropdowns
  const handleFilterChange = (field, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filter data based on selected dropdown values
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filterValues).every(([field, filterValue]) => {
        if (!filterValue) return true; // Skip empty filters

        // Handle nested properties for batch and country
        if (field === "batch") {
          return (
            row.batch_id?.fina_result?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        if (field === "country") {
          return (
            row.country_id?.name?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        if (field === "industry") {
          return (
            row.industry_id?.name?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        if (field === "company") {
          return (
            row.company_id?.name?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        if (field === "profession") {
          return (
            row.profession_id?.name?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        if (field === "degree") {
          return (
            row.batch_id?.degree_id?.degree_name?.toLowerCase() ===
            filterValue.toLowerCase()
          );
        }

        // For other fields, use the direct property
        return (
          row[field]?.toString().toLowerCase() === filterValue.toLowerCase()
        );
      });
    });
  }, [data, filterValues]);

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

  const handleRefresh = () => {
    setFilterValues({
      batch: "",
      blood_group: "",
      city: "",
      country: "",
      industry: "",
      company: "",
      profession: "",
      degree: "",
    });
    setGlobalFilter("");
  };

  const rows = table.getRowModel().rows || [];
  const hasRows = rows.length > 0;

  return (
    <div>
      {tableTitle && (
        <div className="mb-3 sm:mb-[30px]">
          <p className="text-[18px] font-[500] leading-[21.6px] text-blue-900">
            {tableTitle}
          </p>
        </div>
      )}

      {alumniContent && (
        <div className="mb-6 flex flex-col sm:mb-[50px]">
          {/* Filter Controls Container */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:items-center lg:justify-center">
            {/* TableSortComboBox components here */}
            {/* Add your filter components as needed */}
          </div>
        </div>
      )}

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
                      className="border border-gray-300 text-[14px] font-[600] leading-[16.8px] text-black-500 bg-gray-200"
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
                      className="border border-gray-300 py-6 text-[14px] font-medium leading-[16.8px] text-blue-500"
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
