"use client"

import { GroupsAPI, ResultsAPI } from "@/src/api";
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import useGetData from "@/src/hooks/useGetData";
import { usePagination } from "@/src/hooks/usePagination";
import { Group } from "@/src/types/groups";
import { Result } from "@/src/types/results";
import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/src/context/AuthContext";

export default function ResultsTable() {
    const { userData, loading: authLoading } = useAuth();
    const isStudent = userData?.role === "Student";

    const { data: results, isLoading: dataLoading } = useGetData<Result[]>(
        ResultsAPI.getAllResults
    );
    const { data: groups } = useGetData<Group[]>(
        GroupsAPI.GetAllGroups,
        [],
        !authLoading && !isStudent
    );

    // Build a lookup map: groupId -> Group
    const groupsMap = useMemo(() => {
        const map = new Map<string, Group>();
        groups?.forEach((group) => {
            map.set(group._id, group);
        });
        return map;
    }, [groups]);

    const columns: ColumnDef<Result>[] = useMemo(() => {
        const baseColumns: ColumnDef<Result>[] = [
            { header: "Title", accessor: (row) => row?.quiz?.title },
        ];

        if (!isStudent) {
            baseColumns.push(
                {
                    header: "Group Name",
                    accessor: (row) => groupsMap.get(row?.quiz?.group)?.name ?? "—",
                },
                {
                    header: "No. of persons in group",
                    accessor: (row) => {
                        const count = groupsMap.get(row?.quiz?.group)?.students.length ?? 0;
                        return `${count} ${count === 1 ? "Person" : "Persons"}`;
                    },
                },
                {
                    header: "Participants",
                    accessor: (row) => {
                        const count = Array.isArray(row.participants) ? row.participants.length : row.result ? 1 : 0;
                        return `${count} ${count === 1 ? "Participant" : "Participants"}`;
                    },
                }
            );
        }

        baseColumns.push({
            header: "Date",
            accessor: (row) => new Date(row?.quiz?.schadule).toLocaleDateString("en-GB"),
        });

        return baseColumns;
    }, [isStudent, groupsMap]);

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