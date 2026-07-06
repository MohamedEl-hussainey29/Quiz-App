import { useMemo, useState } from "react"

export function usePagination<T>(data: T[] | null | undefined, itemsPerPage = 10) {
  const rows = useMemo(() => data ?? [], [data])
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(rows.length / itemsPerPage))
  const firstIndex = (currentPage - 1) * itemsPerPage

  const currentRows = useMemo(
    () => rows.slice(firstIndex, firstIndex + itemsPerPage),
    [rows, firstIndex, itemsPerPage]
  )

  return { currentRows, currentPage, setCurrentPage, totalPages }
}