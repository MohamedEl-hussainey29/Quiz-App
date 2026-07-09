"use client"

import { ResultsAPI } from "@/src/api";
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import useGetData from "@/src/hooks/useGetData";
import { usePagination } from "@/src/hooks/usePagination";
import { Result } from "@/src/types/results";
import Link from "next/link";

export default function ResultsTable() {

    const columns: ColumnDef<Result>[] = [
        { header: "Title", accessor: (row) => row?.quiz?.title },
        { header: "Group Name", accessor: (row) => row?.quiz?.group },
        {
            header: "Participants", accessor: (row) => {
                const count = row.participants.length;
                return `${count} ${count === 1 ? "Participant" : "Participants"}`;
            }
        },
        { header: "Date", accessor: (row) => new Date(row?.quiz?.schadule).toLocaleDateString("en-GB") }
    ]

    const { data: results, isLoading: dataLoading } = useGetData<Result[]>(
        ResultsAPI.getAllResults
    );

    const { currentRows, currentPage, setCurrentPage, totalPages } = usePagination(results, 10);

    const renderRowActions = (row: Result) => (
        <Link
            href={`/dashboard/results/${row?.quiz?._id}`}
            className="text-black bg-[#C5D86D] px-5 py-2 rounded-xl font-bold hover:opacity-70"
        >
            View
        </Link>
    )

    return (
        <div className="pt-3 pb-6 px-5 my-4 mx-2 border-2 rounded-xl max-h-[86vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Completed Quizzes</h2>
            </div>

            <div className="mt-4 min-w-0 w-full max-w-full flex-1">
                <DataTable
                    columns={columns}
                    data={currentRows}
                    loading={dataLoading}
                    getRowId={(row) => row?.quiz?._id}
                    emptyLabel="Results"
                    renderActions={renderRowActions}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}