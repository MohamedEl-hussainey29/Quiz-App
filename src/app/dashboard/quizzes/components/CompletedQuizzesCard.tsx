"use client"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { MoveRight } from "lucide-react"
import Link from "next/link"
import { GroupsAPI, QuizzesAPI } from "@/src/api"
import { Quiz } from "@/src/types/quizzes"
import useGetData from "@/src/hooks/useGetData"
import { ColumnDef, DataTable } from "@/src/app/Shared/components/DataTable/DataTable"
import { Group } from "@/src/types/groups"
import { useMemo } from "react"

export default function CompletedQuizzesCard({ maxHeight }: { maxHeight?: string }) {
    const { data: quizzes, isLoading } = useGetData<Quiz[]>(
        QuizzesAPI.GetCompletedQuizzes
    );
    const { data: groups } = useGetData<Group[]>(
        GroupsAPI.GetAllGroups
    );

    // Build a lookup map: groupId -> Group
    const groupsMap = useMemo(() => {
        const map = new Map<string, Group>();
        groups?.forEach((group) => {
            map.set(group._id, group);
        });
        return map;
    }, [groups]);

    const columns: ColumnDef<Quiz>[] = [
        { header: "Title", accessor: "title" },
        {header: "Group Name", accessor: (row) => groupsMap.get(row.group)?.name ?? "—"},
        {header: "No. of persons in group", accessor: (row) => {
                const count = groupsMap.get(row.group)?.students.length ?? 0;
                return `${count} ${count === 1 ? "Person" : "Persons"}`;
            },
        },
        {header: "Date",accessor: (row) => new Date(row.schadule).toLocaleDateString("en-GB")}
    ]

  return (
    <Card className="w-full">
        <CardHeader className="flex-wrap gap-2">
            <CardTitle className="text-lg sm:text-xl font-bold">
            Completed Quizzes
            </CardTitle>
            <CardAction>
                <Link
                    href="/dashboard/results"
                    className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap"
              >
                    <span>Results</span>
                    <MoveRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#C5D86D] shrink-0" />
                </Link>
            </CardAction>
        </CardHeader>
        <CardContent>
            <DataTable
                columns={columns}
                data={quizzes}
                loading={isLoading}
                getRowId={(row) => row._id}
                emptyLabel="Quizzes"
                maxHeight={maxHeight}
            />
        </CardContent>
    </Card>
  )
}