"use client"

import { QuestAPI } from "@/src/api";
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable";
import { DeleteConfirmation } from "@/src/app/Shared/components/DeleteConfirmation/DeleteConfirmation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import NoData from "@/src/app/Shared/components/NoData/NoData";
import useGetData from "@/src/hooks/useGetData";
import { usePagination } from "@/src/hooks/usePagination";
import { Question } from "@/src/types/questions";
import { CirclePlus, Eye, SquarePen, Trash2, MoreVertical } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import QuestionData from "./QuestionData";
import QuestionFilters, { QuestionFilterValues } from "./QuestionFilters";
import { AxiosResponse } from "axios";


export default function QuestionsBank() {

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
    const [mode, setMode] = useState("");
    const [filters, setFilters] = useState<QuestionFilterValues>({ type: "", difficulty: "" });

    const columns: ColumnDef<Question>[] = [
        { header: "Question Title", accessor: "title" },
        { header: "Question Desc", accessor: "description" },
        { header: "Question difficulty level", accessor: "difficulty" },
        { header: "Category", accessor: "type" },
    ]

    const hasActiveFilters = Boolean(filters.type || filters.difficulty)

    const fetchQuestions = useCallback((): Promise<AxiosResponse<Question[]>> => {
        if (hasActiveFilters) {
            return QuestAPI.SearchQuestions({
                type: filters.type || undefined,
                difficulty: filters.difficulty || undefined,
            });
        }
        return QuestAPI.GetAllQuestions();
    }, [hasActiveFilters, filters])

    const { data: questions, isLoading: dataLoading, refetch } = useGetData<Question[]>(
        fetchQuestions, [filters]
    );

    const { currentRows, currentPage, setCurrentPage, totalPages } = usePagination(questions, 10)

    const handleAddClick = ()=>{
        setMode("");
        setSelectedQuestion(null);
        setDataOpen(true);
    }

    const handleViewClick = (row: Question) => {
        setMode("view");
        setSelectedQuestion(row);
        setDataOpen(true);
    }

    const handleEditClick = (row: Question) => {
        setMode("edit");
        setSelectedQuestion(row);
        setDataOpen(true);
    }

    const handleDeleteClick = (row: Question) => {
        setSelectedQuestion(row);
        setDeleteOpen(true);
    }

    const deleteQuestion = async () => {
        if (!selectedQuestion?._id) return;
        try {
            const response = await QuestAPI.DeleteQuestion(selectedQuestion._id);
            toast.success(response?.data?.message)
            setSelectedQuestion(null);
            refetch();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const renderRowActions = (row: Question) => (
        <>
            <button onClick={() => handleViewClick(row)} className="text-[#F5A623] hover:opacity-70">
                <Eye className="h-5 w-5 cursor-pointer" />
            </button>
            <button onClick={() => handleEditClick(row)} className="text-[#F5A623] hover:opacity-70">
                <SquarePen className="h-5 w-5 cursor-pointer" />
            </button>
            <button onClick={() => handleDeleteClick(row)} className="text-[#F5A623] hover:opacity-70">
                <Trash2 className="h-5 w-5 cursor-pointer" />
            </button>
        </>
    )

  return (
    <>
        <div className="py-3 px-5 my-4 mx-2 border-2 rounded-xl h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bank Of Questions{questions ? ` (${questions.length})` : ""}</h2>
                <button
                    onClick={handleAddClick}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-2.5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors sm:px-4 cursor-pointer"
                >
                    <CirclePlus className="h-6 w-6 sm:h-8 sm:w-8 bg-black text-white rounded-2xl" />
                    <span className="hidden sm:inline">Add Question</span>
                </button>
            </div>

            <div className="mt-4">
                <QuestionFilters value={filters} onChange={setFilters} />
            </div>

            <div className="mt-4 min-w-0 w-full max-w-full flex-1">
                {/* table */}
                <DataTable
                    columns={columns}
                    data={currentRows}
                    loading={dataLoading}
                    getRowId={(row) => row._id}
                    emptyLabel="Questions"
                    renderActions={renderRowActions}
                />

                {/* grid */}
                <div className="sm:hidden flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: "60vh" }}>
                    {dataLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <Skeleton className="mb-4 h-5 w-3/4" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : currentRows.length > 0 ? (
                        currentRows.map((row) => (
                            <div key={row._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-start justify-between gap-2">
                                    <h3 className="min-w-0 flex-1 truncate text-base font-semibold text-black" title={row.title}>
                                        {row.title}
                                    </h3>

                                    <Popover>
                                        <PopoverTrigger
                                            className="shrink-0 rounded-full p-1.5 -mr-1.5 -mt-1 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                                            aria-label="Open actions"
                                        >
                                            <MoreVertical className="h-5 w-5 text-gray-500" />
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-auto p-2">
                                            <div className="flex items-center gap-3">
                                                {renderRowActions(row)}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="flex flex-col divide-y divide-gray-100">
                                    {columns.slice(1).map((col, i) => {
                                        const content =
                                            typeof col.accessor === "function"
                                                ? col.accessor(row)
                                                : row[col.accessor];

                                        return (
                                            <div key={i} className="flex items-center justify-between gap-3 py-2 text-sm first:pt-0 last:pb-0">
                                                <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    {col.header}
                                                </span>
                                                <span className="truncate text-right text-gray-800" title={typeof content === "string" ? content : undefined}>
                                                    {content as React.ReactNode}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoData item="Questions" />
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>

        <DeleteConfirmation
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            onConfirm={deleteQuestion}
            item="Question"
            itemData={selectedQuestion}
            displayName={selectedQuestion?.title}
        />

        <QuestionData 
            open={dataOpen}
            onOpenChange={setDataOpen}
            questionInfo={selectedQuestion}
            refetch={refetch}
            mode={mode}
        />
    </>
  )
}