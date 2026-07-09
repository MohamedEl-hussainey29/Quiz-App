"use client"

import { useMemo } from "react";
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable";
import { ResultsAPI } from "@/src/api";
import { Result, Participant } from "@/src/types/results";
import useGetData from "@/src/hooks/useGetData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface ResultDetailsTableProps {
    resultsId: string;
}

export default function ResultDetailsTable({ resultsId }: ResultDetailsTableProps) {
    const { data: results, isLoading, error } = useGetData<Result[]>(
        ResultsAPI.getAllResults
    );

    const result = useMemo(
        () => results?.find((r) => r.quiz._id === resultsId) ?? null,
        [results, resultsId]
    );

    const participants: Participant[] = useMemo(() => {
        if (!result) return [];
        if (Array.isArray(result.participants)) return result.participants;
        if (result.result) return [result.result];
        return [];
    }, [result]);

    const maxScore = result ? result.quiz.questions_number * result.quiz.score_per_question : 0;

    const columns: ColumnDef<Participant>[] = [
        { header: "Student name", accessor: (row) => `${row.participant.first_name} ${row.participant.last_name}` },
        { header: "Score", accessor: (row) => row.score },
        { header: "Average", accessor: () => maxScore },
        { header: "Time submitted", accessor: (row) => new Date(row.started_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) },
    ];

    if (error) return <div>Error: {error}</div>;
    if (!isLoading && !result) return <div>No result found for this quiz.</div>;

    return (
        <>
            <Breadcrumb className="my-4 mx-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/results">All Results</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="text-black font-semibold">
                        <BreadcrumbLink>{result?.quiz?.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="pt-3 pb-6 px-5 my-4 mx-2 border-2 rounded-xl sm:w-1/2 max-h-[86vh] overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <DataTable
                    columns={columns}
                    data={participants}
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    emptyLabel="Participants"
                />
            </div>
        </>
    );
}