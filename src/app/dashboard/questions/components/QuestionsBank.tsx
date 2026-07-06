"use client"

import { QuestAPI } from "@/src/api";
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable";
import useGetData from "@/src/hooks/useGetData";
import { Question } from "@/src/types/questions";
import { CirclePlus , Eye , SquarePen , Trash2 } from "lucide-react";


export default function QuestionsBank() {

    const columns: ColumnDef<Question>[] = [
        { header: "Question Title", accessor: "title" },
        { header: "Question Desc", accessor: "description" },
        { header: "Question difficulty level", accessor: "difficulty" },
        { header: "Category", accessor: "type" },
    ]

    const { data: questions, isLoading } = useGetData<Question[]>(
        QuestAPI.GetAllQuestions
    )

  return (
    <>
        <div className="py-3 px-5 my-4 mx-2 border-2 rounded-xl h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bank Of Questions</h2>
                <button className="flex items-center gap-2 rounded-full border border-gray-200 px-2.5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors sm:px-4 cursor-pointer">
                    <CirclePlus className="h-6 w-6 sm:h-8 sm:w-8 bg-black text-white rounded-2xl" />
                    <span className="hidden sm:inline">Add Question</span>
                </button>
            </div>
            <div className="mt-4 min-w-0 w-full max-w-full flex-1">
                <DataTable
                    columns={columns}
                    data={questions}
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    renderActions={(row) => (
                    <>
                        <button onClick={() => console.log("view", row._id)} className="text-[#F5A623] hover:opacity-70">
                        <Eye className="h-5 w-5 cursor-pointer" />
                        </button>
                        <button onClick={() => console.log("edit", row._id)} className="text-[#F5A623] hover:opacity-70">
                        <SquarePen className="h-5 w-5 cursor-pointer" />
                        </button>
                        <button onClick={() => console.log("delete", row._id)} className="text-[#F5A623] hover:opacity-70">
                        <Trash2 className="h-5 w-5 cursor-pointer" />
                        </button>
                    </>
                    )}
                />
            </div>
        </div>
    </>
  )
}
