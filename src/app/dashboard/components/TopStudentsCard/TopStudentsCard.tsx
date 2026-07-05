"use client"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { MoveRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SkeletonUI from "@/src/app/dashboard/students/components/Skeleton"
import { Student } from "@/src/types/students"
import { StudentsAPI } from "@/src/api"
import StudentCard from "@/src/app/Shared/components/StudentCard/StudentCard"
import avatar1 from "../../../images/user img (1).png";
import avatar2 from "../../../images/user img (2).png";
import avatar3 from "../../../images/user img (3).png";
import avatar4 from "../../../images/user img.png";
import { StaticImageData } from "next/image";
import { ViewDetailsDialog } from "../../students/components/ViewDetailsDialog"
import NoData from "@/src/app/Shared/components/NoData/NoData"

export default function TopStudentsCard() {
    const [students , setStudents] = useState<Student[]>([]);
    const [loading , setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const avatars = [avatar3, avatar4, avatar2, avatar1];

    useEffect(() => {
        const getStudents = async () => {
            setLoading(true);
            try {
            const response = await StudentsAPI.getAllStudents();;
            setStudents(response.data);
            } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            } finally {
                setLoading(false);
            }
        };

        getStudents();
    }, []);

  return (
    <>
        <Card className="w-full max-w-lg">
          <CardHeader className="flex-wrap gap-2">
            <CardTitle className="text-lg sm:text-xl font-bold">
              Top 5 Students
            </CardTitle>
            <CardAction>
              <Link
                href="/dashboard/students"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap"
              >
                <span>All Students</span>
                <MoveRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#C5D86D] shrink-0" />
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            {loading ? (
              <SkeletonUI numElements={2} />
            ) : students.length > 0 ? (
                  students.slice(0,5).map((student , index) => {
                    return(
                        <div className="mb-4" key={student._id}>
                            <StudentCard student={student} avatar={avatars[index % avatars.length]} 
                                onView={() => {
                                setSelectedStudent(student);
                                setSelectedAvatar(avatars[index % avatars.length]);
                                setIsDialogOpen(true);
                            }} />
                        </div>
                    )})
                    ) : (
                      <NoData item="Quizzes" />
                  )}
          </CardContent>
        </Card>
        <ViewDetailsDialog student={selectedStudent} avatar={selectedAvatar!} 
            open={isDialogOpen} 
            onOpenChange={setIsDialogOpen}
        />
    </>
  )
}
