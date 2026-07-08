"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { ReactNode } from "react"
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
  emptyLabel?: string;
}

export function DataTable<T>({columns, data, loading, renderActions, getRowId, maxHeight = "60vh", emptyLabel = "Items"}: DataTableProps<T>) {
  const rows = data ?? []

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="overflow-y-auto overflow-x-auto" style={{ maxHeight }}>
        <Table className="border-separate border-spacing-y-2 w-full sm:table-fixed">
          <TableHeader>
            <TableRow className="bg-black hover:bg-black">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={`sticky top-0 z-20 bg-black text-white font-medium h-11 text-sm px-4 border-r-2 border-white whitespace-nowrap sm:truncate sm:max-w-50 ${
                    i === 0 ? "rounded-l-md" : ""
                  } ${col.className ?? ""}`}
                  title={col.header}
                >
                  {col.header}
                </TableHead>
              ))}
              {renderActions && (
                <TableHead
                  className={`sticky top-0 z-20 bg-black text-white font-medium h-11 text-sm px-4 max-w-30 rounded-r-md text-center`}
                >
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
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
              rows.map((row) => {
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
                          className={`border-2 border-gray-200 text-sm px-4 py-2 whitespace-nowrap sm:truncate sm:max-w-50 ${
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
                        <div className="flex items-center justify-center gap-3">
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
                  <NoData item={emptyLabel} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}