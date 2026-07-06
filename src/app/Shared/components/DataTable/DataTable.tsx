// components/shared/data-table.tsx
"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { MoreVertical } from "lucide-react"
import { ReactNode, useState } from "react"
import Pagination from "../Pagination/Pagination"
import { Skeleton } from "@/components/ui/skeleton"
import NoData from "../NoData/NoData"

export interface ColumnDef<T> {
  header: string
  accessor: keyof T | ((row: T) => ReactNode)
  className?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[] | null | undefined;
  loading: boolean;
  renderActions?: (row: T) => ReactNode;
  getRowId: (row: T) => string | number;
  maxHeight?: string;
}

export function DataTable<T>({columns, data, loading, renderActions, getRowId , maxHeight = "60vh"}: DataTableProps<T>) {
  const rows = data ?? []

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentRows = rows.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  return (
    <>
      {/*tablet*/}
      <div className="hidden sm:block rounded-lg overflow-hidden">
        <div
          className="overflow-y-auto overflow-x-auto"
          style={{ maxHeight }}
        >
          <Table className="border-separate border-spacing-y-2 table-fixed w-full">
            <TableHeader>
              <TableRow className="bg-black hover:bg-black">
                {columns.map((col, i) => (
                  <TableHead
                    key={i}
                    className={`sticky top-0 z-20 bg-black text-white font-medium h-11 text-sm px-4 border-r-2 border-white truncate max-w-50 ${
                      i === 0 ? "rounded-l-md" : ""
                    } ${col.className ?? ""}`}
                    title={col.header}
                  >
                    {col.header}
                  </TableHead>
                ))}
                <TableHead
                  className={`sticky top-0 z-20 bg-black text-white font-medium h-11 text-sm px-4 max-w-30 ${
                    !renderActions ? "" : "rounded-r-md"
                  }`}
                >
                  {renderActions ? "Actions" : ""}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
                {loading ? (
                    Array.from({ length: 10 }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((_, colIndex) => (
                            <TableCell key={colIndex}>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            ))}

                            {renderActions && (
                            <TableCell>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            )}
                        </TableRow>
                    ))
                ) : rows.length > 0 ? (
                    currentRows.map((row) => {
                    const rowKey = getRowId(row);

                    return (
                        <TableRow
                            key={rowKey}
                            className="hover:bg-gray-50 border border-gray-200"
                        >
                            {columns.map((col, i) => {
                                const content =
                                    typeof col.accessor === "function"
                                    ? col.accessor(row)
                                    : (row[col.accessor] as ReactNode)

                                return (
                                    <TableCell
                                    key={i}
                                    className={`border-2 border-gray-200 text-sm px-4 py-2 truncate max-w-50 ${
                                        i === 0 ? "rounded-l-md" : ""
                                    } ${
                                        !renderActions && i === columns.length - 1
                                        ? "rounded-r-md"
                                        : ""
                                    } ${col.className ?? ""}`}
                                    title={typeof content === "string" ? content : undefined}
                                    >
                                    {content}
                                    </TableCell>
                                )
                            })}
                            {renderActions && (
                            <TableCell className="border-3 border-gray-200 rounded-r-md max-w-30 px-4">
                                <div className="flex items-center gap-3">
                                {renderActions(row)}
                                </div>
                            </TableCell>
                            )}
                        </TableRow>
                    );
                    })
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length + (renderActions ? 1 : 0)}>
                        <NoData item="Questions" />
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
          </Table>
        </div>
      </div>

      {/* grid */}
      <div className="sm:hidden flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight }} >
        {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm" >
                <Skeleton className="mb-4 h-5 w-3/4" />
                <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
            ))
        ) : rows.length > 0 ? (
            currentRows.map((row) => {
            const rowKey = getRowId(row);
            const [firstCol, ...restCols] = columns;

            const titleContent =
                typeof firstCol.accessor === "function"
                ? firstCol.accessor(row)
                : (row[firstCol.accessor] as ReactNode);

            return (
                <div key={rowKey} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm" >
                    <div className="mb-3 flex items-start justify-between gap-2">
                        <h3
                        className="min-w-0 flex-1 truncate text-base font-semibold text-black"
                        title={
                            typeof titleContent === "string" ? titleContent : undefined
                        }
                        >
                        {titleContent}
                        </h3>

                        {renderActions && (
                        <Popover>
                            <PopoverTrigger
                            className="shrink-0 rounded-full p-1.5 -mr-1.5 -mt-1 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                            aria-label="Open actions"
                            >
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                            </PopoverTrigger>

                            <PopoverContent align="end" className="w-auto p-2">
                            <div className="flex items-center gap-3">
                                {renderActions(row)}
                            </div>
                            </PopoverContent>
                        </Popover>
                        )}
                    </div>

                    <div className="flex flex-col divide-y divide-gray-100">
                        {restCols.map((col, i) => {
                            const content =
                                typeof col.accessor === "function"
                                ? col.accessor(row)
                                : (row[col.accessor] as ReactNode);

                            return (
                                <div
                                key={i}
                                className="flex items-center justify-between gap-3 py-2 text-sm first:pt-0 last:pb-0"
                                >
                                <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    {col.header}
                                </span>

                                <span
                                    className="truncate text-right text-gray-800"
                                    title={typeof content === "string" ? content : undefined}
                                >
                                    {content}
                                </span>
                                </div>
                            );
                            })}
                    </div>
                </div>
            );
            })
        ) : (
            <NoData item="Questions" />
        )}
        </div>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
        />
    </>
  )
}